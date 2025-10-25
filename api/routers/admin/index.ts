import express from "express";
import cocktailAdminRouter from "./cocktail";

const adminRouter = express.Router();

adminRouter.use("/cocktails", cocktailAdminRouter)

export default adminRouter