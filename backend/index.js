import express from "express";

const app = express();
const port = process.env.PORT || 4174;

app.get("/api/status", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Voltinex backend listening on port ${port}`);
});
