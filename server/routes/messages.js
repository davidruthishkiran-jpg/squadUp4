import express from 'express'
import Message from '../models/Message.js'
import Notification from '../models/Notification.js'
import { protect } from '../middleware/auth.js'
const router = express.Router()
const conversationId = (a, b) => [String(a), String(b)].sort().join('_')
router.get('/conversations', protect, async (req, res, next) => { try { const messages = await Message.find({ $or: [{ sender: req.user.id }, { receiver: req.user.id }] }).populate('sender receiver', 'username profilePicture status').sort('-createdAt'); const map = new Map(); for (const message of messages) if (!map.has(message.conversation)) map.set(message.conversation, message); res.json({ conversations: [...map.values()] }) } catch (e) { next(e) } })
router.get('/:conversationId', protect, async (req, res, next) => { try { const messages = await Message.find({ conversation: req.params.conversationId }).populate('sender receiver', 'username profilePicture status').sort('createdAt'); await Message.updateMany({ conversation: req.params.conversationId, receiver: req.user.id }, { read: true }); res.json({ messages }) } catch (e) { next(e) } })
router.post('/', protect, async (req, res, next) => { try { const { receiver, text, attachments = [] } = req.body; if (!receiver || (!text?.trim() && !attachments.length)) return res.status(400).json({ message: 'A recipient and message content are required.' }); const message = await Message.create({ sender: req.user.id, receiver, text: text?.trim(), attachments, conversation: conversationId(req.user.id, receiver) }); await Notification.create({ recipient: receiver, sender: req.user.id, type: 'message', referenceId: message._id }); await message.populate('sender receiver', 'username profilePicture status'); res.status(201).json({ message }) } catch (e) { next(e) } })
export default router
