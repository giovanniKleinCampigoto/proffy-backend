import "reflect-metadata";
import express from "express";
import cors from "cors";
import buildGraphQLServer from "./graphql.config";
import routes from "./routes";

const app = express();
app.use(cors());
app.use(express.json());
buildGraphQLServer(app);

app.use(routes);

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Server is listening in port ${PORT}`);
});
