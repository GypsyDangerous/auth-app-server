import mongoose, { Schema } from "mongoose";

interface User extends mongoose.Document{
	bio: string,
	phone: string,
	username: string,
	email: string,
	password: string,
	isDeleted?: boolean,
	photo: string
}

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
		photo: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model<User>("poll", UserSchema);

export = User;
