import { v2 as cloudinery } from "cloudinary";
import { SONG } from "../models/songModel.js";

const addSong = async (req, res) => {
  try {
    const name = req.body.name;
    const desc = req.body.desc;
    const album = req.body.album;
    const audioFile = req.files.audio[0];
    const imageFile = req.files.image[0];

    // console.log(audioFile)

    const audioUpload = await cloudinery.uploader.upload(audioFile.path, {
      resource_type: "video",
    });
    const imageUpload = await cloudinery.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const duration = `${Math.floor(audioUpload.duration / 60)}: ${Math.floor(
      audioUpload.duration % 60
    )}`;

    //   console.log(name, desc, album);
    //   console.log(audioUpload, imageUpload);

    const songData = {
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration,
    };

    const song = SONG(songData);
    await song.save();

    res.status(200).json({ success: true, song: song });
  } catch (error) {
    // console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

const listSong = async (req, res) => {
  try {
    const allSongs = await SONG.find({});
    res.status(200).json({ success: true, songs: allSongs });
  } catch (error) {
    // console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

const removeSong = async (req, res) => {
    try{
        await SONG.findByIdAndDelete(req.body.id)

        res.status(200).json({success : true , message : "Song Successfully Remove"})
    }catch (error) {
        // console.log(error.message);
        res.json({ success: false, message: error.message });
      }
};

export { addSong, listSong, removeSong };
