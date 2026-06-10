const router = require('express').Router()
const db = require('../lib/db')
const authMiddleware = require('../middleware/auth')
const emailQueue = require('../queues/emailQueue')

// Submit a response (public, no auth)
router.post('/:formId', async (req, res) => {
  const { answers } = req.body
  try {
    const form = await db.form.findUnique({
      where: { id: Number(req.params.formId) },
      include: { user: true }
    })
    if (!form) return res.status(404).json({ error: 'Form not found' })
    if (!form.isPublished) return res.status(403).json({ error: 'Form is not accepting responses' })
    if (form.expiresAt && new Date() > new Date(form.expiresAt)) {
      return res.status(403).json({ error: 'This form has expired' })
    }  

    const response = await db.response.create({
      data: { answers, formId: form.id }
    })

    await emailQueue.add('sendNotification', {
      toEmail: form.user.email,
      formTitle: form.title,
      submittedAt: new Date().toISOString()
    })

    res.status(201).json({ message: 'Response submitted', response })
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit response' })
  }
})

// Get all responses for a form (owner only)
router.get('/:formId', authMiddleware, async (req, res) => {
  try {
    const form = await db.form.findFirst({
      where: { id: Number(req.params.formId), userId: req.user.id }
    })
    if (!form) return res.status(404).json({ error: 'Form not found' })

    const responses = await db.response.findMany({
      where: { formId: form.id },
      orderBy: { submittedAt: 'desc' }
    })
    res.json(responses)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch responses' })
  }
})

// Download responses as CSV (owner only)
router.get('/:formId/csv', authMiddleware, async (req, res) => {
  try {
    const form = await db.form.findFirst({
      where: { id: Number(req.params.formId), userId: req.user.id }
    })
    if (!form) return res.status(404).json({ error: 'Form not found' })

    const responses = await db.response.findMany({
      where: { formId: form.id },
      orderBy: { submittedAt: 'desc' }
    })

    if (responses.length === 0) {
      return res.status(400).json({ error: 'No responses yet' })
    }

    const fields = form.fields
    const headers = [...fields.map(f => f.label), 'Submitted At']
    const rows = responses.map(r => {
      const rowValues = fields.map(f => {
        const val = r.answers[f.id]
        return `"${String(val ?? '').replace(/"/g, '""')}"`
      })
      rowValues.push(`"${r.submittedAt.toISOString()}"`)
      return rowValues.join(',')
    })

    const csv = [headers.join(','), ...rows].join('\n')

    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', `attachment; filename="responses-${form.id}.csv"`)
    res.send(csv)
  } catch (err) {
    res.status(500).json({ error: 'Failed to export CSV' })
  }
})

module.exports = router