"use client";

import {
  Container,
  Paper,
  Typography,
} from "@mui/material";

export default function DummyPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Sample Page
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          This is a sample Next.js page created for testing purposes.
        </Typography>


       
      </Paper>
    </Container>
  );
}