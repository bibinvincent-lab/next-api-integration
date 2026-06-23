"use client";
import { useRouter } from "next/navigation";
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
  name: "Akhil",
  course: "Mastering Next.js 16 & MUI",
  grade: "A+",
  status: "Completed",
  score: "98.5",
  rank: "1",
  issue_date: new Date().toISOString().slice(0, 16),
  expiry_date: new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
  student: {
    name: "Akhil",
    email: "alice@example.com",
    phone: "+9155598765674",
    country: "India",
    city: "PTA",
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

  const router = useRouter();
  const [formState, setFormState] = useState(DEFAULT_STATE);
  const [certificates, setCertificates] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [showJsonView, setShowJsonView] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [skillInput, setSkillInput] = useState("");
  // List details
  const [moduleInput, setModuleInput] = useState({ id: "", name: "", score: "", max_score: "", passed: true, completed_at: "" });
  const [achievementInput, setAchievementInput] = useState({ id: "", title: "", description: "", badge_url: "" });
  const [documentInput, setDocumentInput] = useState({ id: "", name: "", type: "", size: "", url: "" });
const [createdCertificate, setCreatedCertificate] = useState(null);
  // Notifications
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });
const [categoryInput, setCategoryInput] = useState("");
const [tagInput, setTagInput] = useState("");
const isValidPhone = (phone) => {
  const re = /^\+?[1-9]\d{7,14}$/;
  return re.test(phone);
};
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
const addItemToArray = (field, value, setter) => {
  if (!value.trim()) {
    showNotification(`${field} cannot be empty`, "warning");
    return;
  }

  setFormState((prev) => {
    if (prev[field].includes(value.trim())) {
      showNotification(`${value} already exists`, "warning");
      return prev;
    }

    return {
      ...prev,
      [field]: [...prev[field], value.trim()],
    };
  });

  setter("");
};

const removeItemFromArray = (field, index) => {
  setFormState((prev) => ({
    ...prev,
    [field]: prev[field].filter((_, i) => i !== index),
  }));
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
const addSkill = () => {
  if (!skillInput.trim()) {
    showNotification("Skill is required", "warning");
    return;
  }

  if (formState.skills.includes(skillInput.trim())) {
    showNotification("Skill already added", "warning");
    return;
  }

  setFormState((prev) => ({
    ...prev,
    skills: [...prev.skills, skillInput.trim()],
  }));

  setSkillInput("");
};

const removeSkill = (index) => {
  setFormState((prev) => ({
    ...prev,
    skills: prev.skills.filter((_, i) => i !== index),
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

  // const validateCurrentStep = () => {
  //   if (activeStep === 0) {
  //     if (!formState.name || !formState.course || !formState.issue_date) {
  //       showNotification("Certificate Name, Course, and Issue Date are required.", "warning");
  //       return false;
  //     }
  //   } else if (activeStep === 1) {
  //     if (!formState.student.name || !formState.student.email) {
  //       showNotification("Student Name and Email are required.", "warning");
  //       return false;
  //     }
  //     if (!isValidEmail(formState.student.email)) {
  //       showNotification("Please enter a valid Student Email.", "warning");
  //       return false;
  //     }
  //   } else if (activeStep === 3) {
  //      // achievements check
  //      for (const ach of formState.achievements) {
  //        if (ach.badge_url && !isValidURL(ach.badge_url)) {
  //          showNotification("One or more Achievement Badge URLs are invalid.", "warning");
  //          return false;
  //        }
  //      }
  //   }
  //   return true;
  // };

  const validateStep1 = () => {
  if (!formState.name.trim()) {
    showNotification("Certificate Name is required.", "warning");
    return false;
  }

  if (!formState.course.trim()) {
    showNotification("Course Title is required.", "warning");
    return false;
  }

  if (!formState.issue_date) {
    showNotification("Issue Date is required.", "warning");
    return false;
  }

  if (
    formState.expiry_date &&
    new Date(formState.expiry_date) <= new Date(formState.issue_date)
  ) {
    showNotification(
      "Expiry Date must be later than Issue Date.",
      "warning"
    );
    return false;
  }

  return true;
};

const validateStep2 = () => {
  if (!formState.student.name.trim()) {
    showNotification("Student Name is required.", "warning");
    return false;
  }
  if (formState.skills.length === 0) {
  showNotification(
    "At least one skill is required.",
    "warning"
  );
  return false;
}
if (!isValidPhone(formState.student.phone)) {
  showNotification(
    "Please enter a valid phone number.",
    "warning"
  );
  return false;
}
  if (!formState.student.email.trim()) {
    showNotification("Student Email is required.", "warning");
    return false;
  }

  if (!isValidEmail(formState.student.email)) {
    showNotification("Please enter a valid Student Email.", "warning");
    return false;
  }

  if (!formState.student.phone.trim()) {
    showNotification("Student Phone is required.", "warning");
    return false;
  }

  if (!formState.student.country.trim()) {
    showNotification("Country is required.", "warning");
    return false;
  }

  if (!formState.student.city.trim()) {
    showNotification("City is required.", "warning");
    return false;
  }

  return true;
};

const validateStep3 = () => {
  if (!formState.score) {
    showNotification("Score is required.", "warning");
    return false;
  }

  const score = Number(formState.score);

  if (isNaN(score) || score < 0 || score > 100) {
    showNotification(
      "Score must be a number between 0 and 100.",
      "warning"
    );
    return false;
  }

  if (!formState.grade) {
    showNotification("Grade is required.", "warning");
    return false;
  }

  if (!formState.rank) {
    showNotification("Rank is required.", "warning");
    return false;
  }

  if (formState.modules.length === 0) {
    showNotification("At least one module is required.", "warning");
    return false;
  }

  for (const module of formState.modules) {
    if (!module.name || !module.name.trim()) {
      showNotification("Module Name is required.", "warning");
      return false;
    }

    if (
      Number(module.score) > Number(module.max_score)
    ) {
      showNotification(
        `Module "${module.name}" score cannot exceed max score.`,
        "warning"
      );
      return false;
    }
  }

  return true;
};

const validateStep4 = () => {
  if (formState.categories.length === 0) {
    showNotification(
      "At least one category is required.",
      "warning"
    );
    return false;
  }

  if (formState.skills.length === 0) {
    showNotification(
      "At least one skill is required.",
      "warning"
    );
    return false;
  }

  if (formState.tags.length === 0) {
    showNotification(
      "At least one tag is required.",
      "warning"
    );
    return false;
  }

  for (const ach of formState.achievements) {
    if (!ach.title || !ach.title.trim()) {
      showNotification(
        "Achievement Title cannot be empty.",
        "warning"
      );
      return false;
    }

    if (
      ach.badge_url &&
      !isValidURL(ach.badge_url)
    ) {
      showNotification(
        "One or more Achievement Badge URLs are invalid.",
        "warning"
      );
      return false;
    }
  }

  return true;
};

const validateStep5 = () => {
  if (formState.documents.length === 0) {
    showNotification(
      "At least one document is required.",
      "warning"
    );
    return false;
  }

  for (const doc of formState.documents) {
    if (!doc.name || !doc.name.trim()) {
      showNotification(
        "Document Name is required.",
        "warning"
      );
      return false;
    }

    if (!doc.url || !doc.url.trim()) {
      showNotification(
        "Document URL is required.",
        "warning"
      );
      return false;
    }

    if (!isValidURL(doc.url)) {
      showNotification(
        `Invalid URL for document "${doc.name}".`,
        "warning"
      );
      return false;
    }
  }

  return true;
};

const validateAll = () => {
  return (
    validateStep1() &&
    validateStep2() &&
    validateStep3() &&
    validateStep4() &&
    validateStep5()
  );
};



const handleNext = () => {
  let isValid = true;

  switch (activeStep) {
    case 0:
      isValid = validateStep1();
      break;

    case 1:
      isValid = validateStep2();
      break;

    case 2:
      isValid = validateStep3();
      break;

    case 3:
      isValid = validateStep4();
      break;

    case 4:
      isValid = validateStep5();
      break;

    default:
      break;
  }

  if (isValid) {
    setActiveStep((prev) => prev + 1);
  }
};

const handleBack = () => {
  if (activeStep === 0) {
    router.push("/certificates");
  } else {
    setActiveStep((prev) => prev - 1);
  }
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
const tags = formState.tags;
const categories = formState.categories;
const skills = formState.skills;

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
        name: "Test Academy",
        email: "info@test.ai",
        website: "https://test.ai",
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

  if (!validateAll()) return;

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
  setCreatedCertificate(data);

 showNotification(
  `Certificate #${data.id} (id) created successfully for ${data.student?.name || data.name}`,
  "success"
);

  setFormState(DEFAULT_STATE);
  setActiveStep(0);

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
                Certificate Registry
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
                        <TextField label="Certificate Name" fullWidth value={formState.name} onChange={(e) => handleTextChange("name", e.target.value)} required />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField select label="Status" fullWidth value={formState.status} onChange={(e) => handleTextChange("status", e.target.value)}>
                          <MenuItem value="Pending  ">Pending</MenuItem>
                          <MenuItem value="Completed">Completed</MenuItem>
                          <MenuItem value="Revoked">Revoked</MenuItem>
                          <MenuItem value="Suspended">Suspended</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 8 }}>
                        <TextField label="Course Title" fullWidth value={formState.course} onChange={(e) => handleTextChange("course", e.target.value)} required />
                      </Grid>

                      <Grid size={12}><Divider sx={{ my: 1 }}><Chip label="Dates" size="small" /></Divider></Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField label="Issue Date" type="datetime-local" fullWidth value={formState.issue_date} onChange={(e) => handleTextChange("issue_date", e.target.value)} required slotProps={{
    inputLabel: {
      shrink: true,
    },
  }} />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField label="Expiry Date" type="datetime-local" fullWidth value={formState.expiry_date} onChange={(e) => handleTextChange("expiry_date", e.target.value)} required slotProps={{
    inputLabel: {
      shrink: true,
    },
  }} />
                      </Grid>
                    </Grid>
                  )}

                  {/* Step 2: Student Information */}
                  {activeStep === 1 && (
                    <Grid container spacing={3}>
                      <Grid size={12}><Typography variant="h6" color="secondary">Student Profile Details</Typography></Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField label="Student Name" fullWidth value={formState.student.name} onChange={(e) => handleNestedChange("student", "name", e.target.value)} required />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField label="Student Email" type="email" fullWidth value={formState.student.email} onChange={(e) => handleNestedChange("student", "email", e.target.value)} required />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField label="Student Phone" fullWidth value={formState.student.phone} onChange={(e) => handleNestedChange("student", "phone", e.target.value)} required/>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField label="Country" fullWidth value={formState.student.country} onChange={(e) => handleNestedChange("student", "country", e.target.value)} required/>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField label="City" fullWidth value={formState.student.city} onChange={(e) => handleNestedChange("student", "city", e.target.value)} required />
                      </Grid>
                      
                      <Grid container spacing={2}>
  <Grid size={{ xs: 12, sm: 8 }}>
    <TextField
      label="Skill"
      fullWidth
      value={skillInput}
      onChange={(e) => setSkillInput(e.target.value)} required
    />
  </Grid>

  <Grid size={{ xs: 12, sm: 4 }}>
    <Button
      variant="outlined"
      fullWidth
      startIcon={<AddIcon />}
      onClick={addSkill}
    >
      Add Skill
    </Button>
  </Grid>

  <Grid size={12}>
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {formState.skills.map((skill, index) => (
        <Chip
          key={index}
          label={skill}
          color="success"
          onDelete={() => removeSkill(index)}
        />
      ))}
    </Box>
  </Grid>
</Grid>
                    </Grid>
                  )}

                  {/* Step 3: Assessment Information */}
                  {activeStep === 2 && (
                    <Grid container spacing={3}>
                      <Grid size={12}><Typography variant="h6" color="secondary">Assessment Results</Typography></Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField label="Score" type="number" fullWidth value={formState.score} onChange={(e) => handleTextChange("score", e.target.value)} helperText="Percentage is auto-calculated" required/>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <TextField select label="Grade" fullWidth value={formState.grade} onChange={(e) => handleTextChange("grade", e.target.value)} required>
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
                        <TextField label="Class Rank" type="number" fullWidth value={formState.rank} onChange={(e) => handleTextChange("rank", e.target.value)} required/>
                      </Grid>

                      <Grid size={12}><Divider sx={{ my: 1 }}><Chip label="Modules" size="small"/></Divider></Grid>
                      <Grid size={12}>
                        <Card variant="outlined" sx={{ p: 2 }}>
                          <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                              <TextField label="Module Name" size="small" fullWidth value={moduleInput.name} onChange={(e) => setModuleInput({ ...moduleInput, name: e.target.value })} required/>
                            </Grid>
                             
                              <Grid size={{ xs: 4, sm: 2 }}>
                              <TextField label="Score" type="number" size="small" value={moduleInput.score} onChange={(e) => setModuleInput({ ...moduleInput, score: e.target.value })} required />
                            </Grid>
                            <Grid size={{ xs: 4, sm: 2 }}>
                              <TextField label="Max" type="number" size="small" value={moduleInput.max_score} onChange={(e) => setModuleInput({ ...moduleInput, max_score: e.target.value })} required />
                            </Grid>
                            <Grid size={{ xs: 4, sm: 2 }}>
                              <FormControlLabel control={<Checkbox checked={moduleInput.passed} onChange={(e) => setModuleInput({ ...moduleInput, passed: e.target.checked })} size="small" />} label="Passed" />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                              <TextField label="Completed At" type="datetime-local" size="small" required fullWidth slotProps={{
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
  <Card variant="outlined" sx={{ p: 2 }}>
    <Typography variant="subtitle2" gutterBottom>
      Categories
    </Typography>

    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 9 }}>
        <TextField
          fullWidth
          label="Category"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)} required
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 3 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() =>
            addItemToArray("categories", categoryInput, setCategoryInput)
          } 
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


                      <Grid size={12}>
  <Card variant="outlined" sx={{ p: 2 }}>
    <Typography variant="subtitle2" gutterBottom>
      Skills
    </Typography>

    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 9 }}>
        <TextField
          fullWidth
          label="Skill"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)} required
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 3 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() =>
            addItemToArray("skills", skillInput, setSkillInput)
          }
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
                  

                      <Grid size={12}>
  <Card variant="outlined" sx={{ p: 2 }}>
    <Typography variant="subtitle2" gutterBottom>
      Tags
    </Typography>

    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 9 }}>
        <TextField
          fullWidth
          label="Tag"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)} required
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 3 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() =>
            addItemToArray("tags", tagInput, setTagInput)
          }
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
                              <TextField label="Document Name" size="small" fullWidth value={documentInput.name} onChange={(e) => setDocumentInput({ ...documentInput, name: e.target.value })} required />
                            </Grid>
                            <Grid size={12}>
                              <TextField label="Document URL" size="small" fullWidth value={documentInput.url} onChange={(e) => setDocumentInput({ ...documentInput, url: e.target.value })} required />
                            </Grid>
                            <Grid size={12}>
                              <TextField label="Document Type (e.g. pdf, png)" size="small" fullWidth value={documentInput.type} onChange={(e) => setDocumentInput({ ...documentInput, type: e.target.value })} required/>
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
          secondary={`Score: ${module.score}/${module.max_score} | Passed: ${
            module.passed ? "Yes" : "No"
          }`}
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
                  )}

                  {/* Navigation Buttons */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, pt: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <Button onClick={handleBack} variant="outlined">
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

          </Grid>
        </Container>
      </Box>



<Snackbar
  open={notification.open}
  autoHideDuration={6000}
  onClose={() =>
    setNotification((prev) => ({ ...prev, open: false }))
  }
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
>
  <Alert
    severity={notification.severity}
    variant="filled"
    sx={{
      width: "100%",
      minWidth: 500,
      fontSize: "1rem",
      "& .MuiAlert-message": {
        fontSize: "1rem",
        fontWeight: 600,
      },
      "& .MuiAlert-icon": {
        fontSize: "2rem",
      },
      py: 1.5,
    }}
  >
    {notification.message}
  </Alert>
</Snackbar>

    </ThemeProvider>
  );
}
