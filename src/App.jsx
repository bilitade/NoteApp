import axios from "axios";
import { useEffect, useState } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  Grid2 as Grid,
  Modal,
  Box,
  TextField,
  Stack,

  
} from "@mui/material";
import AddNotes from "./components/AddNotes";

import CssBaseline from "@mui/material/CssBaseline";
import {createTheme, ThemeProvider} from "@mui/material/styles";


const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#00adef" },
    secondary: { main: "#ff4081" },
    background: { default: "#ffffff", paper: "#f5f5f5" },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#f48fb1" },
    background: { default: "#121212", paper: "#1e1e1e" },
  },
});
export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedmode = localStorage.getItem("darkmode");
    return savedmode === "true";
  });
  const theme = darkMode ? darkTheme : lightTheme;

  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:8181/notes");
      setNotes(response.data);
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };

  const changetheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem("darkmode", darkMode);
    fetchNotes();
  }, []);

  const addNote = async (title, body) => {
    try {
      const response = await axios.post("http://localhost:8181/notes", {
        title,
        body,
      });
      fetchNotes();
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };

  const handleOpen = (note) => {
    setCurrentNote(note);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleUpdate = async () => {
    if (currentNote) {
      try {
        await axios.put(
          `http://localhost:8181/notes/${currentNote.id}`,
          currentNote
        );
        fetchNotes();
        handleClose();
      } catch (error) {
        console.error("Error updating note:", error);
      }
    }
  };
  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:8181/notes/${id}`);
      console.log("Successfully deleted");
      fetchNotes(); 
    } catch (error) {
      console.error("Error occurred while deleting note:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AppBar position="static" >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          <Button color="inherit">Login</Button>
         <Button variant="contained" color="success" onClick={changetheme}>Theme</Button>
        </Toolbar>
      </AppBar>
      <AddNotes addNote={addNote} />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          {notes.map((item) => (
            <Grid size xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2">{item.body}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {item.createdAt}
                  </Typography>
                  <Button onClick={() => handleOpen(item)}>Edit</Button>
                  <Button onClick={() => deleteNote(item.id)}>Delete</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Update Note Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="update-note-modal"
        aria-describedby="update-note-modal-description"
      >
        <Box
          sx={{
            width: 400,
            margin: "auto",
            marginTop: "10%",
            padding: 2,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 1,
          }}
        >
          <Typography id="update-note-modal" variant="h6" component="h2">
            Update Note
          </Typography>
          {currentNote && (
            <Stack direction="column" spacing={2}>
              <TextField
                label="Title"
                value={currentNote.title}
                onChange={(e) =>
                  setCurrentNote({ ...currentNote, title: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Body"
                value={currentNote.body}
                onChange={(e) =>
                  setCurrentNote({ ...currentNote, body: e.target.value })
                }
                fullWidth
                margin="normal"
                multiline
                rows={4}
              />
              <Button onClick={handleUpdate} variant="contained">
                Update Note
              </Button>
            </Stack>
          )}
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
