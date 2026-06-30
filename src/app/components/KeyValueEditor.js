"use client";

import {
  Grid,
  TextField,
  Button,
  IconButton,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export default function KeyValueEditor({
  title,
  rows,
  setRows,
}) {
  const addRow = () => {
    setRows((prev) => [
      ...prev,
      {
        key: "",
        value: "",
      },
    ]);
  };

  const removeRow = (index) => {
    setRows((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const updateRow = (index, field, value) => {
    setRows((prev) =>
      prev.map((row, i) =>
        i === index
          ? {
              ...row,
              [field]: value,
            }
          : row
      )
    );
  };

  return (
    <>
      <Grid size={12}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {title}
        </Typography>
      </Grid>

      <Grid size={12}>
        {rows.map((row, index) => (
          <Grid
            container
            spacing={2}
            key={index}
            sx={{ mb: 2 }}
            alignItems="center"
          >
            <Grid size={5}>
              <TextField
                fullWidth
                label="Key"
                value={row.key}
                onChange={(e) =>
                  updateRow(index, "key", e.target.value)
                }
              />
            </Grid>

            <Grid size={6}>
              <TextField
                fullWidth
                label="Value"
                value={row.value}
                onChange={(e) =>
                  updateRow(index, "value", e.target.value)
                }
              />
            </Grid>

            <Grid size={1}>
              <IconButton
                color="error"
                onClick={() => removeRow(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={addRow}
        >
          Add Row
        </Button>
      </Grid>
    </>
  );
}