import { Router } from 'express'
import authController from './controllers/authController.js'
import postController from './controllers/postController.js'
import authMiddleware from './middleware/authMiddleware.js'
import advertisingController from './controllers/advertisingController.js'
import handleValidationErrors from './middleware/handleValidationErrors.js'
import { registrationValidation, postValidation } from './validations.js'

const router = new Router()

//auth
router.post(
    '/auth/registration',
    registrationValidation,
    handleValidationErrors,
    authController.registration
)
router.post('/auth/login', authController.login)
router.get('/auth/user', authMiddleware, authController.getUser)

//advertising
router.post('/advertising', advertisingController.create)
router.get('/advertising', advertisingController.getadvertisings)
//posts
router.post(
    '/posts',
    authMiddleware,
    postValidation,
    handleValidationErrors,
    postController.create
)
router.get('/posts', postController.getAllPosts)
router.get('/posts/post', postController.search)
router.get('/posts/:id', postController.getOnePost)
router.patch(
    '/posts/:id',
    authMiddleware,
    postValidation,
    handleValidationErrors,
    postController.update
)
router.delete('/posts/:id', authMiddleware, postController.remove)

export default router
