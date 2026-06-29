import React from "react";
import {
  Grid,
  Typography,
  Card,
  TextField,
  Button,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Step4Classification({ ctx }) {
  const {
    formState,
    categoryInput,
    setCategoryInput,
    skillInput,
    setSkillInput,
    tagInput,
    setTagInput,
    achievementInput,
    setAchievementInput,
    addItemToArray,
    removeItemFromArray,
    addAchievement,
    removeAchievement,
    isValidURL,
  } = ctx;

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Typography variant="h6" color="secondary">
          Classification
        </Typography>
      </Grid>

      {/* Categories */}
      <Grid size={12}>
        <Card variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Categories
          </Typography>

          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, sm: 9 }}>
              <TextField
                fullWidth
                label="Category"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => addItemToArray("categories", categoryInput, setCategoryInput)}
              >
                Add
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
            {formState.categories.map((item, idx) => (
              <Chip
                key={idx}
                label={item}
                color="secondary"
                onDelete={() => removeItemFromArray("categories", idx)}
              />
            ))}
          </Box>
        </Card>
      </Grid>

      {/* Skills */}
      <Grid size={12}>
        <Card variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Skills
          </Typography>

          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, sm: 9 }}>
              <TextField
                fullWidth
                label="Skill"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => addItemToArray("skills", skillInput, setSkillInput)}
              >
                Add
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
            {formState.skills.map((item, idx) => (
              <Chip
                key={idx}
                label={item}
                color="success"
                onDelete={() => removeItemFromArray("skills", idx)}
              />
            ))}
          </Box>
        </Card>
      </Grid>

      {/* Tags */}
      <Grid size={12}>
        <Card variant="outlined" sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Tags
          </Typography>

          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, sm: 9 }}>
              <TextField
                fullWidth
                label="Tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 3 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => addItemToArray("tags", tagInput, setTagInput)}
              >
                Add
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
            {formState.tags.map((item, idx) => (
              <Chip
                key={idx}
                label={item}
                color="primary"
                onDelete={() => removeItemFromArray("tags", idx)}
              />
            ))}
          </Box>
        </Card>
      </Grid>

      {/* Achievements */}
      <Grid size={12}>
        <Divider sx={{ my: 1 }}>
          <Chip label="Achievements" size="small" />
        </Divider>
      </Grid>
      
      <Grid size={12}>
        <Card variant="outlined" sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Achievement Title"
                size="small"
                fullWidth
                value={achievementInput.title}
                onChange={(e) => setAchievementInput({ ...achievementInput, title: e.target.value })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Badge URL"
                size="small"
                type="url"
                fullWidth
                value={achievementInput.badge_url}
                onChange={(e) => setAchievementInput({ ...achievementInput, badge_url: e.target.value })}
                error={achievementInput.badge_url ? !isValidURL(achievementInput.badge_url) : false}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Description"
                size="small"
                fullWidth
                value={achievementInput.description}
                onChange={(e) => setAchievementInput({ ...achievementInput, description: e.target.value })}
              />
            </Grid>
            <Grid size={12}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<AddIcon />}
                onClick={addAchievement}
              >
                Add Achievement
              </Button>
            </Grid>
          </Grid>

          <List dense sx={{ mt: 2, maxHeight: 180, overflow: "auto" }}>
            {formState.achievements.map((a, idx) => (
              <ListItem key={idx} divider>
                <ListItemText primary={a.title} secondary={a.description} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" color="error" onClick={() => removeAchievement(idx)}>
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
