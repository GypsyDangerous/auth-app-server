import { Router } from "express";
import fileUpload from "../middleware/file-upload";
import {fileDownload} from "../middleware/download_file"

const router = Router();

router.get("/", (req, res) => {
	res.json({ message: "ImShare Api", code: 200 });
});

router.put("/download", fileDownload)

router.post("/upload", fileUpload.single("image"), async (req, res, next) => {
	res.json({code: 200, message: "image uploaded successfully", data: {imageUrl: req.file.path}})
})

export = router
