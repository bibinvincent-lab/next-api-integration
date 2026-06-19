"use client";

import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Switch,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Snackbar,
  Alert,
  Chip,
  Avatar,
  CircularProgress,
  InputAdornment,
  Stepper,
  Step,
  StepLabel,
  MenuItem,
  Autocomplete
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Send as SendIcon,
  Autorenew as AutorenewIcon,
  Clear as ClearIcon,
  Code as CodeIcon,
  School as SchoolIcon,
  PostAdd as PostAddIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  TrendingUp as TrendingUpIcon,
  Settings as SettingsIcon,
  Link as LinkIcon,
  History as HistoryIcon
} from "@mui/icons-material";

// Custom Sleek Dark Theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
      light: "#e3f2fd",
      dark: "#42a5f5",
    },
    secondary: {
      main: "#ce93d8",
      light: "#f3e5f5",
      dark: "#ab47bc",
    },
    background: {
      default: "#0f0f1b",
      paper: "#1e1e30",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
    success: {
      main: "#4caf50",
    },
    error: {
      main: "#f44336",
    },
  },
  typography: {
    fontFamily: '"Outfit", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 800,
      letterSpacing: "0.5px",
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderRadius: 16,
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 20px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          padding: "24px",
          background: "rgba(0,0,0,0.1)",
          borderRadius: "12px",
          marginBottom: "24px"
        }
      }
    }
  },
});

const DEFAULT_STATE = {
  name: "",
  course: "",
  grade: "",
  status: "Draft",
  score: "",
  rank: "",
  issue_date: "",
  expiry_date: "",
  
  student: {
    name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    interests: [],
  },
  
  tags: [],
  categories: [],
  skills: [],
  
  modules: [],
  achievements: [],
  documents: [],
  
  metadata: [{ key: "", value: "" }],
  custom_fields: [{ key: "", value: "" }],
  
  settings: {
    show_score: true,
    show_rank: true,
    downloadable: true,
    public_profile: true,
  },
};

const SAMPLE_CERTIFICATE = {
  name: "Alice Johnson",
  course: "Mastering Next.js 16 & MUI",
  grade: "A+",
  status: "Completed",
  score: "98.5",
  rank: "1",
  issue_date: new Date().toISOString().slice(0, 16),
  expiry_date: new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
  student: {
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+1-555-9876",
    country: "Canada",
    city: "Toronto",
    interests: ["React", "Next.js", "Material UI"],
  },
  tags: ["nextjs", "mui", "frontend"],
  categories: ["Software Engineering"],
  skills: ["Next.js", "React"],
  modules: [
    {
      id: "1",
      name: "Introduction to Next.js App Router",
      score: "95",
      max_score: "100",
      passed: true,
      completed_at: new Date().toISOString().slice(0, 16),
    },
    {
      id: "2",
      name: "Advanced Material UI Theming",
      score: "100",
      max_score: "100",
      passed: true,
      completed_at: new Date().toISOString().slice(0, 16),
    }
  ],
  achievements: [
    {
      id: "1",
      title: "Pixel Perfect Master",
      description: "Designed a stunning user interface.",
      badge_url: "https://picsum.photos/id/1026/50/50",
    }
  ],
  documents: [
    {
      id: "1",
      name: "alice_nextjs_cert.pdf",
      type: "pdf",
      size: "482019",
      url: "https://example.com/certs/alice_nextjs_cert.pdf",
    }
  ],
  metadata: [{ key: "language", value: "English" }, { key: "cohort", value: "2026-Q2" }],
  custom_fields: [{ key: "graduation_hat_color", value: "Gold" }, { key: "honors", value: "First Class" }],
  settings: {
    show_score: true,
    show_rank: true,
    downloadable: true,
    public_profile: true,
  },
};

const steps = [
  "Certificate Information",
  "Student Information",
  "Assessment Information",
  "Recognition & Classification",
  "Documents & Configuration",
  "Review & Submit"
];

export default function Home() {
  const [formState, setFormState] = useState(DEFAULT_STATE);
  const [certificates, setCertificates] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [showJsonView, setShowJsonView] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  
  // List details
  const [moduleInput, setModuleInput] = useState({ id: "", name: "", score: "", max_score: "", passed: true, completed_at: "" });
  const [achievementInput, setAchievementInput] = useState({ id: "", title: "", description: "", badge_url: "" });
  const [documentInput, setDocumentInput] = useState({ id: "", name: "", type: "", size: "", url: "" });

  // Notifications
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    setLoadingList(true);
    try {
      const res = await fetch("/api/certificates");
      if (res.ok) {
        const data = await res.json();
        setCertificates(Array.isArray(data) ? data : []);
      } else {
        showNotification("Failed to fetch certificates from backend", "error");
      }
    } catch (err) {
      showNotification("Error connecting to server proxy", "error");
    } finally {
      setLoadingList(false);
    }
  };

  const showNotification = (message, severity = "success") => {
    setNotification({ open: true, message, severity });
  };

  const handleTextChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormState((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const handleNestedCheckboxChange = (parent, field, checked) => {
    setFormState((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: checked,
      },
    }));
  };

  const handleLoadSample = () => {
    setFormState(JSON.parse(JSON.stringify(SAMPLE_CERTIFICATE)));
    showNotification("Loaded mock certificate template!");
  };

  const handleClear = () => {
    setFormState(DEFAULT_STATE);
    setActiveStep(0);
    showNotification("Form cleared", "info");
  };

  // Dynamic Key-Value Lists
  const handleKeyValueChange = (type, index, field, value) => {
    setFormState((prev) => {
      const newArray = [...prev[type]];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [type]: newArray };
    });
  };

  const addKeyValueRow = (type) => {
    setFormState((prev) => ({
      ...prev,
      [type]: [...prev[type], { key: "", value: "" }]
    }));
  };

  const removeKeyValueRow = (type, index) => {
    setFormState((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  // Lists
  const addModule = () => {
    if (!moduleInput.name) {
      showNotification("Module Name is required", "warning");
      return;
    }
    setFormState((prev) => ({
      ...prev,
      modules: [...prev.modules, { ...moduleInput }],
    }));
    setModuleInput({ id: "", name: "", score: "", max_score: "", passed: true, completed_at: "" });
  };

  const removeModule = (index) => {
    setFormState((prev) => ({ ...prev, modules: prev.modules.filter((_, i) => i !== index) }));
  };

  const addAchievement = () => {
    if (!achievementInput.title) {
      showNotification("Achievement Title is required", "warning");
      return;
    }
    setFormState((prev) => ({
      ...prev,
      achievements: [...prev.achievements, { ...achievementInput }],
    }));
    setAchievementInput({ id: "", title: "", description: "", badge_url: "" });
  };

  const removeAchievement = (index) => {
    setFormState((prev) => ({ ...prev, achievements: prev.achievements.filter((_, i) => i !== index) }));
  };

  const addDocument = () => {
    if (!documentInput.name || !documentInput.url) {
      showNotification("Document Name and URL are required", "warning");
      return;
    }
    if (!isValidURL(documentInput.url)) {
      showNotification("Please enter a valid URL for the Document", "warning");
      return;
    }
    setFormState((prev) => ({
      ...prev,
      documents: [...prev.documents, { ...documentInput }],
    }));
    setDocumentInput({ id: "", name: "", type: "", size: "", url: "" });
  };

  const removeDocument = (index) => {
    setFormState((prev) => ({ ...prev, documents: prev.documents.filter((_, i) => i !== index) }));
  };

  const isValidURL = (string) => {
    if (!string) return true;
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateCurrentStep = () => {
    if (activeStep === 0) {
      if (!formState.name || !formState.course || !formState.issue_date) {
        showNotification("Certificate Name, Course, and Issue Date are required.", "warning");
        return false;
      }
    } else if (activeStep === 1) {
      if (!formState.student.name || !formState.student.email) {
        showNotification("Student Name and Email are required.", "warning");
        return false;
      }
      if (!isValidEmail(formState.student.email)) {
        showNotification("Please enter a valid Student Email.", "warning");
        return false;
      }
    } else if (activeStep === 3) {
       // achievements check
       for (const ach of formState.achievements) {
         if (ach.badge_url && !isValidURL(ach.badge_url)) {
           showNotification("One or more Achievement Badge URLs are invalid.", "warning");
           return false;
         }
       }
    }
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const getCompiledJson = () => {
    const currentIsoDate = new Date().toISOString();
    const futureIsoDate = new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toISOString();

    const toRFC3339 = (dateStr, fallback) => {
      if (!dateStr || dateStr === "") return fallback;
      try {
        const d = new Date(dateStr);
        return isNaN(d.getTime()) ? fallback : d.toISOString();
      } catch (e) {
        return fallback;
      }
    };

    const generatedId = Math.floor(Math.random() * 900000) + 100;

    const metadataObj = {};
    formState.metadata.forEach((item) => {
      if (item.key.trim() !== "") metadataObj[item.key.trim()] = item.value.trim();
    });

    const customFieldsObj = {};
    formState.custom_fields.forEach((item) => {
      if (item.key.trim() !== "") customFieldsObj[item.key.trim()] = item.value.trim();
    });

    // Auto-calculated fields
    const scoreVal = Number(formState.score) || 1;
    const percentageVal = scoreVal;
    const rankVal = Number(formState.rank) || 1;

    let isExpiredVal = false;
    if (formState.expiry_date) {
      const expDate = new Date(formState.expiry_date);
      if (!isNaN(expDate.getTime()) && expDate < new Date()) {
        isExpiredVal = true;
      }
    }

    // Ensure interests is always a non-empty array (Go binding:"required")
    const studentInterests = Array.isArray(formState.student.interests) && formState.student.interests.length > 0
      ? formState.student.interests
      : ["General"];

    // Ensure tags/categories/skills are non-empty arrays (Go binding:"required")
    const tags = formState.tags.length > 0 ? formState.tags : ["certificate"];
    const categories = formState.categories.length > 0 ? formState.categories : ["General"];
    const skills = formState.skills.length > 0 ? formState.skills : ["General"];

    // Ensure modules has at least one entry (Go binding:"required")
    const modules = formState.modules.length > 0
      ? formState.modules.map(m => ({
          id: Number(m.id) || Math.floor(Math.random() * 90000) + 100,
          name: m.name || "Module",
          score: Number(m.score) || 1,
          max_score: Number(m.max_score) || 100,
          passed: Boolean(m.passed),
          completed_at: toRFC3339(m.completed_at, currentIsoDate)
        }))
      : [{
          id: Math.floor(Math.random() * 90000) + 100,
          name: formState.course || "Core Module",
          score: scoreVal,
          max_score: 100,
          passed: true,
          completed_at: currentIsoDate
        }];

    // Ensure achievements has at least one entry (Go binding:"required")
    const achievements = formState.achievements.length > 0
      ? formState.achievements.map(a => ({
          id: Number(a.id) || Math.floor(Math.random() * 90000) + 100,
          title: a.title || "Achievement",
          description: a.description || "",
          badge_url: a.badge_url || ""
        }))
      : [{ id: Math.floor(Math.random() * 90000) + 100, title: "Course Completion", description: "Completed the course", badge_url: "" }];

    // Ensure documents has at least one entry (Go binding:"required", each item needs id/name/type/size/url)
    const documents = formState.documents.length > 0
      ? formState.documents.map(d => ({
          id: Number(d.id) || Math.floor(Math.random() * 90000) + 100,
          name: d.name || "document.pdf",
          type: d.type || "pdf",
          size: Number(d.size) || 1,
          url: d.url || "https://example.com/document.pdf"
        }))
      : [{
          id: Math.floor(Math.random() * 90000) + 100,
          name: "certificate.pdf",
          type: "pdf",
          size: 1,
          url: "https://example.com/certificate.pdf"
        }];

    const issueDateRFC = toRFC3339(formState.issue_date, currentIsoDate);
    const expiryDateRFC = toRFC3339(formState.expiry_date, futureIsoDate);

    return {
      id: generatedId,
      name: formState.name,
      course: formState.course,
      grade: formState.grade || "N/A",
      date: issueDateRFC,
      status: formState.status || "Completed",
      score: scoreVal,
      percentage: percentageVal,
      rank: rankVal,
      is_verified: true,
      is_expired: isExpiredVal,
      issue_date: issueDateRFC,
      expiry_date: expiryDateRFC,
      created_at: currentIsoDate,
      updated_at: currentIsoDate,
      student: {
        id: Math.floor(Math.random() * 900000) + 100,
        name: formState.student.name,
        email: formState.student.email,
        phone: formState.student.phone || "+0-000-0000",
        country: formState.student.country || "N/A",
        city: formState.student.city || "N/A",
        interests: studentInterests,
      },
      issuer: {
        id: Math.floor(Math.random() * 900000) + 100,
        name: "Kerala Blockchain Academy",
        email: "info@kba.ai",
        website: "https://kba.ai",
        logo: "https://picsum.photos/id/1025/100",
      },
      tags,
      categories,
      skills,
      modules,
      achievements,
      documents,
      metadata: metadataObj,
      custom_fields: customFieldsObj,
      statistics: {
        total_students: 0,
        average_score: 0,
        highest_score: 0,
        completion_rate: 0,
        global_ranking: 0,
        country_ranking: 0,
      },
      settings: formState.settings,
      links: {
        certificate_url: "",
        verify_url: "",
        download_url: "",
      },
      audit_trail: [
        {
          action: "created",
          user: "admin",
          ip_address: "127.0.0.1",
          timestamp: currentIsoDate,
        }
      ]
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateCurrentStep()) return;

    setSubmitting(true);
    setApiResponse(null);
    const payload = getCompiledJson();

    try {
      const res = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setApiResponse({
        status: res.status,
        statusText: res.statusText,
        data,
      });

      if (res.ok) {
        showNotification("Certificate created successfully!");
        fetchCertificates();
      } else {
        showNotification(data.error || "Failed to create certificate", "error");
      }
    } catch (err) {
      showNotification("Network error submitting certificate", "error");
      setApiResponse({ status: 500, error: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0a14 0%, #121226 100%)", py: 4 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
            <Box>
              <Typography variant="h4" sx={{ color: "primary.main", display: "flex", alignItems: "center", gap: 1.5 }}>
                <SchoolIcon fontSize="large" />
                Certificate Registry Admin
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <Button variant="outlined" color="secondary" startIcon={<AutorenewIcon />} onClick={handleLoadSample}>
                Autofill Sample
              </Button>
              <Button variant="outlined" color="error" startIcon={<ClearIcon />} onClick={handleClear}>
                Reset
              </Button>
            </Box>
          </Box>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, lg: 8 }}>
              <Card>
                <CardHeader
                  title="Certificate Credentials Builder"
                  subheader="Complete all steps to submit the credential"
                  avatar={<Avatar sx={{ bgcolor: "primary.main" }}><PostAddIcon /></Avatar>}
                  sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}
                />
                <CardContent sx={{ minHeight: "450px", pt: 4 }}>
                  <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>

                  {/* Step 1: Certificate Information */}
                  {activeStep === 0 && (
                    <Grid container spacing={3}>
                      <Grid size={12}><Typography variant="h6" color="secondary">Certificate Information</Typography></Grid>
                      <Grid size={{ xs: 12, sm: 8 }}>
                        <TextField label="Certificate Name *" fullWidth value={formState.name} onChange={(e) => handleTextChange("name", e.target.value)} required />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField select label="Status" fullWidth value={formState.status} onChange={(e) => handleTextChange("status", e.target.value)}>
                          <MenuItem value="Draft">Draft</MenuItem>
                          <MenuItem value="Completed">Completed</MenuItem>
                          <MenuItem value="Revoked">Revoked</MenuItem>
                          <MenuItem value="Suspended">Suspended</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 8 }}>
                        <TextField label="Course Title *" fullWidth value={formState.course} onChange={(e) => handleTextChange("course", e.target.value)} required />
                      </Grid>

                      <Grid size={12}><Divider sx={{ my: 1 }}><Chip label="Dates" size="small" /></Divider></Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField label="Issue Date *" type="datetime-local" fullWidth value={formState.issue_date} onChange={(e) => handleTextChange("issue_date", e.target.value)} required slotProps={{
    inputLabel: {
      shrink: true,
    },
  }} />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField label="Expiry Date" type="datetime-local" fullWidth value={formState.expiry_date} onChange={(e) => handleTextChange("expiry_date", e.target.value)} slotProps={{
    inputLabel: {
      shrink: true,
    },
  }} helperText="Leave blank if does not expire" />
                      </Grid>
                    </Grid>
                  )}

                  {/* Step 2: Student Information */}
                  {activeStep === 1 && (
                    <Grid container spacing={3}>
                      <Grid size={12}><Typography variant="h6" color="secondary">Student Profile Details</Typography></Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField label="Student Name *" fullWidth value={formState.student.name} onChange={(e) => handleNestedChange("student", "name", e.target.value)} required />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField label="Student Email *" type="email" fullWidth value={formState.student.email} onChange={(e) => handleNestedChange("student", "email", e.target.value)} required />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField label="Student Phone" fullWidth value={formState.student.phone} onChange={(e) => handleNestedChange("student", "phone", e.target.value)} />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField label="Country" fullWidth value={formState.student.country} onChange={(e) => handleNestedChange("student", "country", e.target.value)} />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField label="City" fullWidth value={formState.student.city} onChange={(e) => handleNestedChange("student", "city", e.target.value)} />
                      </Grid>
                      <Grid size={12}>
                        <Autocomplete
                          multiple
                          freeSolo
                          options={[]}
                          value={formState.student.interests}
                          onChange={(_, newValue) => handleNestedChange("student", "interests", newValue)}
                          renderValue={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip variant="outlined" label={option} {...getTagProps({ index })} color="primary" key={index} />
                            ))
                          }
                          renderInput={(params) => (
                            <TextField {...params} label="Student Interests" placeholder="Type and press enter" />
                          )}
                        />
                      </Grid>
                    </Grid>
                  )}

                  {/* Step 3: Assessment Information */}
                  {activeStep === 2 && (
                    <Grid container spacing={3}>
                      <Grid size={12}><Typography variant="h6" color="secondary">Assessment Results (Optional)</Typography></Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField label="Score" type="number" fullWidth value={formState.score} onChange={(e) => handleTextChange("score", e.target.value)} helperText="Percentage is auto-calculated" />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField select label="Grade" fullWidth value={formState.grade} onChange={(e) => handleTextChange("grade", e.target.value)}>
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
                        <TextField label="Class Rank" type="number" fullWidth value={formState.rank} onChange={(e) => handleTextChange("rank", e.target.value)} />
                      </Grid>

                      <Grid size={12}><Divider sx={{ my: 1 }}><Chip label="Modules" size="small" /></Divider></Grid>
                      <Grid size={12}>
                        <Card variant="outlined" sx={{ p: 2 }}>
                          <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                              <TextField label="Module Name" size="small" fullWidth value={moduleInput.name} onChange={(e) => setModuleInput({ ...moduleInput, name: e.target.value })} />
                            </Grid>
                             
                              <Grid size={{ xs: 4, sm: 2 }}>
                              <TextField label="Score" type="number" size="small" value={moduleInput.score} onChange={(e) => setModuleInput({ ...moduleInput, score: e.target.value })} />
                            </Grid>
                            <Grid size={{ xs: 4, sm: 2 }}>
                              <TextField label="Max" type="number" size="small" value={moduleInput.max_score} onChange={(e) => setModuleInput({ ...moduleInput, max_score: e.target.value })} />
                            </Grid>
                            <Grid size={{ xs: 4, sm: 2 }}>
                              <FormControlLabel control={<Checkbox checked={moduleInput.passed} onChange={(e) => setModuleInput({ ...moduleInput, passed: e.target.checked })} size="small" />} label="Passed" />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                              <TextField label="Completed At" type="datetime-local" size="small" fullWidth slotProps={{
    inputLabel: {
      shrink: true,
    },
  }} value={moduleInput.completed_at} onChange={(e) => setModuleInput({ ...moduleInput, completed_at: e.target.value })} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                              <Button variant="outlined" fullWidth startIcon={<AddIcon />} onClick={addModule}>Add Module</Button>
                            </Grid>
                          </Grid>
                          <List dense sx={{ mt: 2, maxHeight: 180, overflow: "auto" }}>
                            {formState.modules.map((m, idx) => (
                              <ListItem key={idx} divider>
                                <ListItemText primary={`${m.name}`} secondary={`Score: ${m.score}/${m.max_score} • Passed: ${m.passed ? 'Yes' : 'No'} • Date: ${m.completed_at}`} />
                                <ListItemSecondaryAction><IconButton edge="end" color="error" onClick={() => removeModule(idx)}><DeleteIcon size="small" /></IconButton></ListItemSecondaryAction>
                              </ListItem>
                            ))}
                          </List>
                        </Card>
                      </Grid>
                    </Grid>
                  )}

                  {/* Step 4: Recognition & Classification */}
                  {activeStep === 3 && (
                    <Grid container spacing={3}>
                       <Grid size={12}><Typography variant="h6" color="secondary">Classification</Typography></Grid>
                       <Grid size={12}>
                        <Autocomplete
                          multiple
                          freeSolo
                          options={[]}
                          value={formState.categories}
                          onChange={(_, newValue) => handleTextChange("categories", newValue)}
                          renderValue={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip variant="outlined" label={option} {...getTagProps({ index })} color="secondary" key={index} />
                            ))
                          }
                          renderInput={(params) => <TextField {...params} label="Categories" placeholder="e.g. Software Engineering" />}
                        />
                      </Grid>
                      <Grid size={12}>
                        <Autocomplete
                          multiple
                          freeSolo
                          options={[]}
                          value={formState.skills}
                          onChange={(_, newValue) => handleTextChange("skills", newValue)}
                          renderValue={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip variant="outlined" label={option} {...getTagProps({ index })} color="success" key={index} />
                            ))
                          }
                          renderInput={(params) => <TextField {...params} label="Skills Acquired" placeholder="e.g. Next.js, React" />}
                        />
                      </Grid>
                      <Grid size={12}>
                        <Autocomplete
                          multiple
                          freeSolo
                          options={[]}
                          value={formState.tags}
                          onChange={(_, newValue) => handleTextChange("tags", newValue)}
                          renderValue={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip variant="outlined" label={option} {...getTagProps({ index })} color="primary" key={index} />
                            ))
                          }
                          renderInput={(params) => <TextField {...params} label="Tags" placeholder="e.g. frontend, webdev" />}
                        />
                      </Grid>

                      <Grid size={12}><Divider sx={{ my: 1 }}><Chip label="Achievements" size="small" /></Divider></Grid>
                      <Grid size={12}>
                        <Card variant="outlined" sx={{ p: 2 }}>
                          <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                              <TextField label="Achievement Title" size="small" fullWidth value={achievementInput.title} onChange={(e) => setAchievementInput({ ...achievementInput, title: e.target.value })} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                              <TextField label="Badge URL" size="small" type="url" fullWidth value={achievementInput.badge_url} onChange={(e) => setAchievementInput({ ...achievementInput, badge_url: e.target.value })} error={achievementInput.badge_url ? !isValidURL(achievementInput.badge_url) : false} />
                            </Grid>
                            <Grid size={12}>
                              <TextField label="Description" size="small" fullWidth value={achievementInput.description} onChange={(e) => setAchievementInput({ ...achievementInput, description: e.target.value })} />
                            </Grid>
                            <Grid size={12}>
                              <Button variant="outlined" fullWidth startIcon={<AddIcon />} onClick={addAchievement}>Add Achievement</Button>
                            </Grid>
                          </Grid>
                          <List dense sx={{ mt: 2, maxHeight: 180, overflow: "auto" }}>
                            {formState.achievements.map((a, idx) => (
                              <ListItem key={idx} divider>
                                <ListItemText primary={a.title} secondary={a.description} />
                                <ListItemSecondaryAction><IconButton edge="end" color="error" onClick={() => removeAchievement(idx)}><DeleteIcon size="small" /></IconButton></ListItemSecondaryAction>
                              </ListItem>
                            ))}
                          </List>
                        </Card>
                      </Grid>
                    </Grid>
                  )}

                  {/* Step 5: Documents & Configuration */}
                  {activeStep === 4 && (
                    <Grid container spacing={3}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Card variant="outlined" sx={{ p: 2 }}>
                          <Typography variant="h6" sx={{ color: "primary.main", mb: 2 }}>Documents</Typography>
                          <Grid container spacing={2}>
                            <Grid size={12}>
                              <TextField label="Document Name" size="small" fullWidth value={documentInput.name} onChange={(e) => setDocumentInput({ ...documentInput, name: e.target.value })} />
                            </Grid>
                            <Grid size={12}>
                              <TextField label="Document URL" size="small" fullWidth value={documentInput.url} onChange={(e) => setDocumentInput({ ...documentInput, url: e.target.value })} />
                            </Grid>
                            <Grid size={12}>
                              <TextField label="Document Type (e.g. pdf, png)" size="small" fullWidth value={documentInput.type} onChange={(e) => setDocumentInput({ ...documentInput, type: e.target.value })} />
                            </Grid>
                            <Grid size={12}>
                              <Button variant="outlined" fullWidth startIcon={<AddIcon />} onClick={addDocument}>Add Document</Button>
                            </Grid>
                          </Grid>
                          <List dense sx={{ mt: 2, maxHeight: 150, overflow: "auto" }}>
                            {formState.documents.map((d, idx) => (
                              <ListItem key={idx} divider>
                                <ListItemText primary={d.name} secondary={`Type: ${d.type} | URL: ${d.url}`} />
                                <ListItemSecondaryAction><IconButton edge="end" color="error" onClick={() => removeDocument(idx)}><DeleteIcon size="small" /></IconButton></ListItemSecondaryAction>
                              </ListItem>
                            ))}
                          </List>
                        </Card>
                        
                        <Card variant="outlined" sx={{ p: 2, mt: 2 }}>
                          <Typography variant="h6" color="secondary" sx={{ mb: 2 }}><SettingsIcon fontSize="small" /> Settings</Typography>
                          <Grid container spacing={1}>
                            <Grid size={6}><FormControlLabel control={<Switch checked={formState.settings.show_score} onChange={(e) => handleNestedCheckboxChange("settings", "show_score", e.target.checked)} />} label="Show Score" /></Grid>
                            <Grid size={6}><FormControlLabel control={<Switch checked={formState.settings.show_rank} onChange={(e) => handleNestedCheckboxChange("settings", "show_rank", e.target.checked)} />} label="Show Rank" /></Grid>
                            <Grid size={6}><FormControlLabel control={<Switch checked={formState.settings.downloadable} onChange={(e) => handleNestedCheckboxChange("settings", "downloadable", e.target.checked)} />} label="Downloadable" /></Grid>
                            <Grid size={6}><FormControlLabel control={<Switch checked={formState.settings.public_profile} onChange={(e) => handleNestedCheckboxChange("settings", "public_profile", e.target.checked)} />} label="Public Profile" /></Grid>
                          </Grid>
                        </Card>
                      </Grid>

                      <Grid size={{ xs: 12, md: 6 }}>
                        <Card variant="outlined" sx={{ p: 2 }}>
                          <Typography variant="subtitle1" color="secondary">Metadata (Key:Value)</Typography>
                          {formState.metadata.map((item, index) => (
                            <Box key={`meta-${index}`} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                              <TextField size="small" label="Key" value={item.key} onChange={(e) => handleKeyValueChange("metadata", index, "key", e.target.value)} />
                              <TextField size="small" label="Value" fullWidth value={item.value} onChange={(e) => handleKeyValueChange("metadata", index, "value", e.target.value)} />
                              <IconButton color="error" onClick={() => removeKeyValueRow("metadata", index)}><DeleteIcon /></IconButton>
                            </Box>
                          ))}
                          <Button size="small" startIcon={<AddIcon />} onClick={() => addKeyValueRow("metadata")}>Add Row</Button>
                        </Card>
                        
                        <Card variant="outlined" sx={{ p: 2, mt: 2 }}>
                          <Typography variant="subtitle1" color="secondary">Custom Fields (Key:Value)</Typography>
                          {formState.custom_fields.map((item, index) => (
                            <Box key={`cust-${index}`} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                              <TextField size="small" label="Key" value={item.key} onChange={(e) => handleKeyValueChange("custom_fields", index, "key", e.target.value)} />
                              <TextField size="small" label="Value" fullWidth value={item.value} onChange={(e) => handleKeyValueChange("custom_fields", index, "value", e.target.value)} />
                              <IconButton color="error" onClick={() => removeKeyValueRow("custom_fields", index)}><DeleteIcon /></IconButton>
                            </Box>
                          ))}
                          <Button size="small" startIcon={<AddIcon />} onClick={() => addKeyValueRow("custom_fields")}>Add Row</Button>
                        </Card>
                      </Grid>
                    </Grid>
                  )}

                  {/* Step 6: Review & Submit */}
                  {activeStep === 5 && (
                    <Box sx={{ textAlign: "center" }}>
                      <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
                      <Typography variant="h5" gutterBottom>Ready to Submit!</Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        Please review the certificate details below before confirming creation.
                        System fields (URLs, IDs, Status calculations) will be automatically generated.
                      </Typography>
                      
                      <Card variant="outlined" sx={{ mb: 4, textAlign: 'left', p: 3, bgcolor: 'background.default' }}>
                        <Grid container spacing={2}>
                          <Grid size={6}><Typography variant="subtitle2" color="text.secondary">Name:</Typography><Typography variant="body1">{formState.name}</Typography></Grid>
                          <Grid size={6}><Typography variant="subtitle2" color="text.secondary">Course:</Typography><Typography variant="body1">{formState.course}</Typography></Grid>
                          <Grid size={6}><Typography variant="subtitle2" color="text.secondary">Student Email:</Typography><Typography variant="body1">{formState.student.email}</Typography></Grid>
                          <Grid size={6}><Typography variant="subtitle2" color="text.secondary">Issue Date:</Typography><Typography variant="body1">{formState.issue_date}</Typography></Grid>
                          <Grid size={6}><Typography variant="subtitle2" color="text.secondary">Status:</Typography><Typography variant="body1">{formState.status}</Typography></Grid>
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
                  )}

                  {/* Navigation Buttons */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
                      Back
                    </Button>
                    {activeStep < steps.length - 1 && (
                      <Button variant="contained" onClick={handleNext}>
                        Next Step
                      </Button>
                    )}
                  </Box>

                </CardContent>
              </Card>
            </Grid>

            {/* Right Column: Code viewer & Live Response */}
            <Grid size={{ xs: 12, lg: 4 }}>
              <Grid container spacing={3}>
                <Grid size={12}>
                  <Card>
                    <CardHeader
                      title="API Live Integration"
                      subheader="Payload view and Server REST API status"
                      avatar={<Avatar sx={{ bgcolor: "secondary.main" }}><CodeIcon /></Avatar>}
                      action={
                        <Button size="small" onClick={() => setShowJsonView(!showJsonView)}>
                          {showJsonView ? "Hide Code" : "Show Payload"}
                        </Button>
                      }
                      sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}
                    />
                    <CardContent>
                      {showJsonView ? (
                        <Box sx={{ bgcolor: "#05050f", p: 2, borderRadius: 2, overflowX: "auto", border: "1px solid rgba(255,255,255,0.05)" }}>
                          <pre style={{ margin: 0, fontSize: "11px", color: "#64b5f6" }}>
                            {JSON.stringify(getCompiledJson(), null, 2)}
                          </pre>
                        </Box>
                      ) : (
                        <Box sx={{ py: 1 }}>
                          <Typography variant="body2" sx={{ mb: 2 }}>
                            The form validates and compiles a complete JSON request that matches the Go API models perfectly. 
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1 }}>
                            <strong>Base URL:</strong> http://localhost:8081
                          </Typography>
                          <Chip label="Protected Endpoints" color="error" size="small" variant="outlined" />
                        </Box>
                      )}

                      {apiResponse && (
                        <Box sx={{ mt: 3 }}>
                          <Divider sx={{ mb: 2 }} />
                          <Typography variant="subtitle2" color="secondary" gutterBottom>
                            Last Server Response:
                          </Typography>
                          <Alert 
                            severity={apiResponse.status >= 200 && apiResponse.status < 300 ? "success" : "error"}
                            icon={apiResponse.status >= 200 && apiResponse.status < 300 ? <CheckCircleIcon /> : <ErrorIcon />}
                            sx={{ mb: 1 }}
                          >
                            HTTP Status: <strong>{apiResponse.status} {apiResponse.statusText}</strong>
                          </Alert>
                          <Box sx={{ bgcolor: "#070710", p: 1.5, borderRadius: 1.5, maxHeight: 180, overflowY: "auto", border: "1px solid rgba(255,255,255,0.05)" }}>
                            <pre style={{ margin: 0, fontSize: "10px", color: apiResponse.status >= 200 && apiResponse.status < 300 ? "#81c784" : "#e57373" }}>
                              {JSON.stringify(apiResponse.data || apiResponse.error, null, 2)}
                            </pre>
                          </Box>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={12}>
                  <Card sx={{ minHeight: "300px" }}>
                    <CardHeader
                      title="Registered Credentials"
                      subheader="Recently created certificates in system"
                      avatar={<Avatar sx={{ bgcolor: "success.main" }}><HistoryIcon /></Avatar>}
                    />
                    <CardContent>
                      {loadingList ? (
                        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                          <CircularProgress />
                        </Box>
                      ) : certificates.length === 0 ? (
                        <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 4 }}>
                          No certificates found in the registry.
                        </Typography>
                      ) : (
                        <List dense>
                          {certificates.slice(0, 5).map((cert) => (
                            <ListItem key={cert.id} divider>
                              <ListItemText 
                                primary={cert.name} 
                                secondary={`${cert.course} • ${new Date(cert.issue_date || cert.created_at).toLocaleDateString()}`} 
                              />
                              <Chip size="small" label={cert.status} color={cert.status === "Issued" ? "success" : "default"} />
                            </ListItem>
                          ))}
                        </List>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setNotification({ ...notification, open: false })} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
