import mongoose, { Schema, model } from 'mongoose'

const Post = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        text: {
            type: String,
            required: true,
        },
        tags: {
            type: Array,
            default: [],
        },
        image: String,
        viewsCount: {
            type: Number,
            default: 0,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export default model('Post', Post)
