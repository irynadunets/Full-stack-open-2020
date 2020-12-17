import React from 'react';
import { Rating } from 'semantic-ui-react';
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Patient, Diagnosis, NewEntry } from "../types";
import AddEntryModal from "../AddEntryForm";
import { Button } from "semantic-ui-react";
const axios = require('axios');

const PatientInfo: React.FC = () => {
  const [{ patients, diagnoses}, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).find(patient => patient.id === id);
  const { code } = useParams<{ code: string }>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (newEntry: NewEntry) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(updatePatient(updatedPatient));
      closeModal();
      setPatient(updatedPatient);
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  const diagn = Object.values(diagnoses)

  return (
      <div>
      { patient && diagn &&
        <div>
           <h1>{patient.name}</h1>
           <p>{patient.dateOfBirth}</p>
           <p>{patient.ssn}</p>
           <p>{patient.gender}</p>
           <p>{patient.occupation}</p>
            {patient.entries.map((entry) =>
              <div key={entry.id}>
                <h3>{entry.date}</h3>
                <h4>{entry.description}</h4>
                <div>{entry.diagnosisCodes && entry.diagnosisCodes.map((c) =>
                  <div key={c}>
                    <h3>{c}</h3>
                    <div>{diagn.filter(d=>d.code ===c)[0].name}</div>
                    <div>{diagn.filter(d=>d.code ===c)[0].latin}</div>
                  </div>
                )}
              </div>
                <h4>{entry.type}</h4>
                <p>{entry.specialist}</p>
              </div>
            )}
        </div>
      }

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
</div>
  );
  }
export default PatientInfo;
