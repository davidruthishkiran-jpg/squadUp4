import express from 'express'
import Notification from '../models/Notification.js'
import { protect } from '../middleware/auth.js'
const router = express.Router()
router.get('/', protect, async (req, res, next) => { try { const notifications = await Notification.find({ recipient: req.user.id }).populate('sender', 'username profilePicture').sort('-createdAt').limit(100); res.json({ notifications }) } catch (e) { next(e) } })
router.put('/:id/read', protect, async (req, res, next) => { try { const item = await Notification.findOneAndUpdate({ _id: req.params.id, recipient: req.user.id }, { read: true }, { new: true }); if (!item) return res.status(404).json({ message: 'Notification not found.' }); res.json({ notification: item }) } catch (e) { next(e) } })
export default router
