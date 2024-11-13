/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, Router } from "express"

const router = Router()

router.post("/user/register", async (request: Request, response: Response) => {
  console.log("/user/register")
})

router.patch(
  "/user/update/:userId",
  async (request: Request, response: Response) => {
    console.log("/user/update/:userId")
  }
)

router.post("/user/session", async (request: Request, response: Response) => {
  console.log("/user/session")
})

router.get(
  "/user/find/:userId",
  async (
    request: Request,
    response: Response
  ) => {
    console.log("/user/find/:userId", request.params.userId)
  }
)

export { router }
