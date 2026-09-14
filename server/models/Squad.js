import mongoose from 'mongoose'
const squadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 }, owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  game: { type: String, required: true }, description: { type: String, required: true, maxlength: 1000 },
  members: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, role: String }], maxMembers: { type: Number, min: 2, max: 100, default: 5 },
  skillLevel: String, roles: [String], platform: String, voiceChat: { type: Boolean, default: false }, playTime: String, banner: String,
}, { timestamps: true })
export default mongoose.model('Squad', squadSchema)
