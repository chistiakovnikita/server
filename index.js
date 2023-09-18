import express from 'express'
import mongoose from 'mongoose'
import router from './router.js'
import multer from 'multer'
import authMiddleware from './middleware/authMiddleware.js'
import cors from 'cors'
import 'dotenv/config'

const PORT = process.env.PORT || 5555
const app = express()
app.use(cors()) //блокировка CORS
app.use(express.json())
app.use('/uploads', express.static('uploads')) //для обработки uploads т.к. нет такого роута

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
})
const upload = multer({ storage })

app.use('/', router)
app.post('/upload', authMiddleware, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})

const start = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://nikita:nikita@cluster0.neitrms.mongodb.net/blog?retryWrites=true&w=majority`
        )
        app.listen(5555, () => {
            console.log(`server started on port 5555`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()
