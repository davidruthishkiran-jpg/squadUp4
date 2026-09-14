import mongoose from 'mongoose'
const communitySchema = new mongoose.Schema({ name: { type: String, required: true, unique: true, trim: true }, description: { type: String, required: true, maxlength: 1000 }, banner: String, owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] }, { timestamps: true })
export default mongoose.model('Community', communitySchema)
