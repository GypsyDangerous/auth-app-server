import { string } from "joi";
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
	{
		bio: { type: String, required: false, default: "" },
		phone: { type: String, required: false, default: "" },
		username: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minlength: 3,
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minlength: 8,
		},
		isDeleted: {
			type: Boolean,
			defualt: false,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("poll", UserSchema);

export = User;
