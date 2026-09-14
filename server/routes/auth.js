import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { protect } from '../middleware/auth.js'
const router = express.Router()
const tokenFor = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })
const safeUser = (user) => user.toJSON()

router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword, dateOfBirth, favoriteGames = [], platforms = [], skillLevel, roles = [] } = req.body
    if (!username || !email || !password) return res.status(400).json({ message: 'Username, email and password are required.' })
    if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match.' })
    if (await User.exists({ $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }] })) return res.status(409).json({ message: 'Email or username is already in use.' })
    const user = await User.create({ username, email, password, dateOfBirth, favoriteGames, platforms, skillLevel, roles, displayName: username })
    res.status(201).json({ token: tokenFor(user.id), user: safeUser(user) })
  } catch (error) { next(error) }
})
router.post('/login', async (req, res, next) => {
  try {
    const { identifier, password } = req.body
    const user = await User.findOne({ $or: [{ email: String(identifier).toLowerCase() }, { username: String(identifier).toLowerCase() }] }).select('+password')
    if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: 'Incorrect email/username or password.' })
    user.status = 'online'; await user.save()
    res.json({ token: tokenFor(user.id), user: safeUser(user) })
  } catch (error) { next(error) }
})
router.get('/me', protect, (req, res) => res.json({ user: safeUser(req.user) }))
export default router
