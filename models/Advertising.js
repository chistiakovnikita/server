import mongoose, { Schema, model } from 'mongoose'

const Advertising = new Schema(
    {
        title: String,
        image: String,
        address: String,
        contact: String,
        url: String,
    },
    {
        timestamps: true,
    }
)

export default model('Advertising', Advertising)
