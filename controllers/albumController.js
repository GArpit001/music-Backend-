import { v2 as cloudinary } from "cloudinary";
import { Album } from "../models/albumSchema.js";

const addAlbum = async (req, res) => {
  try {
    const name = req.body.name;
    const desc = req.body.desc;
    const bgColor = req.body.bgColor;
    const imageFile = req.file;

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const albumData = {
      name,
      desc,
      bgColor,
      image: imageUpload.secure_url,
    };

    const album = Album(albumData);
    await album.save();

    res
      .status(200)
      .json({ success: true, album: "Successfully Create a album" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const listAlbum = async (req, res) => {
  try {
    const album = await Album.find({});
    res.status(200).json({ success: true, albums: album });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const removeAlbum = async (req, res) => {
  try {
    const removeAlbum = await Album.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, album: "Successfully Remove" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addAlbum, listAlbum, removeAlbum };
