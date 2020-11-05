import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import path from "path"
dotenv.config();

// const middlewares = require("./middlewares");
import { notFound, errorHandler } from "./middleware";
import api from "./api";
// const api = require("./api");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.json({
		message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
	});
});
app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use("/api/v1", api);

app.use(notFound);
app.use(errorHandler);

export = app;
