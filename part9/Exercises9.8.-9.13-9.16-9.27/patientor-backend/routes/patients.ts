import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry  from "../utils/toNewPatientEntry";
import {toNewEntry} from "../utils/toNewPatientEntry";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
})

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addEntry(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const patient = patientService.findById(req.params.id);

    const newEntry = toNewEntry(req.body);
    if (patient && newEntry) {
      const addedEntry = patientService.addEntries(patient, newEntry);
      res.json(addedEntry);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
