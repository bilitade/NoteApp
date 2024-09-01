import { AppBar, Typography, Button, Toolbar } from "@mui/material";
export default function MyAppBar() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
