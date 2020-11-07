import fs from "fs";
import request from "request";
import { upload_path } from "../utils/constants";

const download = (uri: string, filename: string, callback: () => void) : void => {
	request.head(uri, function (err, res, body) {
		console.log("content-type:", res.headers["content-type"]);
		console.log("content-length:", res.headers["content-length"]);

		request(uri)
			.pipe(fs.createWriteStream(`${upload_path}/${filename}`))
			.on("close", callback);
	});
};



export = download