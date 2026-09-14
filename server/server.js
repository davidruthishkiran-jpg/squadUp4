import 'dotenv/config'
import mongoose from 'mongoose'
import app from './app.js'

const port = process.env.PORT || 5000
if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) { console.error('MONGODB_URI and JWT_SECRET must be set in server/.env'); process.exit(1) }
mongoose.connect(process.env.MONGODB_URI).then(() => app.listen(port, () => console.log(`SquadUp API listening on ${port}`))).catch((error) => { console.error('MongoDB connection failed:', error.message); process.exit(1) })
