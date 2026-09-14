import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import squadRoutes from './routes/squads.js'
import messageRoutes from './routes/messages.js'
import communityRoutes from './routes/communities.js'
import notificationRoutes from './routes/notifications.js'
import adminRoutes from './routes/admin.js'

const app = express()
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173').split(',').map((origin) => origin.trim())
app.use(cors({ origin(origin, done) { return done(null, !origin || allowedOrigins.includes(origin)) } }))
app.use(express.json({ limit: '2mb' }))
app.get('/api/health', (_, res) => res.json({ status: 'ok' }))
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/squads', squadRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/communities', communityRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/admin', adminRoutes)
app.use((_, res) => res.status(404).json({ message: 'Route not found.' }))
app.use((error, _, res, __) => { console.error(error); res.status(error.name === 'ValidationError' ? 400 : 500).json({ message: error.name === 'ValidationError' ? error.message : 'Something went wrong.' }) })
export default app
