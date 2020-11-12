import { gql } from "apollo-server-express";

export const typeDefs = gql`
	type User{
		bio: String,
		phone: String,
		username: String!,
		email: String!,
		photo: String	
	}
	type Query {
		users: [User]
		user: User
	}
`;
