import express from 'express'
import Community from '../models/Community.js'
import { protect } from '../middleware/auth.js'
const router = express.Router()
router.get('/', protect, async (req, res, next) => { try { const communities = await Community.find().populate('owner', 'username profilePicture').sort('-createdAt'); res.json({ communities }) } catch (e) { next(e) } })
router.post('/', protect, async (req, res, next) => { try { const { name, description, banner } = req.body; if (!name || !description) return res.status(400).json({ message: 'Name and description are required.' }); const community = await Community.create({ name, description, banner, owner: req.user.id, members: [req.user.id] }); res.status(201).json({ community }) } catch (e) { next(e) } })
router.get('/:id', protect, async (req, res, next) => { try { const community = await Community.findById(req.params.id).populate('owner', 'username profilePicture').populate('members', 'username profilePicture'); if (!community) return res.status(404).json({ message: 'Community not found.' }); res.json({ community }) } catch (e) { next(e) } })
router.post('/:id/join', protect, async (req, res, next) => { try { const community = await Community.findById(req.params.id); if (!community) return res.status(404).json({ message: 'Community not found.' }); if (!community.members.some((id) => id.equals(req.user._id))) { community.members.push(req.user.id); await community.save() }; res.json({ joined: true }) } catch (e) { next(e) } })
export default router
