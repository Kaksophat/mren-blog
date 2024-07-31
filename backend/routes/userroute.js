import express from "express"
import { signout, test } from "../controller/usercontroller.js"

const router = express.Router()

router.get("/",test)
router.post("/signout",signout)


export default router