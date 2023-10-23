import "dotenv/config";
import express from "express";
import routes from "./routes";

const app = express();
app.use(express.json());
app.use(routes);

app.listen("3005", () => {
  console.log("Servidor rodando na porta 3005");
});
