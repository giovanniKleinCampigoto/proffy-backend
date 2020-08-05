import express from "express";

const app = express();
app.use(express.json());

const PORT = 3333;

app.get("/", (_, res) => {
  return res.json({ message: "hello world" });
});

app.listen(PORT, () => {
  console.log(`Server is listening in port ${PORT}`);
});
