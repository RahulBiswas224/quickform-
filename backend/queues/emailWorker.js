const { Worker } = require('bullmq')
const nodemailer = require('nodemailer')
const redis = require('../lib/redis')

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

const worker = new Worker('emailQueue', async (job) => {
  const { toEmail, formTitle, submittedAt } = job.data

  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: toEmail,
    subject: `New response received — ${formTitle}`,
    html: `
      <h2>New Form Response</h2>
      <p>Your form <strong>${formTitle}</strong> received a new response.</p>
      <p>Submitted at: ${submittedAt}</p>
    `
  })
}, { connection: redis })

worker.on('completed', (job) => {
  console.log(`Email sent for job ${job.id}`)
})

worker.on('failed', (job, err) => {
  console.error(`Email job ${job.id} failed:`, err.message)
})

module.exports = worker