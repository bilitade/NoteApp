import { useState } from "react";
import { Box, TextField, Stack, Card, Button } from "@mui/material";

export default function AddNotes(props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const handlesubmit=(e)=>{
    e.preventDefault()
    console.log("title",title)
    console.log("body", body)
    props.addNote(title,body);
  }



  return (
    <form onSubmit={handlesubmit}>
      <Card sx={{ p: 2, mt:4, maxWidth: 400, mx: 'auto' }}> {/* Center card and add padding */}
        <Stack direction={"column"} spacing={2}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            size="small" // Small size for the TextField
          />
          <TextField
            label="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            fullWidth
            size="small" // Small size for the TextField
          />
          <Button type="submit">Add Note</Button>
        </Stack>

      </Card>
    </form>
  );
}
