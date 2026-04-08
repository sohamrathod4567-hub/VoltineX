import express from "express";

const router = express.Router();

const transformerData = [];

router.get("/data", (req, res) => {
  res.json(transformerData);
});

router.post("/data", (req, res) => {
  const { voltage, current, temperature, timestamp } = req.body;

  if (
    typeof voltage !== "number" ||
    typeof current !== "number" ||
    typeof temperature !== "number" ||
    typeof timestamp !== "string"
  ) {
    return res.status(400).json({ error: "Invalid transformer data" });
  }

  const record = { voltage, current, temperature, timestamp };
  transformerData.push(record);
  res.status(201).json(record);
});

export default router;
