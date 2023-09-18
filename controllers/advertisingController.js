import User from '../models/User.js'
import Advertising from '../models/Advertising.js'

class advertisingController {
    async create(req, res) {
        try {
            const { title, image, address, contact, url } = req.body
            const advertising = new Advertising({
                title,
                image,
                address,
                contact,
                url,
            })
            await advertising.save()

            res.json(advertising)
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Произошла ошибка' })
        }
    }

    async getadvertisings(req, res) {
        try {
            const advertising = await Advertising.find()
            res.json(advertising)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Не удалось получить данные' })
        }
    }
}

export default new advertisingController()
