import { NextFunction, Response, Request } from "express";
import fs from "fs";
import request from "request";
import { upload_path } from "../utils/constants";

export const download = (uri: string, filename: string, callback: () => void): void => {
	request.head(uri, function (err, res, body) {
		console.log("content-type:", res.headers["content-type"]);
		console.log("content-length:", res.headers["content-length"]);
		const dir = upload_path;
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}
		request(uri)
			.pipe(fs.createWriteStream(`${dir}/${filename}`))
			.on("close", callback);
	});
};

interface UrlBody extends Buffer{
	url: string
}

const middleware = async (req: Request<Record<string, unknown>, unknown, UrlBody>, res: Response, next: NextFunction) => {
	const {url} = req.body
	const filename = 
	// const  
};
