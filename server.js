import express, { urlencoded } from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import router from "./routes/api.js";
import employeeRouter from "./routes/employeeAPI.js";


connectDB();

const app = express();

//MIDDLEWARE
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(cors());

app.get("/", (req, res)=> res.send("Server is running fine..."))
app.use("/api/v1", router)
app.use("/api/v1", employeeRouter)


const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`))