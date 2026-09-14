import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true, lowercase: true, minlength: 3, maxlength: 30 },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true, minlength: 8, select: false },
  displayName: { type: String, trim: true, maxlength: 50 },
  dateOfBirth: Date,
  profilePicture: { type: String, default: '' }, bio: { type: String, default: '', maxlength: 300 }, location: { type: String, default: '' },
  favoriteGames: [{ type: String }], platforms: [{ type: String }],
  skillLevel: { type: String, default: 'Beginner' }, roles: [{ type: String }], availability: { type: String, default: '' },
  voiceChat: { type: Boolean, default: false }, languages: [{ type: String }],
  status: { type: String, enum: ['online', 'offline', 'in-game'], default: 'offline' },
  gamerStatus: { type: String, enum: ['Looking for Squad', 'Playing', 'Available', 'Busy', 'Offline'], default: 'Available' },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  achievements: [{ name: String, description: String, icon: String, requirement: String, unlockedAt: Date }],
}, { timestamps: true, toJSON: { virtuals: true } })

userSchema.virtual('followerCount').get(function () { return this.followers?.length || 0 })
userSchema.virtual('followingCount').get(function () { return this.following?.length || 0 })
userSchema.pre('save', async function () { if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 12) })
userSchema.methods.comparePassword = function (candidate) { return bcrypt.compare(candidate, this.password) }
export default mongoose.model('User', userSchema)
