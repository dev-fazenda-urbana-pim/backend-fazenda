import { Router } from "express"
import UserController from "./user/user-controller"

const router = Router()

router.post("/user/register", UserController.create)
router.post("/user/session", UserController.login)
router.patch("/user/update/:userId", UserController.update)

export { router }
