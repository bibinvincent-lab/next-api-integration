import React from "react";
import { Grid, Typography, TextField } from "@mui/material";

export default function Step2StudentInfo({ ctx }) {
  const { formState, handleNestedChange } = ctx;

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Typography variant="h6" color="secondary">
          Student Profile Details
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label="Student Name"
          fullWidth
          value={formState.student.name}
          onChange={(e) => handleNestedChange("student", "name", e.target.value)}
          required
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label="Student Email"
          type="email"
          fullWidth
          value={formState.student.email}
          onChange={(e) => handleNestedChange("student", "email", e.target.value)}
          required
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          label="Student Phone"
          fullWidth
          value={formState.student.phone}
          onChange={(e) => handleNestedChange("student", "phone", e.target.value)}
          required
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          label="Country"
          fullWidth
          value={formState.student.country}
          onChange={(e) => handleNestedChange("student", "country", e.target.value)}
          required
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          label="City"
          fullWidth
          value={formState.student.city}
          onChange={(e) => handleNestedChange("student", "city", e.target.value)}
          required
        />
      </Grid>
    </Grid>
  );
}
