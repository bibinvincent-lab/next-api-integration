import React from "react";
import {
  Grid,
  Typography,
  Card,
  Box,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SendIcon from "@mui/icons-material/Send";

export default function Step6Review({ ctx }) {
  const { formState, handleSubmit, submitting } = ctx;

  return (
    <Box sx={{ textAlign: "center" }}>
      <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
      <Typography variant="h5" gutterBottom>Ready to Submit!</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Please review the certificate details below before confirming creation.
        System fields (URLs, IDs, Status calculations) will be automatically generated.
      </Typography>

      <Card
        variant="outlined"
        sx={{
          mb: 4,
          p: 3,
          textAlign: "left",
          bgcolor: "background.default",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Certificate Information
        </Typography>

        <Grid container spacing={2}>
          <Grid size={6}>
            <Typography color="text.secondary">Certificate Name</Typography>
            <Typography>{formState.name}</Typography>
          </Grid>

          <Grid size={6}>
            <Typography color="text.secondary">Course</Typography>
            <Typography>{formState.course}</Typography>
          </Grid>

          <Grid size={6}>
            <Typography color="text.secondary">Status</Typography>
            <Typography>{formState.status}</Typography>
          </Grid>

          <Grid size={6}>
            <Typography color="text.secondary">Grade</Typography>
            <Typography>{formState.grade || "-"}</Typography>
          </Grid>

          <Grid size={6}>
            <Typography color="text.secondary">Score</Typography>
            <Typography>{formState.score || "-"}</Typography>
          </Grid>

          <Grid size={6}>
            <Typography color="text.secondary">Rank</Typography>
            <Typography>{formState.rank || "-"}</Typography>
          </Grid>

          <Grid size={6}>
            <Typography color="text.secondary">Issue Date</Typography>
            <Typography>{formState.issue_date}</Typography>
          </Grid>

          <Grid size={6}>
            <Typography color="text.secondary">Expiry Date</Typography>
            <Typography>{formState.expiry_date || "No Expiry"}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Student Information
        </Typography>

        <Grid container spacing={2}>
          <Grid size={6}>
            <Typography color="text.secondary">Name</Typography>
            <Typography>{formState.student.name}</Typography>
          </Grid>

          <Grid size={6}>
            <Typography color="text.secondary">Email</Typography>
            <Typography>{formState.student.email}</Typography>
          </Grid>

          <Grid size={6}>
            <Typography color="text.secondary">Phone</Typography>
            <Typography>{formState.student.phone || "-"}</Typography>
          </Grid>

          <Grid size={6}>
            <Typography color="text.secondary">Country</Typography>
            <Typography>{formState.student.country || "-"}</Typography>
          </Grid>

          <Grid size={6}>
            <Typography color="text.secondary">City</Typography>
            <Typography>{formState.student.city || "-"}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Categories
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {formState.categories.map((item, idx) => (
            <Chip key={idx} label={item} color="secondary" />
          ))}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Skills
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {formState.skills.map((item, idx) => (
            <Chip key={idx} label={item} color="success" />
          ))}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Tags
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {formState.tags.map((item, idx) => (
            <Chip key={idx} label={item} color="primary" />
          ))}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Modules
        </Typography>

        <List dense>
          {formState.modules.map((module, idx) => (
            <ListItem key={idx}>
              <ListItemText
                primary={module.name}
                secondary={`Score: ${module.score}/${module.max_score} | Passed: ${module.passed ? "Yes" : "No"}`}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Achievements
        </Typography>

        <List dense>
          {formState.achievements.map((achievement, idx) => (
            <ListItem key={idx}>
              <ListItemText
                primary={achievement.title}
                secondary={achievement.description}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Documents
        </Typography>

        <List dense>
          {formState.documents.map((doc, idx) => (
            <ListItem key={idx}>
              <ListItemText
                primary={doc.name}
                secondary={`${doc.type} - ${doc.url}`}
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Settings
        </Typography>

        <Grid container spacing={2}>
          <Grid size={6}>
            <Typography>
              Show Score: {formState.settings.show_score ? "Yes" : "No"}
            </Typography>
          </Grid>

          <Grid size={6}>
            <Typography>
              Show Rank: {formState.settings.show_rank ? "Yes" : "No"}
            </Typography>
          </Grid>

          <Grid size={6}>
            <Typography>
              Downloadable: {formState.settings.downloadable ? "Yes" : "No"}
            </Typography>
          </Grid>

          <Grid size={6}>
            <Typography>
              Public Profile: {formState.settings.public_profile ? "Yes" : "No"}
            </Typography>
          </Grid>
        </Grid>
      </Card>
      
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleSubmit}
        disabled={submitting}
        endIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
        sx={{ px: 5, py: 1.5 }}
      >
        {submitting ? "Sending..." : "Confirm & Create Certificate"}
      </Button>
    </Box>
  );
}
