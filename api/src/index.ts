import "dotenv/config";
import express from "express";
import cors from "cors";
import fs from "fs";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import {
  movies,
  feeds,
} from "./routes";

const app = express();

const APP_PORT = process.env.APP_PORT || 8000;
const APP_URL = process.env.APP_URL;
const swaggerDocument = YAML.load("./swagger.yaml");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logsDir = path.join(__dirname, "..", "logs");
fs.mkdirSync(logsDir, { recursive: true });
const accessLogStream = fs.createWriteStream(path.join(logsDir, `${new Date().toISOString().split("T")[0]}.log`), { flags: "a" });

if (process.env.NODE_ENV === "development") {
  app.use(cors({
    origin: "http://localhost:5173",
  }));
}
app.use(morgan("combined", { stream: accessLogStream }));
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/movies", movies);
app.use("/api/feeds", feeds);

app.listen(APP_PORT, () => {
  console.log(`Server is running at ${APP_URL}`);
});
