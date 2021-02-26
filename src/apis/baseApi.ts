import express from "express";
import {ApiInterface} from "./apiInterface";
import { APIWrapper } from "../utils/APIWrapper";

export class PostsController implements ApiInterface {
    public path = '/venue';
    public api = express.Router();

    private posts: object[] = [
        {
            author: 'Marcin',
            content: 'Dolor sit amet',
            title: 'Lorem Ipsum',
        }
    ];

    constructor() {
        this.intializeRoutes();
    }


    public intializeRoutes() {
        this.api.get(this.path + '/all', this.getAllPosts);
    }

    @APIWrapper
    getAllPosts(request: express.Request, response: express.Response) {
        response.send(this.posts);
    }

}
// export class BaseApi implements ApiInterface{
//     path = '';
//     api;
//     constructor() {
//         this.api = express.Router();
//     }
//     get: Router = this.api.get(this.path,)
// }