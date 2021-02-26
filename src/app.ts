import express from 'express';
import * as fs from "fs";
import * as https from "https";
import bodyParser from "body-parser";
import { ApiInterface } from "./apis";
import {errorHandler, requestLogger} from "./middleware";

class App {
    public app: express.Application;
    public port: string;

    constructor(controllers: ApiInterface[], port: string) {
        this.app = express();
        this.port = port;

        this.initializePreMiddlewares();
        this.initializeControllers(controllers);
        this.initializePostMiddlewares()
    }

    private initializePreMiddlewares() {
        this.app.use(bodyParser.json());
    }

    private initializeControllers(controllers:ApiInterface[]) {
        controllers.forEach((controller) => {
            this.app.use('/api/', controller.api);
        });
    }

    private initializePostMiddlewares() {
        this.app.use(errorHandler)
        this.app.use(requestLogger);
    }

    public listen() {
        if (process.env.NODE_ENV === "production" && process.env.SSL_KEY_FILE && process.env.SSL_CERT_FILE) {
            const key = fs.readFileSync(process.env.SSL_KEY_FILE);
            const cert = fs.readFileSync(process.env.SSL_CERT_FILE);
            const options = { key, cert };
            https.createServer(options, this.app).listen(this.port, () => {
                console.log("HTTPS server running on port:", this.port);
            });
        } else {
            this.app.listen(this.port, () => {
                console.log("HTTP server running on port:", this.port);
            });
        }
    }
}


export default App;