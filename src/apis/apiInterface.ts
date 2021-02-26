import express from "express";

export interface ApiInterface {
    path: string;
    api: express.Router;
}