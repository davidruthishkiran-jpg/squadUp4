import 'dotenv/config'
import mongoose from 'mongoose'
import User from '../models/User.js'

const email = process.env.SQUADUP_ADMIN_EMAIL
const password = process.env.SQUADUP_ADMIN_PASSWORD
const username = process.env.SQUADUP_ADMIN_USERNAME || 'squadupadmin'

if (!process.env.MONGODB_URI || !email || !password) throw new Error('MONGODB_URI, SQUADUP_ADMIN_EMAIL and SQUADUP_ADMIN_PASSWORD are required.')

try {
  await mongoose.connect(process.env.MONGODB_URI)
  let user = await User.findOne({ email: email.toLowerCase() }).select('+password')
  if (user) {
    user.role = 'admin'
    user.password = password
    await user.save()
    console.log(`Administrator updated: ${user.email}`)
  } else {
    user = await User.create({ username, email, password, displayName: 'SquadUp Admin', role: 'admin', status: 'offline' })
    console.log(`Administrator created: ${user.email}`)
  }
} finally {
  await mongoose.disconnect()
}
