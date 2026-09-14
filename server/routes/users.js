import express from 'express'
import User from '../models/User.js'
import Notification from '../models/Notification.js'
import { protect } from '../middleware/auth.js'
const router = express.Router()
router.get('/discover', protect, async (req, res, next) => { try {
  const filter = { _id: { $ne: req.user.id } }
  for (const key of ['game', 'platform', 'skillLevel', 'role', 'status']) if (req.query[key]) filter[{ game: 'favoriteGames', platform: 'platforms', role: 'roles' }[key] || key] = req.query[key]
  const users = await User.find(filter).select('-password').limit(Math.min(Number(req.query.limit) || 30, 100))
  res.json({ users })
} catch (e) { next(e) } })
router.get('/:username', protect, async (req, res, next) => { try { const user = await User.findOne({ username: req.params.username.toLowerCase() }).select('-password'); if (!user) return res.status(404).json({ message: 'Gamer not found.' }); res.json({ user }) } catch (e) { next(e) } })
router.put('/profile', protect, async (req, res, next) => { try {
  const allowed = ['displayName','profilePicture','bio','location','favoriteGames','platforms','skillLevel','roles','availability','voiceChat','languages','status','gamerStatus']
  for (const key of allowed) if (req.body[key] !== undefined) req.user[key] = req.body[key]
  await req.user.save(); res.json({ user: req.user.toJSON() })
} catch (e) { next(e) } })
router.post('/:id/follow', protect, async (req, res, next) => { try {
  if (req.params.id === req.user.id) return res.status(400).json({ message: 'You cannot follow yourself.' })
  const target = await User.findById(req.params.id); if (!target) return res.status(404).json({ message: 'Gamer not found.' })
  if (!target.followers.some((id) => id.equals(req.user._id))) { target.followers.push(req.user._id); req.user.following.push(target._id); await Promise.all([target.save(), req.user.save(), Notification.create({ recipient: target._id, sender: req.user._id, type: 'follow' })]) }
  res.json({ following: true })
} catch (e) { next(e) } })
router.delete('/:id/follow', protect, async (req, res, next) => { try { const target = await User.findById(req.params.id); if (!target) return res.status(404).json({ message: 'Gamer not found.' }); target.followers.pull(req.user._id); req.user.following.pull(target._id); await Promise.all([target.save(), req.user.save()]); res.json({ following: false }) } catch (e) { next(e) } })
export default router
