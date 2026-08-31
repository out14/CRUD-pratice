import express from "express";
import cors from "cors"
import fs from "fs";
import { randomUUID } from "crypto";
import postRoutes from "./routes/postRoutes.js"

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());
app.use("/api/posts",postRoutes);
app.listen(PORT, () => {
    console.log(`Server Running : http://localhost:${PORT}`);
});
//fs.readFileSync()





// app.get("./data/post.json")

