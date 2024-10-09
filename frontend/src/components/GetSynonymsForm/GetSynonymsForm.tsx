import React, { FormEvent, ChangeEvent, useState } from "react";
import {
  Grid2 as Grid,
  Button,
  TextField,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { GetSynonyms } from "../../api";

const GetSynonymsForm: React.FC = () => {
  const [word, setWord] = useState<string>("");
  const [synonyms, setSynonyms] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [inputChanged, setInputChanged] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!word) {
      setError(true);
      setMessage("Field must be filled out.");
      return;
    }
    try {
      const result = await GetSynonyms(word);
      setSynonyms(result);
      setSuccess(true);
      setMessage("Synonym searched successfully!");
      setInputChanged(false);
    } catch (err) {
      setError(true);
      setMessage("An error occurred while searching the synonym.");
    }
  };

  const handleChange =
    (setFunc: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setFunc(e.target.value);
      setInputChanged(true);
    };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            error={error}
            fullWidth
            variant="outlined"
            label="Word"
            value={word}
            onChange={handleChange(setWord)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Get Synonyms
          </Button>
        </Grid>
      </Grid>
      {!inputChanged && synonyms.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Synonyms to "{word}"</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {synonyms.map((synonym, index) => (
                <TableRow key={index}>
                  <TableCell>{synonym}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
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

export default GetSynonymsForm;
