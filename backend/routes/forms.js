const router = require('express').Router()
const db = require('../lib/db')
const authMiddleware = require('../middleware/auth')
const { nanoid } = require('nanoid')

// Get all forms for logged in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const forms = await db.form.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    })
    res.json(forms)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch forms' })
  }
})

// Get public form by slug (no auth) — must be before /:id
router.get('/public/:slug', async (req, res) => {
  try {
    const form = await db.form.findUnique({
      where: { slug: req.params.slug }
    })
    if (!form) return res.status(404).json({ error: 'Form not found' })
    if (!form.isPublished) return res.status(403).json({ error: 'Form is not published' })
    res.json(form)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch form' })
  }
})

// Get single form (owner)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const form = await db.form.findFirst({
      where: { id: Number(req.params.id), userId: req.user.id }
    })
    if (!form) return res.status(404).json({ error: 'Form not found' })
    res.json(form)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch form' })
  }
})

// Create form
router.post('/', authMiddleware, async (req, res) => {
  const { title } = req.body
  try {
    const form = await db.form.create({
      data: {
        title: title || 'Untitled Form',
        slug: nanoid(10),
        fields: [],
        userId: req.user.id
      }
    })
    res.status(201).json(form)
  } catch (err) {
    res.status(500).json({ error: 'Failed to create form' })
  }
})

// Update form (title + fields + expiry date)
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, fields, expiresAt } = req.body
  try {
    const form = await db.form.findFirst({
      where: { id: Number(req.params.id), userId: req.user.id }
    })
    if (!form) return res.status(404).json({ error: 'Form not found' })

    const updated = await db.form.update({
      where: { id: Number(req.params.id) },
      data: {
        ...(title !== undefined && { title }),
        ...(fields !== undefined && { fields }),
        ...(expiresAt !== undefined && { expiresAt: expiresAt ? new Date(expiresAt) : null })
      }
    })
    res.json(updated)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update form' })
  }
})  

// Toggle publish
router.patch('/:id/publish', authMiddleware, async (req, res) => {
  try {
    const form = await db.form.findFirst({
      where: { id: Number(req.params.id), userId: req.user.id }
    })
    if (!form) return res.status(404).json({ error: 'Form not found' })

    const updated = await db.form.update({
      where: { id: Number(req.params.id) },
      data: { isPublished: !form.isPublished }
    })
    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle publish' })
  }
})

// Delete form
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const form = await db.form.findFirst({
      where: { id: Number(req.params.id), userId: req.user.id }
    })
    if (!form) return res.status(404).json({ error: 'Form not found' })

    await db.form.delete({ where: { id: Number(req.params.id) } })
    res.json({ message: 'Form deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete form' })
  }
})

module.exports = router