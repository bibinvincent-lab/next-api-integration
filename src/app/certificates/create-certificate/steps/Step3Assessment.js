import React from "react";
import {
  Grid,
  Typography,
  TextField,
  MenuItem,
  Divider,
  Chip,
  Card,
  Checkbox,
  FormControlLabel,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Step3Assessment({ ctx }) {
  const {
    formState,
    moduleInput,
    setModuleInput,
    addModule,
    removeModule,
    handleTextChange,
  } = ctx;

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Typography variant="h6" color="secondary">
          Assessment Results
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          label="Score"
          type="number"
          fullWidth
          value={formState.score}
          onChange={(e) => handleTextChange("score", e.target.value)}
          helperText="Percentage is auto-calculated"
          required
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          select
          label="Grade"
          fullWidth
          value={formState.grade}
          onChange={(e) => handleTextChange("grade", e.target.value)}
          required
        >
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value="A+">A+</MenuItem>
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B+">B+</MenuItem>
          <MenuItem value="B">B</MenuItem>
          <MenuItem value="C">C</MenuItem>
          <MenuItem value="Pass">Pass</MenuItem>
          <MenuItem value="Distinction">Distinction</MenuItem>
        </TextField>
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField
          label="Class Rank"
          type="number"
          fullWidth
          value={formState.rank}
          onChange={(e) => handleTextChange("rank", e.target.value)}
          required
        />
      </Grid>

      <Grid size={12}>
        <Divider sx={{ my: 1 }}>
          <Chip label="Modules" size="small" />
        </Divider>
      </Grid>
      <Grid size={12}>
        <Card variant="outlined" sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Module Name"
                size="small"
                fullWidth
                value={moduleInput.name}
                onChange={(e) => setModuleInput({ ...moduleInput, name: e.target.value })}
                required
              />
            </Grid>

            <Grid size={{ xs: 4, sm: 2 }}>
              <TextField
                label="Score"
                type="number"
                size="small"
                value={moduleInput.score}
                onChange={(e) => setModuleInput({ ...moduleInput, score: e.target.value })}
                required
              />
            </Grid>
            <Grid size={{ xs: 4, sm: 2 }}>
              <TextField
                label="Max"
                type="number"
                size="small"
                value={moduleInput.max_score}
                onChange={(e) => setModuleInput({ ...moduleInput, max_score: e.target.value })}
                required
              />
            </Grid>
            <Grid size={{ xs: 4, sm: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={moduleInput.passed}
                    onChange={(e) => setModuleInput({ ...moduleInput, passed: e.target.checked })}
                    size="small"
                  />
                }
                label="Passed"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Completed At"
                type="datetime-local"
                size="small"
                required
                fullWidth
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                value={moduleInput.completed_at}
                onChange={(e) => setModuleInput({ ...moduleInput, completed_at: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<AddIcon />}
                onClick={addModule}
              >
                Add Module
              </Button>
            </Grid>
          </Grid>
          
          <List dense sx={{ mt: 2, maxHeight: 180, overflow: "auto" }}>
            {formState.modules.map((m, idx) => (
              <ListItem key={idx} divider>
                <ListItemText
                  primary={`${m.name}`}
                  secondary={`Score: ${m.score}/${m.max_score} • Passed: ${m.passed ? 'Yes' : 'No'} • Date: ${m.completed_at}`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" color="error" onClick={() => removeModule(idx)}>
                    <DeleteIcon size="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Card>
      </Grid>
    </Grid>
  );
}
