"use client";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Switch,
} from "@mui/material";

export default function EditCertificatePage() {
  const { id } = useParams();
  const router = useRouter();
  const [skillInput, setSkillInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [moduleInput, setModuleInput] = useState({ name: "", score: "", max_score: "", passed: true });
  const [achievementInput, setAchievementInput] = useState({ title: "", description: "", badge_url: "" });
  const [documentInput, setDocumentInput] = useState({ name: "", type: "", url: "" });
  const [loading, setLoading] = useState(true);
  const [interestInput, setInterestInput] = useState("");
  const [metadataRows, setMetadataRows] = useState([]);
  const [editingModuleIndex, setEditingModuleIndex] = useState(null);
  const [editingAchievementIndex, setEditingAchievementIndex] = useState(null);
  const [editingDocumentIndex, setEditingDocumentIndex] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    course: "",
    grade: "",
    score: 0,
    percentage: 0,
    rank: 0,
    status: "",
    issue_date: "",
    expiry_date: "",
    date: "",
    is_verified: false,
    is_expired: false,

    student: {
      id: "",
      name: "",
      email: "",
      phone: "",
      city: "",
      country: "",
      interests: [],
    },

    issuer: {
      id: "",
      name: "",
      email: "",
      website: "",
      logo: "",
    },

    skills: [],
    categories: [],
    tags: [],

    achievements: [],
    documents: [],
    modules: [],
    audit_trail: [],

    links: {},
    settings: {},
    statistics: {},
    custom_fields: {},
    metadata: {},
  });
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    loadCertificate();
  }, [id]);

  async function loadCertificate() {
    try {
      const res = await fetch(`/api/certificates/${id}`);

      if (!res.ok) {
        throw new Error("Failed to load certificate");
      }

      const data = await res.json();

      setFormData((prev) => ({
        ...prev,
        ...data,
      }));

      setMetadataRows(
        Object.entries(data.metadata || {}).map(([key, value]) => ({
          key,
          value,
        }))
      );
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: error.message,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  const handleMetadataChange = (index, field, value) => {
    setMetadataRows((prev) => {
      const rows = [...prev];
      rows[index] = {
        ...rows[index],
        [field]: value,
      };
      return rows;
    });
  };

  const addMetadataRow = () => {
    const hasIncomplete = metadataRows.some(
      (item) => !item.key.trim() || !item.value.trim()
    );

    if (hasIncomplete) {
      setSnackbar({
        open: true,
        severity: "warning",
        message:
          "Please complete the existing metadata before adding another row.",
      });
      return;
    }

    setMetadataRows((prev) => [
      ...prev,
      {
        key: "",
        value: "",
      },
    ]);
  };

  const removeMetadataRow = (index) => {
    setMetadataRows((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };


  const addItemToArray = (field, value, setter) => {
    if (!value.trim()) {
      setSnackbar({
        open: true,
        message: `${field} cannot be empty`,
        severity: "warning",
      });
      return;
    }

    setFormData((prev) => {
      if (prev[field].includes(value.trim())) {

        setSnackbar({
          open: true,
          message: `${value} already exists`,
          severity: "warning",
        });
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
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const addInterest = () => {
    if (!interestInput.trim()) {
      setSnackbar({
        open: true,
        message: "Interest is required",
        severity: "warning",
      });
      return;
    }

    if (
      (formData.student?.interests || []).includes(interestInput.trim())
    ) {
      setSnackbar({
        open: true,
        message: "Interest already added",
        severity: "warning",
      });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      student: {
        ...prev.student,
        interests: [
          ...(prev.student?.interests || []),
          interestInput.trim(),
        ],
      },
    }));

    setInterestInput("");
  };

  const removeInterest = (index) => {
    setFormData((prev) => ({
      ...prev,
      student: {
        ...prev.student,
        interests: prev.student.interests.filter((_, i) => i !== index),
      },
    }));
  };

  // const addModule = () => {
  //   if (!moduleInput.name.trim()) {
  //     setSnackbar({ open: true, message: "Module name is required", severity: "warning" });
  //     return;
  //   }
  //   const scoreVal = Number(moduleInput.score) || 0;
  //   const maxVal = Number(moduleInput.max_score) || 100;
  //   const newModule = {
  //     name: moduleInput.name.trim(),
  //     score: scoreVal,
  //     max_score: maxVal,
  //     passed: moduleInput.passed,
  //   };
  //   setFormData((prev) => ({
  //     ...prev,
  //     modules: [...(prev.modules || []), newModule],
  //   }));
  //   setModuleInput({ name: "", score: "", max_score: "", passed: true });
  // };

  const addModule = () => {
    if (!moduleInput.name.trim()) {
      setSnackbar({
        open: true,
        message: "Module name is required",
        severity: "warning",
      });
      return;
    }

    const newModule = {
      name: moduleInput.name.trim(),
      score: Number(moduleInput.score) || 0,
      max_score: Number(moduleInput.max_score) || 100,
      passed: moduleInput.passed,
    };

    setFormData((prev) => {
      const modules = [...(prev.modules || [])];

      if (editingModuleIndex !== null) {
        modules[editingModuleIndex] = newModule;
      } else {
        modules.push(newModule);
      }

      return {
        ...prev,
        modules,
      };
    });

    setModuleInput({
      name: "",
      score: "",
      max_score: "",
      passed: true,
    });

    setEditingModuleIndex(null);
  };

  const editModule = (index) => {
    const module = formData.modules[index];

    setModuleInput({
      name: module.name,
      score: module.score,
      max_score: module.max_score,
      passed: module.passed,
    });

    setEditingModuleIndex(index);
  };

  const removeModule = (index) => {
    setFormData((prev) => ({
      ...prev,
      modules: (prev.modules || []).filter((_, i) => i !== index),
    }));
  };

  // const addAchievement = () => {
  //   if (!achievementInput.title.trim()) {
  //     setSnackbar({ open: true, message: "Achievement title is required", severity: "warning" });
  //     return;
  //   }
  //   const newAchievement = {
  //     title: achievementInput.title.trim(),
  //     description: achievementInput.description.trim(),
  //     badge_url: achievementInput.badge_url.trim(),
  //   };
  //   setFormData((prev) => ({
  //     ...prev,
  //     achievements: [...(prev.achievements || []), newAchievement],
  //   }));
  //   setAchievementInput({ title: "", description: "", badge_url: "" });
  // };

  const addAchievement = () => {
    if (!achievementInput.title.trim()) {
      setSnackbar({
        open: true,
        message: "Achievement title is required",
        severity: "warning",
      });
      return;
    }

    const newAchievement = {
      title: achievementInput.title.trim(),
      description: achievementInput.description.trim(),
      badge_url: achievementInput.badge_url.trim(),
    };

    setFormData((prev) => {
      const achievements = [...(prev.achievements || [])];

      if (editingAchievementIndex !== null) {
        achievements[editingAchievementIndex] = newAchievement;
      } else {
        achievements.push(newAchievement);
      }

      return {
        ...prev,
        achievements,
      };
    });

    setAchievementInput({
      title: "",
      description: "",
      badge_url: "",
    });

    setEditingAchievementIndex(null);
  };

  const editAchievement = (index) => {
    const achievement = formData.achievements[index];

    setAchievementInput({
      title: achievement.title,
      description: achievement.description,
      badge_url: achievement.badge_url,
    });

    setEditingAchievementIndex(index);
  };


  const removeAchievement = (index) => {
    setFormData((prev) => ({
      ...prev,
      achievements: (prev.achievements || []).filter((_, i) => i !== index),
    }));
  };

  // const addDocument = () => {
  //   if (!documentInput.name.trim() || !documentInput.url.trim()) {
  //     setSnackbar({ open: true, message: "Document name and URL are required", severity: "warning" });
  //     return;
  //   }
  //   const newDocument = {
  //     name: documentInput.name.trim(),
  //     url: documentInput.url.trim(),
  //     type: documentInput.type.trim() || "pdf",
  //   };
  //   setFormData((prev) => ({
  //     ...prev,
  //     documents: [...(prev.documents || []), newDocument],
  //   }));
  //   setDocumentInput({ name: "", type: "", url: "" });
  // };
  const addDocument = () => {
    if (!documentInput.name.trim() || !documentInput.url.trim()) {
      setSnackbar({
        open: true,
        message: "Document name and URL are required",
        severity: "warning",
      });
      return;
    }

    const newDocument = {
      name: documentInput.name.trim(),
      url: documentInput.url.trim(),
      type: documentInput.type.trim() || "pdf",
    };



    setFormData((prev) => {
      const documents = [...(prev.documents || [])];

      if (editingDocumentIndex !== null) {
        documents[editingDocumentIndex] = newDocument;
      } else {
        documents.push(newDocument);
      }

      return {
        ...prev,
        documents,
      };
    });

    setDocumentInput({
      name: "",
      url: "",
      type: "",
    });

    setEditingDocumentIndex(null);
  };

  const editDocument = (index) => {
    const document = formData.documents[index];

    setDocumentInput({
      name: document.name,
      url: document.url,
      type: document.type,
    });

    setEditingDocumentIndex(index);
  };
  const removeDocument = (index) => {
    setFormData((prev) => ({
      ...prev,
      documents: (prev.documents || []).filter((_, i) => i !== index),
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    setSaving(true);

    try {
      const metadataObject = {};

      metadataRows.forEach((item) => {
        if (item.key.trim()) {
          metadataObject[item.key.trim()] =
            item.value.trim();
        }
      });
      const payload = {
        ...formData,

        metadata: metadataObject,
        id: Number(id),
        score: Number(formData.score),
        percentage: Number(formData.percentage),
        rank: Number(formData.rank),
        updated_at: new Date().toISOString(),
      };

      const res = await fetch(
        `/api/certificates/${id}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.text();

      if (!res.ok) {
        throw new Error(data);
      }

      setSnackbar({
        open: true,
        message: "Certificate updated successfully",
        severity: "success",
      });

      setTimeout(() => {
        router.push("/certificates");
      }, 1000);
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: error.message,
        severity: "error",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card>
        <CardContent>

          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              variant="outlined"
              onClick={() => router.push("/certificates")}
            >
              Back
            </Button>
          </Stack>

          <Typography
            variant="h4"
            gutterBottom
          >
            Edit Certificate
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>

              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Course"
                  value={formData.course}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      course: e.target.value,
                    })
                  }
                />
              </Grid>

              {/* <Grid size={6}>
                <TextField
                  fullWidth
                  label="Grade"
                  value={formData.grade}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      grade: e.target.value,
                    })
                  }
                />
              </Grid> */}

              <Grid size={6}>
                <TextField
                  select
                  fullWidth
                  label="Grade"
                  value={formData.grade || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      grade: e.target.value,
                    })
                  }
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                  <MenuItem value="Pass">Pass</MenuItem>
                  <MenuItem value="Distinction">Distinction</MenuItem>
                </TextField>
              </Grid>

              <Grid size={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Score"
                  value={formData.score ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      score:
                        e.target.value === ""
                          ? ""
                          : Number(e.target.value),
                    })
                  }
                />
              </Grid>
              <Grid size={6}>



                <TextField
                  fullWidth
                  label="Issue Date"
                  type="date"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  value={
                    formData.issue_date
                      ? formData.issue_date.split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      issue_date: `${e.target.value}T00:00:00Z`,
                    })
                  }
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Expiry Date"
                  type="date"
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                  value={
                    formData.expiry_date
                      ? formData.expiry_date.split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      expiry_date: `${e.target.value}T00:00:00Z`,
                    })
                  }
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Rank"
                  value={formData.rank ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rank:
                        e.target.value === ""
                          ? ""
                          : Number(e.target.value),
                    })
                  }
                />
              </Grid>

              {/* <Grid size={6}>
                <TextField
                  fullWidth
                  label="Status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value,
                    })
                  }
                />
              </Grid> */}
              <Grid size={6}>
                <TextField
                  select
                  fullWidth
                  label="Status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value,
                    })
                  }
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Revoked">Revoked</MenuItem>
                  <MenuItem value="Suspended">Suspended</MenuItem>
                </TextField>
              </Grid>

              <Grid size={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Percentage"
                  value={formData.percentage ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      percentage:
                        e.target.value === ""
                          ? ""
                          : Number(e.target.value),
                    })
                  }
                />
              </Grid>

              <Grid size={12}>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Student Details
                </Typography>
              </Grid>

              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Student Name"
                  value={formData.student?.name || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      student: {
                        ...formData.student,
                        name: e.target.value,
                      },
                    })
                  }
                />
              </Grid>

              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Student Email"
                  value={formData.student?.email || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      student: {
                        ...formData.student,
                        email: e.target.value,
                      },
                    })
                  }
                />
              </Grid>

              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={formData.student?.phone || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      student: {
                        ...formData.student,
                        phone: e.target.value,
                      },
                    })
                  }
                />
              </Grid>

              <Grid size={6}>
                <TextField
                  fullWidth
                  label="City"
                  value={formData.student?.city || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      student: {
                        ...formData.student,
                        city: e.target.value,
                      },
                    })
                  }
                />
              </Grid>

              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Country"
                  value={formData.student?.country || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      student: {
                        ...formData.student,
                        country: e.target.value,
                      },
                    })
                  }
                />
              </Grid>

              <Grid size={12}>
                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                  Interests
                </Typography>
              </Grid>

              <Grid size={12}>
                <Grid container spacing={2}>
                  <Grid size={9}>
                    <TextField
                      fullWidth
                      label="Interest"
                      value={interestInput}
                      onChange={(e) => setInterestInput(e.target.value)}
                    />
                  </Grid>

                  <Grid size={3}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={addInterest}
                    >
                      Add
                    </Button>
                  </Grid>

                  <Grid size={12}>
                    <Box
                      sx={{
                        mt: 2,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                      }}
                    >
                      {(formData.student?.interests || []).map((interest, index) => (
                        <Chip
                          key={index}
                          label={interest}
                          color="primary"
                          onDelete={() => removeInterest(index)}
                        />
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Grid size={12}>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Issuer Details
                </Typography>
              </Grid>

              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Issuer Name"
                  value={formData.issuer?.name || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      issuer: {
                        ...formData.issuer,
                        name: e.target.value,
                      },
                    })
                  }
                />
              </Grid>

              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Issuer Email"
                  value={formData.issuer?.email || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      issuer: {
                        ...formData.issuer,
                        email: e.target.value,
                      },
                    })
                  }
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Website"
                  value={formData.issuer?.website || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      issuer: {
                        ...formData.issuer,
                        website: e.target.value,
                      },
                    })
                  }
                />
              </Grid>



              <Grid size={12}>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Skills & Categories
                </Typography>
              </Grid>

              {/* <Grid size={12}>
                <TextField
                  label="Skill"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                />

                <Button
                  startIcon={<AddIcon />}
                  variant="outlined"
                  onClick={() =>
                    addItemToArray("skills", skillInput, setSkillInput)
                  }
                >
                  Add Skill
                </Button>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                  {formData.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      onDelete={() => removeItemFromArray("skills", index)}
                    />
                  ))}
                </Box>
              </Grid> */}

              <Grid size={12}>
                <Grid container spacing={2}>
                  <Grid size={9}>
                    <TextField
                      fullWidth
                      label="Skill"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                    />
                  </Grid>

                  <Grid size={3}>
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

                  <Grid size={12}>
                    <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {formData.skills.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          onDelete={() =>
                            removeItemFromArray("skills", index)
                          }
                        />
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              {/* <Grid size={12}>
                
                <TextField
                  fullWidth
                  label="Category"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                />

                <Button
                  startIcon={<AddIcon />}
                  variant="outlined"
                  onClick={() =>
                    addItemToArray("categories", categoryInput, setCategoryInput)
                  }
                >
                  Add Category
                </Button>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                  {formData.categories.map((category, index) => (
                    <Chip
                      key={index}
                      label={category}
                      onDelete={() =>
                        removeItemFromArray("categories", index)
                      }
                    />
                  ))}
                </Box>
              </Grid> */}
              <Grid size={12}>
                <Grid container spacing={2}>
                  <Grid size={9}>
                    <TextField
                      fullWidth
                      label="Category"
                      value={categoryInput}
                      onChange={(e) => setCategoryInput(e.target.value)}
                    />
                  </Grid>

                  <Grid size={3}>
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

                  <Grid size={12}>
                    <Box
                      sx={{
                        mt: 2,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                      }}
                    >
                      {formData.categories.map((category, index) => (
                        <Chip
                          key={index}
                          label={category}
                          color="secondary"
                          onDelete={() =>
                            removeItemFromArray("categories", index)
                          }
                        />
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Grid size={12}>
                <Grid container spacing={2}>
                  <Grid size={9}>
                    <TextField
                      fullWidth
                      label="Tag"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                    />
                  </Grid>

                  <Grid size={3}>
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

                  <Grid size={12}>
                    <Box
                      sx={{
                        mt: 2,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                      }}
                    >
                      {formData.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          color="primary"
                          onDelete={() =>
                            removeItemFromArray("tags", index)
                          }
                        />
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              {/* Modules */}
              <Grid size={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                  Modules
                </Typography>
              </Grid>

              <Grid size={12}>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={5}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Module Name"
                      value={moduleInput.name}
                      onChange={(e) => setModuleInput({ ...moduleInput, name: e.target.value })}
                    />
                  </Grid>
                  <Grid size={2}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Score"
                      type="number"
                      value={moduleInput.score}
                      onChange={(e) => setModuleInput({ ...moduleInput, score: e.target.value })}
                    />
                  </Grid>
                  <Grid size={2}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Max"
                      type="number"
                      value={moduleInput.max_score}
                      onChange={(e) => setModuleInput({ ...moduleInput, max_score: e.target.value })}
                    />
                  </Grid>
                  <Grid size={2}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={moduleInput.passed}
                          onChange={(e) => setModuleInput({ ...moduleInput, passed: e.target.checked })}
                        />
                      }
                      label="Passed"
                    />
                  </Grid>
                  <Grid size={1}>
                    <Button
                      variant="outlined"
                      onClick={addModule}
                      fullWidth
                      sx={{ py: 1 }}
                    >
                      {editingModuleIndex !== null ? "Save" : <AddIcon />}
                    </Button>
                  </Grid>
                </Grid>

                <List dense sx={{ mt: 1, maxHeight: 150, overflow: "auto" }}>
                  {(formData.modules || []).map((m, idx) => (
                    <ListItem key={idx} divider>
                      <ListItemText
                        primary={m.name}
                        secondary={`Score: ${m.score}/${m.max_score} | Passed: ${m.passed ? "Yes" : "No"}`}
                      />
                      {/* <ListItemSecondaryAction>
                        <IconButton edge="end" color="error" onClick={() => removeModule(idx)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction> */}

                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          color="error"
                          onClick={() => removeModule(idx)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                      <ListItemSecondaryAction>

                        <IconButton
                          edge="end"
                          color="primary"
                          onClick={() => editModule(idx)}
                        >
                          <EditIcon />
                        </IconButton>

                        <IconButton
                          edge="end"
                          color="error"
                          onClick={() => removeModule(idx)}
                        >
                          <DeleteIcon />
                        </IconButton>

                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Grid>

              {/* Achievements */}
              <Grid size={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                  Achievements
                </Typography>
              </Grid>

              <Grid size={12}>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={4}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Title"
                      value={achievementInput.title}
                      onChange={(e) => setAchievementInput({ ...achievementInput, title: e.target.value })}
                    />
                  </Grid>
                  <Grid size={4}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Description"
                      value={achievementInput.description}
                      onChange={(e) => setAchievementInput({ ...achievementInput, description: e.target.value })}
                    />
                  </Grid>
                  <Grid size={3}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Badge URL"
                      value={achievementInput.badge_url}
                      onChange={(e) => setAchievementInput({ ...achievementInput, badge_url: e.target.value })}
                    />
                  </Grid>
                  <Grid size={1}>
                    <Button
                      variant="outlined"
                      onClick={addAchievement}
                      fullWidth
                      sx={{ py: 1 }}
                    >
                      {editingAchievementIndex !== null ? "Save" : <AddIcon />}
                    </Button>
                  </Grid>
                </Grid>

                <List dense sx={{ mt: 1, maxHeight: 150, overflow: "auto" }}>
                  {(formData.achievements || []).map((a, idx) => (
                    <ListItem key={idx} divider>
                      <ListItemText
                        primary={a.title}
                        secondary={`${a.description} ${a.badge_url ? `| Badge: ${a.badge_url}` : ""}`}
                      />
                      {/* <ListItemSecondaryAction>
                        <IconButton edge="end" color="error" onClick={() => removeAchievement(idx)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction> */}
                      <ListItemSecondaryAction>

                        <IconButton
                          edge="end"
                          color="primary"
                          onClick={() => editAchievement(idx)}
                        >
                          <EditIcon />
                        </IconButton>

                        <IconButton
                          edge="end"
                          color="error"
                          onClick={() => removeAchievement(idx)}
                        >
                          <DeleteIcon />
                        </IconButton>

                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Grid>

              {/* Documents */}
              <Grid size={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                  Documents
                </Typography>
              </Grid>

              <Grid size={12}>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={4}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Doc Name"
                      value={documentInput.name}
                      onChange={(e) => setDocumentInput({ ...documentInput, name: e.target.value })}
                    />
                  </Grid>
                  <Grid size={4}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Doc URL"
                      value={documentInput.url}
                      onChange={(e) => setDocumentInput({ ...documentInput, url: e.target.value })}
                    />
                  </Grid>
                  <Grid size={3}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Doc Type (pdf/png)"
                      value={documentInput.type}
                      onChange={(e) => setDocumentInput({ ...documentInput, type: e.target.value })}
                    />
                  </Grid>
                  <Grid size={1}>
                    <Button
                      variant="outlined"
                      onClick={addDocument}
                      fullWidth
                      sx={{ py: 1 }}
                    >
                      {editingDocumentIndex !== null ? "Save" : <AddIcon />}
                    </Button>
                  </Grid>

                </Grid>

                <List dense sx={{ mt: 1, maxHeight: 150, overflow: "auto" }}>
                  {(formData.documents || []).map((d, idx) => (
                    <ListItem key={idx} divider>
                      <ListItemText
                        primary={d.name}
                        secondary={`Type: ${d.type} | URL: ${d.url}`}
                      />
                      {/* <ListItemSecondaryAction>
                        <IconButton edge="end" color="error" onClick={() => removeDocument(idx)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction> */}
                      <ListItemSecondaryAction>

                        <IconButton
                          edge="end"
                          color="primary"
                          onClick={() => editDocument(idx)}
                        >
                          <EditIcon />
                        </IconButton>

                        <IconButton
                          edge="end"
                          color="error"
                          onClick={() => removeDocument(idx)}
                        >
                          <DeleteIcon />
                        </IconButton>

                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Grid>

              <Grid size={12}>
                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" sx={{ mb: 2 }}>
                  Metadata (Key : Value)
                </Typography>

                {metadataRows.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <TextField
                      size="small"
                      label="Key"
                      value={item.key}
                      onChange={(e) =>
                        handleMetadataChange(
                          index,
                          "key",
                          e.target.value
                        )
                      }
                    />

                    <TextField
                      fullWidth
                      size="small"
                      label="Value"
                      value={item.value}
                      onChange={(e) =>
                        handleMetadataChange(
                          index,
                          "value",
                          e.target.value
                        )
                      }
                    />

                    <IconButton
                      color="error"
                      onClick={() => removeMetadataRow(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}

                <Button
                  startIcon={<AddIcon />}
                  variant="outlined"
                  onClick={addMetadataRow}
                >
                  Add Row
                </Button>
              </Grid>

              <Grid size={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Settings
                </Typography>
              </Grid>

              <Grid size={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.is_verified || false}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          is_verified: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Verified"
                />
              </Grid>

              <Grid size={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.is_expired || false}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          is_expired: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Expired"
                />
              </Grid>

              <Grid size={12}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={saving}
                >
                  {saving ? "Updating..." : "Update Certificate"}
                </Button>
              </Grid>

            </Grid>
          </form>

        </CardContent>
      </Card>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() =>
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() =>
            setSnackbar((prev) => ({
              ...prev,
              open: false,
            }))
          }
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}