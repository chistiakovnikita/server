import Post from '../models/Post.js'

class postController {
    async create(req, res) {
        try {
            const { title, text, tags, image } = req.body
            const post = new Post({
                text,
                title,
                tags,
                image,
                author: req.userId,
            })
            await post.save()
            return res.json({ message: 'Пост успешно добавлен' })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Не удалось создать пост' })
        }
    }

    async getAllPosts(req, res) {
        try {
            const posts = await Post.find().populate('author').exec() //позволяет получить всю инф-ю о польз-ле а не только ID
            res.json(posts)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Не удалось получить все посты' })
        }
    }

    async getOnePost(req, res) {
        try {
            const postId = req.params.id
            Post.findOneAndUpdate(
                {
                    _id: postId,
                },
                {
                    $inc: { viewsCount: 1 }, //увелечение счетчика
                },
                {
                    returnDocument: 'after', //вернуть обновленный документ
                }
            )
                .populate('author')
                .exec()
                //doc и error берутся из findOneAndUpdate и обрабатываются(раньше был callback прямо в методе)
                .then((doc) => {
                    if (!doc) {
                        return res
                            .status(404)
                            .json({ message: 'Пост не найден' })
                    }

                    res.json(doc)
                })
                .catch((error) => {
                    console.log(error)
                    return res
                        .status(500)
                        .json({ message: 'Не удалось получить пост' })
                })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Не удалось получить пост' })
        }
    }

    async remove(req, res) {
        try {
            const postId = req.params.id
            Post.findOneAndDelete({
                _id: postId,
            })
                .then((doc) => {
                    if (!doc) {
                        return res
                            .status(404)
                            .json({ message: 'Пост не найден' })
                    }

                    res.json({ message: 'Пост успешно удален' })
                })
                .catch((error) => {
                    console.log(error)
                    return res
                        .status(500)
                        .json({ message: 'Не удалось удалить пост' })
                })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Не удалось удалить пост' })
        }
    }

    async update(req, res) {
        try {
            const { title, text, tags, image } = req.body
            const postId = req.params.id
            await Post.updateOne(
                {
                    _id: postId,
                },
                {
                    //необходимо обновить
                    title,
                    text,
                    tags,
                    image,
                    author: req.userId,
                }
            )
            res.json({ message: 'Пост успешно обнавлен' })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Не удалось обновить пост' })
        }
    }

    async search(req, res) {
        try {
            const { tags } = req.body
            const post = await Post.find({ tags })
            console.log(post)

            if (!post || !post.length) {
                return res.status(400).json({ message: 'Пост не найден' })
            }
            res.json(post)
            // return res.json({ message: 'Пост найден' })
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Произошла ошибка' })
        }
    }
}

export default new postController()

//удалить по названию
// async remove(req, res) {
//     try {
//         const { title } = req.body
//         const post = await Post.findOne({ title })

//         if (!post) {
//             return res.status(400).json({ message: 'Произошла ошибка' })
//         }
//         await post.deleteOne()
//         return res.json({ message: 'Пост успешно удален' })
//     } catch (error) {
//         console.log(error)
//         res.status(400).json({ message: 'Произошла ошибка' })
//     }
// }
