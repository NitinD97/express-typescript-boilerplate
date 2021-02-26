// Initially parse and load environment file
// import dotenv from "dotenv";
// dotenv.config();

// import { mongoDB } from "./database";

// mongoDB.connect();

import {PostsController} from "./apis";

const PORT = process.env.PORT || "8000";

import App from './app';

const app = new App(
    [
        new PostsController(),
    ],
    PORT,
);

app.listen();
