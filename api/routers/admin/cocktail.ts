import express from "express"

import permit from "../../middleware/permit"
import { auth } from "../../middleware/auth"

const cocktailAdminRouter = express.Router()


cocktailAdminRouter.get("/cocktails", auth, permit("admin"),async()=>{

})

cocktailAdminRouter.post("/cocktails", auth, permit("admin"),async()=>{

})



export default cocktailAdminRouter

