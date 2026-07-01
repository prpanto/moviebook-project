import "dotenv/config";
import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import {
  movies,
  feeds,
} from "./routes";

const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();

const APP_PORT = process.env.APP_PORT || 8000;
const APP_URL = process.env.APP_URL;

app.use(morgan("tiny"));
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/movies", movies);
app.use("/api/feeds", feeds);

app.listen(APP_PORT, () => {
  console.log(`Server is running at ${APP_URL}`);
});
