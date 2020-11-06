import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { payload } from "../types/Auth";
import { AuthRequest } from "../types/Request";

module.exports = (req: AuthRequest, res: Response, next: NextFunction) => {
	try {
		const token = req.get("Authorization");
		if (!token) {
			throw new Error("");
		}
		const secret = process.env.PRIVATE_KEY || "";
		const payload: payload | string = jwt.verify(token, secret);
		if (typeof payload === "string") {
			throw new Error();
		} else {
			req.userData = { userId: payload.userId };
		}
		next();
	} catch (err) {
		return res.json({ success: false, code: 401, message: "Authorization failed" });
	}
};
