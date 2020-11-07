import { NextFunction, Response, Request } from "express";
import fs from "fs";
import request from "request";
import { upload_path } from "../utils/constants";
import { get_image_filename } from "../utils/functions";
import { AuthRequest } from "../types/Request";

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

interface UrlBody extends Buffer {
	url: string;
}

export const middleware = async (
	req: AuthRequest<Record<string, unknown>, unknown, UrlBody>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const { url } = req.body;
	const ext = url.split(".").slice(1).join(".");
	const filename = get_image_filename(ext);
	download(url, filename, () => {
		req.filename = filename;
		next()
	});
};
