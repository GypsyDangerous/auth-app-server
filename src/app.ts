import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
dotenv.config();
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers, context } from "./graphql";

// const middlewares = require("./middlewares");
import { notFound, errorHandler } from "./middleware";
import api from "./api";
// const api = require("./api");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI || "";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB database connection successful");
});

const server = new ApolloServer({ typeDefs, resolvers, context });

// app.use(
// 	rateLimit({
// 		windowMs: 15 * 60 * 1000, // 15 minutes
// 		max: 15,
// 	})
// );

server.applyMiddleware({ app });

app.use("/uploads/images", express.static("uploads/images"));

app.get("/", (req, res) => {
	res.json({
		message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
	});
});

app.use("/api/v1", api);

app.use(notFound);
app.use(errorHandler);

export = app;
