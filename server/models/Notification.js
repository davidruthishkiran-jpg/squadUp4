import mongoose from 'mongoose'
const notificationSchema = new mongoose.Schema({ recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, type: { type: String, enum: ['follow', 'like', 'comment', 'mention', 'squad_invite', 'squad_accepted', 'message'], required: true }, referenceId: mongoose.Schema.Types.ObjectId, read: { type: Boolean, default: false } }, { timestamps: true })
export default mongoose.model('Notification', notificationSchema)
