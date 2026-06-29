import React from "react";
import { Grid, Typography, TextField, MenuItem, Divider, Chip } from "@mui/material";

export default function Step1CertInfo({ ctx }) {
  const { formState, handleTextChange } = ctx;

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Typography variant="h6" color="secondary">
          Certificate Information
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 8 }}>
        <TextField
          label="Certificate Name"
          fullWidth
          value={formState.name}
          onChange={(e) => handleTextChange("name", e.target.value)}
          required
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          select
          label="Status"
          fullWidth
          value={formState.status}
          onChange={(e) => handleTextChange("status", e.target.value)}
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Revoked">Revoked</MenuItem>
          <MenuItem value="Suspended">Suspended</MenuItem>
        </TextField>
      </Grid>
      <Grid size={{ xs: 12, sm: 8 }}>
        <TextField
          label="Course Title"
          fullWidth
          value={formState.course}
          onChange={(e) => handleTextChange("course", e.target.value)}
          required
        />
      </Grid>

      <Grid size={12}>
        <Divider sx={{ my: 1 }}>
          <Chip label="Dates" size="small" />
        </Divider>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label="Issue Date"
          type="datetime-local"
          fullWidth
          value={formState.issue_date}
          onChange={(e) => handleTextChange("issue_date", e.target.value)}
          required
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label="Expiry Date"
          type="datetime-local"
          fullWidth
          value={formState.expiry_date}
          onChange={(e) => handleTextChange("expiry_date", e.target.value)}
          required
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
      </Grid>
    </Grid>
  );
}
