import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

class authController {
    async registration(req, res) {
        try {
            const { username, password, email, avatar } = req.body
            const candidate = await User.findOne({ email })
            if (candidate) {
                res.status(400).json({
                    message: 'Пользователь с таким email уже существует',
                })
            }

            const hashPassword = bcrypt.hashSync(password, 7)
            const user = new User({
                username,
                password: hashPassword,
                email,
                avatar,
            })
            await user.save()

            const token = jwt.sign({ id: user._id }, 'secret', {
                expiresIn: '30d',
            })
            return res.json({
                message: 'Пользователь успешно зарегистрирован',
                user,
                token,
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Registration error' })
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res
                    .status(400)
                    .json({ message: `Пользователь ${email} не найден` })
            }
            const validPasword = bcrypt.compareSync(password, user.password)
            if (!validPasword) {
                return res
                    .status(400)
                    .json({ message: 'Введен неверный пароль' })
            }
            const token = jwt.sign({ id: user._id }, 'secret', {
                expiresIn: '30d',
            })
            return res.json({
                message: `Добро пожаловать, ${user.username}!`,
                user,
                token,
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Login error' })
        }
    }

    async getUser(req, res) {
        try {
            const user = await User.findById(req.userId)

            if (!user) {
                return res.status(400).json({
                    message: 'Пользователь не найден',
                })
            }

            return res.json({
                message: `Ваши данные, ${user.username}`,
                user,
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export default new authController()
