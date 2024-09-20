import  express from "express"

import { addSong , listSong, removeSong } from "../controllers/songController.js"
import upload from "../middleware/multer.js"


const router1 = express.Router()

router1.get("/" , (req,res)=>{
    res.send("Hello World")
})

router1.post("/add" ,  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]), addSong)


router1.get("/list" , listSong)

router1.post("/remove" , removeSong)


export default router1