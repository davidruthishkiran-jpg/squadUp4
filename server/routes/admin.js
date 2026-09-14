import express from 'express'
import User from '../models/User.js'
import Post from '../models/Post.js'
import Squad from '../models/Squad.js'
import Community from '../models/Community.js'
import { protect } from '../middleware/auth.js'
import { requireAdmin } from '../middleware/admin.js'

const router = express.Router()
router.use(protect, requireAdmin)

router.get('/overview', async (_, res, next) => {
  try {
    const [users, posts, squads, communities] = await Promise.all([User.countDocuments(), Post.countDocuments(), Squad.countDocuments(), Community.countDocuments()])
    res.json({ users, posts, squads, communities })
  } catch (error) { next(error) }
})
router.get('/users', async (_, res, next) => { try { res.json({ users: await User.find().select('-password').sort('-createdAt').limit(100) }) } catch (error) { next(error) } })
router.delete('/users/:id', async (req, res, next) => { try { if (req.params.id === req.user.id) return res.status(400).json({ message: 'You cannot delete your own administrator account.' }); const user = await User.findByIdAndDelete(req.params.id); if (!user) return res.status(404).json({ message: 'User not found.' }); res.status(204).end() } catch (error) { next(error) } })
router.delete('/posts/:id', async (req, res, next) => { try { const post = await Post.findByIdAndDelete(req.params.id); if (!post) return res.status(404).json({ message: 'Post not found.' }); res.status(204).end() } catch (error) { next(error) } })
export default router
