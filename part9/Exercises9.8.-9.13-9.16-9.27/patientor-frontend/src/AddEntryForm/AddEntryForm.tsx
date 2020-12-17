import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import {
  TextField,
  DiagnosisSelection,
  EntryTypeSelection,
  EntryTypeSpecificFields,
} from "./FormField";
import {
  EntryFormValues,
  EntryType,
  HealthCheckRating,
  NewEntry,
} from "../types";
import { useStateValue } from "../state";
import { NewBaseEntry } from "../types";

const isValidDate = (date: any): boolean => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  return  date.match(regEx);
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const toNewEntry = (entryFormValues: EntryFormValues): NewEntry => {
  const {
    type,
    description,
    date,
    specialist,
    diagnosisCodes,
  } = entryFormValues;
  const newBaseEntry: NewBaseEntry = {
    description,
    date,
    specialist,
    diagnosisCodes,
  };

  switch (type) {
    case EntryType.HealthCheck:
      return {
        ...newBaseEntry,
        type,
        healthCheckRating: entryFormValues.healthCheckRating,
      };

    case EntryType.OccupationalHealthcare:
      return {
        ...newBaseEntry,
        type,
        employerName: entryFormValues.employerName,
        sickLeave: {
          startDate: entryFormValues.sickLeaveStartDate,
          endDate: entryFormValues.sickLeaveEndDate,
        },
      };

    case EntryType.Hospital:
      return {
        ...newBaseEntry,
        type,
        discharge: {
          date: entryFormValues.dischargeDate,
          criteria: entryFormValues.dischargeCriteria,
        },
      };

    default:
      return assertNever(type);
  }
};

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const initialFormValues: EntryFormValues = {
  type: EntryType.HealthCheck,
  date: "",
  description: "",
  specialist: "",
  diagnosisCodes: [],
  healthCheckRating: HealthCheckRating.Healthy,
  employerName: "",
  sickLeaveStartDate: "",
  sickLeaveEndDate: "",
  dischargeDate: "",
  dischargeCriteria: "",
};

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={(values) => onSubmit(toNewEntry(values))}
      validate={(values) => {
        const requiredError = "Field is required";
        const invalidError = "Invalid input";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!isValidDate(values.date)) {
          errors.date = invalidError;
        }
        if (values.type === EntryType.HealthCheck) {
          if (!values.healthCheckRating && values.healthCheckRating !== 0) {
            errors.healthCheckRating = requiredError;
          }
        }
        if (values.type === EntryType.OccupationalHealthcare) {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
          if (!values.sickLeaveStartDate) {
            errors.sickLeaveStartDate = requiredError;
          } else if (!isValidDate(values.sickLeaveStartDate)) {
            errors.sickLeaveStartDate = invalidError;
          }
          if (!values.sickLeaveEndDate) {
            errors.sickLeaveEndDate = requiredError;
          } else if (!isValidDate(values.sickLeaveEndDate)) {
            errors.sickLeaveEndDate = invalidError;
          }
        }
        if (values.type === EntryType.Hospital) {
          if (!values.dischargeDate) {
            errors.dischargeDate = requiredError;
          } else if (!isValidDate(values.dischargeDate)) {
            errors.dischargeDate = invalidError;
          }
          if (!values.dischargeCriteria) {
            errors.dischargeCriteria = requiredError;
          }
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <EntryTypeSelection
              entryTypes={Object.values(EntryType)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <EntryTypeSpecificFields type={values.type} />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
