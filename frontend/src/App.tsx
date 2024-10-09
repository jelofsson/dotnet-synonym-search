import "./App.css";
import { AddSynonymForm, GetSynonymsForm } from "./components";
import { Container, Typography, Box } from "@mui/material";

function App() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Synonym Search Tool
      </Typography>
      <Box my={4}>
        <Box mb={4} display="flex" justifyContent="center">
          <GetSynonymsForm />
        </Box>
        <Typography variant="h5" component="h2" gutterBottom align="center">
          OR
        </Typography>
        <Box mt={4} display="flex" justifyContent="center">
          <AddSynonymForm />
        </Box>
      </Box>
    </Container>
  );
}

export default App;
