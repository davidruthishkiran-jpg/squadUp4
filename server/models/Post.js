import mongoose from 'mongoose'
const commentSchema = new mongoose.Schema({ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, text: { type: String, required: true, maxlength: 500 }, likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] }, { timestamps: true })
const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, image: String, video: String,
  caption: { type: String, maxlength: 2200, default: '' }, game: { type: String, required: true }, tags: [String], location: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], comments: [commentSchema], saves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true })
export default mongoose.model('Post', postSchema)
