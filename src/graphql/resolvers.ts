import User from "../models/User.model"
import {DocumentQuery} from "mongoose"

export const resolvers = {
	Query: {
		users: (): DocumentQuery<User[], User, unknown> => {
			return User.find()
		}
	}
}