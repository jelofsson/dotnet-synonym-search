import React, { FormEvent, ChangeEvent, useState } from "react";
import {
  Grid2 as Grid,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { addSynonym } from "../../api";

const AddSynonymForm: React.FC = () => {
  const [wordA, setWordA] = useState<string>("");
  const [wordB, setWordB] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!wordA || !wordB) {
      setError(true);
      setMessage("Both fields must be filled out.");
      return;
    }
    try {
      await addSynonym(wordA, wordB);
      setSuccess(true);
      setMessage("Synonym added successfully!");
    } catch (err) {
      setError(true);
      setMessage("An error occurred while adding the synonym.");
    }
  };

  const handleChange =
    (setFunc: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setFunc(e.target.value);
    };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid size={2} container alignItems="center" justifyContent="center">
          <div>Add</div>
        </Grid>
        <Grid size={3}>
          <TextField
            error={error}
            fullWidth
            variant="outlined"
            label="Word A"
            value={wordA}
            onChange={handleChange(setWordA)}
          />
        </Grid>
        <Grid size={2} container alignItems="center" justifyContent="center">
          <div>as synonym to</div>
        </Grid>
        <Grid size={3}>
          <TextField
            error={error}
            fullWidth
            variant="outlined"
            label="Word B"
            value={wordB}
            onChange={handleChange(setWordB)}
          />
        </Grid>
        <Grid size={2}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={error || success}
        autoHideDuration={6000}
        onClose={() => {
          setError(false);
          setSuccess(false);
        }}
      >
        {error ? (
          <Alert onClose={() => setError(false)} severity="error">
            {message}
          </Alert>
        ) : (
          <Alert onClose={() => setSuccess(false)} severity="success">
            {message}
          </Alert>
        )}
      </Snackbar>
    </form>
  );
};

export default AddSynonymForm;
