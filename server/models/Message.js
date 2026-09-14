import mongoose from 'mongoose'
const messageSchema = new mongoose.Schema({ sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, conversation: { type: String, required: true, index: true }, text: { type: String, maxlength: 2000, default: '' }, attachments: [String], read: { type: Boolean, default: false } }, { timestamps: true })
export default mongoose.model('Message', messageSchema)
