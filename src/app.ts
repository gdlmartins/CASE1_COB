import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv"

dotenv.config()


export const app: Express = express();

app.use(express.json());
app.use(cors());


app.listen(process.env.PORT , () => {
    console.log("Gabriel Martins ! Server is running on port 3003!")
})


