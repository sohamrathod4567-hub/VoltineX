import express from "express";
import dataRouter from "./routes/data.js";

const app = express();
const port = process.env.PORT || 4174;

app.use(express.json());
app.use("/api", dataRouter);

app.listen(port, () => {
  console.log(`Voltinex backend listening on port ${port}`);
});
