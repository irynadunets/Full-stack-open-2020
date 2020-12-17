import patientData from "../data/patients";
import { Patient, PatientEntry, newPatientEntry, NewEntry } from "../types";

const patients: Array<Patient> = patientData;
const shortid = require("shortid");

const getPatients = (): Array<Patient> => {
  return patients;
};

const findById = (id: string): Patient | undefined => {
  let patient = patients.find((p) => p.id === id);
  return patient;
};

const addEntry = ( entry: newPatientEntry
  ): PatientEntry => {

  const newPatientEntry = {
    id: (patients.length + 1).toString(),
   ...entry
  }

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntries = (patient: Patient, newEntry: NewEntry): Patient => {
  const id: string = shortid.generate();
  patient.entries.push({ ...newEntry, id });
  return patient;
};

export default {
  getPatients,
  addEntry,
  findById,
  addEntries
}
