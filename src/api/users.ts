import User from "../models/User.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response, Router } from "express";
const router = Router();
// import uuidv1 from "uuid/v1"
import fileUpload from "../middleware/file-upload";
import { AuthRequest } from "../types/Request";
const saltRounds = 13

const hasUniqueEmail = async (req: AuthRequest | Request, res: Response, next: NextFunction) => {
	if (!req.body.email) {
		return next();
	}
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			next();
		} else {
			res.status(400).json({ code: 400, message: "A user with that email already exists" });
		}
	} catch (err) {
		res.status(400).json("Error: " + err.message);
	}
};

router.delete("/delete/:id", async (req, res, next) => {
    try{
        await User.findOneAndDelete({uuid: req.params.id})
        res.json("User Deleted")
    }catch(err){
        res.status(400).json("Error: " + err.message)
    }
})

router.get("/get/:id", async (req, res, next) => {
    try {
       const userId = req.params.id
       const user = await User.findOne({ _id: userId })
       res.json(user)
    } catch (err) {
       next(err)
    }
})

router.patch("/update", hasUniqueEmail, async (req: AuthRequest, res: Response, next: NextFunction) => {
	// TODO: convert to findOneAndUpdate
    const user: any = await User.findOne({uuid: req.userData?.userId})
	const {username, email, password, photo, name, bio, phone} = req.body
    try{
        if(username){
            user.username = username
        }
        if(email){
            user.email = email
        }
        if (password){
            const samePassword = await bcrypt.compare(password, user.password)
            if(!samePassword){
                user.password = await bcrypt.hash(password, saltRounds)
            }
        }
        await user.save()
        res.json({code: 200, message: "User Updated"})
    }
    catch(err){
        res.status(400).json("Error: " + err.message)
    }      
})