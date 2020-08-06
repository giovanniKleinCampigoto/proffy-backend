import express from "express";
import routes from "./routes";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Server is listening in port ${PORT}`);
});
