const { Queue } = require('bullmq')
const redis = require('../lib/redis')

const emailQueue = new Queue('emailQueue', {
  connection: redis
})

module.exports = emailQueue