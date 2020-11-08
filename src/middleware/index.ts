import {Request, Response,  NextFunction} from "express"
import User from "../models/User.model"

export function notFound(req: Request, res: Response, next: NextFunction): void {
	res.status(404);
	const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
	next(error);
}

/* eslint-disable no-unused-vars */
export function errorHandler(err: Error, req: Request, res: Response): void {
	/* eslint-enable no-unused-vars */
	const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
	res.status(statusCode);
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
	});
}

export const hasUniqueEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		let email = req.body.email;
		console.log(email)
		if (!email) {
			return next();
		}
		email = email.toLowerCase();
		const user = await User.findOne({ email });
		console.log(!user)
		if (!user) {
			return next();
		} else {
			res.status(402).json({ code: 402, message: "A user with that email already exists" });
		}
	} catch (err) {
		res.status(400).json({ success: false, code: 400, message: "Error: " + err.message });
	}
};