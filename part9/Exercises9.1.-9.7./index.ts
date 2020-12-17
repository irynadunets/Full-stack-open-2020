import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { bmiCalculator } from "./bmiCalculator";
import { exerciseCalculator } from "./exerciseCalculator";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get("/bmi", (_req, res) => {
  const { weight, height } = _req.query;
  const bmi = bmiCalculator(Number(height), Number(weight));
  if (!weight || !height ) {
    res.send({
      error: "parameters missing",
    });
  }

  if (isNaN(Number(height)) && isNaN(Number(weight))) {
    res.send({
      error: "malformatted parameters",
    });
  }

  return res.json({ weight, height, bmi });
});

app.post("/exercises", (_req, res) => {
  const { target, hours } = _req.body;
  const response = exerciseCalculator(Number(target), hours);
  if (!target || !hours ) {
    res.send({
      error: "parameters missing",
    });
  }
    if (isNaN(Number(target)) && Array.isArray(hours)) {
      res.send({
        error: "malformatted parameters",
      });
  }
  console.log( response );
  return res.json(response);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
