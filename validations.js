import { check } from 'express-validator'

export const registrationValidation = [
    check('email', 'Введен некорректый email').isEmail(),
    check('password', 'Пароль должен быть не менее 5 символов').isLength({
        min: 5,
    }),
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('avatar').optional().isURL(),
]
export const postValidation = [
    check('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
    check('text', 'Введите текст статьи').isLength({ min: 3 }).isString(),
    check('tags').optional().isArray(),
    check('image').optional().isString(),
]
