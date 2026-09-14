import mongoose from 'mongoose'
import app from '../server/app.js'

let connectionPromise

async function connectDatabase() {
  if (mongoose.connection.readyState === 1) return
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 8000 })
      .catch((error) => { connectionPromise = undefined; throw error })
  }
  await connectionPromise
}

export default async function handler(req, res) {
  if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) return res.status(500).json({ message: 'Server environment is incomplete.' })
  try { await connectDatabase(); return app(req, res) } catch (error) { console.error('MongoDB connection failed:', error.message); return res.status(503).json({ message: 'Database is temporarily unavailable.' }) }
}
