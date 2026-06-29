import React from "react";
import {
  Grid,
  Typography,
  Card,
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  FormControlLabel,
  Switch
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Step5Documents({ ctx }) {
  const {
    formState,
    documentInput,
    setDocumentInput,
    addDocument,
    removeDocument,
    handleNestedCheckboxChange,
    handleKeyValueChange,
    addKeyValueRow,
    removeKeyValueRow,
  } = ctx;

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ color: "primary.main", mb: 2 }}>
            Documents
          </Typography>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                label="Document Name"
                size="small"
                fullWidth
                value={documentInput.name}
                onChange={(e) => setDocumentInput({ ...documentInput, name: e.target.value })}
                required
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Document URL"
                size="small"
                fullWidth
                value={documentInput.url}
                onChange={(e) => setDocumentInput({ ...documentInput, url: e.target.value })}
                required
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Document Type (e.g. pdf, png)"
                size="small"
                fullWidth
                value={documentInput.type}
                onChange={(e) => setDocumentInput({ ...documentInput, type: e.target.value })}
                required
              />
            </Grid>
            <Grid size={12}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<AddIcon />}
                onClick={addDocument}
              >
                Add Document
              </Button>
            </Grid>
          </Grid>
          <List dense sx={{ mt: 2, maxHeight: 150, overflow: "auto" }}>
            {formState.documents.map((d, idx) => (
              <ListItem key={idx} divider>
                <ListItemText
                  primary={d.name}
                  secondary={`Type: ${d.type} | URL: ${d.url}`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" color="error" onClick={() => removeDocument(idx)}>
                    <DeleteIcon size="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Card>

        <Card variant="outlined" sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6" color="secondary" sx={{ mb: 2 }}>
            <SettingsIcon fontSize="small" /> Settings
          </Typography>
          <Grid container spacing={1}>
            <Grid size={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formState.settings.show_score}
                    onChange={(e) => handleNestedCheckboxChange("settings", "show_score", e.target.checked)}
                  />
                }
                label="Show Score"
              />
            </Grid>
            <Grid size={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formState.settings.show_rank}
                    onChange={(e) => handleNestedCheckboxChange("settings", "show_rank", e.target.checked)}
                  />
                }
                label="Show Rank"
              />
            </Grid>
            <Grid size={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formState.settings.downloadable}
                    onChange={(e) => handleNestedCheckboxChange("settings", "downloadable", e.target.checked)}
                  />
                }
                label="Downloadable"
              />
            </Grid>
            <Grid size={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formState.settings.public_profile}
                    onChange={(e) => handleNestedCheckboxChange("settings", "public_profile", e.target.checked)}
                  />
                }
                label="Public Profile"
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Card variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle1" color="secondary">
            Metadata (Key:Value)
          </Typography>
          {formState.metadata.map((item, index) => (
            <Box key={`meta-${index}`} sx={{ display: "flex", gap: 1, mb: 1 }}>
              <TextField
                size="small"
                label="Key"
                value={item.key}
                onChange={(e) => handleKeyValueChange("metadata", index, "key", e.target.value)}
              />
              <TextField
                size="small"
                label="Value"
                fullWidth
                value={item.value}
                onChange={(e) => handleKeyValueChange("metadata", index, "value", e.target.value)}
              />
              <IconButton color="error" onClick={() => removeKeyValueRow("metadata", index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button
            size="small"
            startIcon={<AddIcon />}
            onClick={() => addKeyValueRow("metadata")}
          >
            Add Row
          </Button>
        </Card>

        <Card variant="outlined" sx={{ p: 2, mt: 2 }}>
          <Typography variant="subtitle1" color="secondary">
            Custom Fields (Key:Value)
          </Typography>
          {formState.custom_fields.map((item, index) => (
            <Box key={`cust-${index}`} sx={{ display: "flex", gap: 1, mb: 1 }}>
              <TextField
                size="small"
                label="Key"
                value={item.key}
                onChange={(e) => handleKeyValueChange("custom_fields", index, "key", e.target.value)}
              />
              <TextField
                size="small"
                label="Value"
                fullWidth
                value={item.value}
                onChange={(e) => handleKeyValueChange("custom_fields", index, "value", e.target.value)}
              />
              <IconButton color="error" onClick={() => removeKeyValueRow("custom_fields", index)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button
            size="small"
            startIcon={<AddIcon />}
            onClick={() => addKeyValueRow("custom_fields")}
          >
            Add Row
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
}
