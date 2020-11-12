import User from "../models/User.model";
import { DocumentQuery } from "mongoose";
import { checkUniqueEmail, login, register } from "../utils/functions";

export const resolvers = {
	Query: {
		users: (): DocumentQuery<User[], User, unknown> => {
			return User.find();
		},
		user: (parent: any, { id }: { id: string }): DocumentQuery<User | null, User, unknown> => {
			return User.findById(id);
		},
	},
	Mutation: {
		login: async (
			parent: any,
			{ email, password }: { email: string; password: string }
		): Promise<{ token?: string; user: DocumentQuery<User | null, User, unknown> }> => {
			const loginResult = await login(email, password);
			if (loginResult.code !== 200)
				throw new Error(`Error ${loginResult.code}: ${loginResult.message}`);
			const user = User.findById(loginResult.userId);
			return { user, token: loginResult.token };
		},
		register: async (
			parent: any,
			{ username, email, password }: { username: string; email: string; password: string }
		): Promise<{ token?: string; user: DocumentQuery<User | null, User, unknown> }> => {
			if (checkUniqueEmail(email)) throw new Error("A user with that email already exists");
			const loginResult = await register(username, email, password);
			if (loginResult.code !== 200)
				throw new Error(`Error ${loginResult.code}: ${loginResult.message}`);
			const user = User.findById(loginResult.userId);
			return { user, token: loginResult.token };
		},
	},
};
