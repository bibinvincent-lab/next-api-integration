"use client";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
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
} from "@mui/material";

export default function EditCertificatePage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
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

  // async function loadCertificate() {
  //   try {
  //     const res = await fetch(
  //       `/api/certificates/${id}`
  //     );

  //     const data = await res.json();

  //     setFormData(data);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
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

  // async function handleSubmit(e) {
  //   e.preventDefault();

  //   console.log("Submitting:", formData);

  //   try {
  //     const res = await fetch(
  //       `/api/certificates/${id}/update`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //       }
  //     );

  //     const responseText = await res.text();

  //     console.log("Status:", res.status);
  //     console.log("Response:", responseText);

  //     if (!res.ok) {
  //       throw new Error(responseText);
  //     }

  //     alert("Updated successfully");
  //     router.push("/certificates");
  //   } catch (error) {
  //     console.error(error);
  //     alert(error.message);
  //   }
  // }
  async function handleSubmit(e) {
    e.preventDefault();

    setSaving(true);

    try {
      const payload = {
        ...formData,
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
    return <CircularProgress />;
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

              <Grid size={6}>
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

              <Grid size={6}>
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

              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Skills (comma separated)"
                  value={(formData.skills || []).join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      skills: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Categories (comma separated)"
                  value={(formData.categories || []).join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      categories: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Tags (comma separated)"
                  value={(formData.tags || []).join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tags: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </Grid>

              <Grid size={12}>
                <Typography variant="h6" sx={{ mt: 3 }}>
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