import express from "express"
import { addAlbum , listAlbum , removeAlbum } from "../controllers/albumController.js"

import upload from "../middleware/multer.js"

const router2 = express.Router()

router2.get("/" , (req,res)=>{
    res.send("Hello World Router 2")
})

router2.post("/add" , upload.single('image') ,  addAlbum)
router2.get("/list" ,  listAlbum)
router2.post("/remove" ,  removeAlbum)

export default router2;