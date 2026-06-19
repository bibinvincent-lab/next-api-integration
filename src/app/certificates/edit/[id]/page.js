"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";

export default function EditCertificatePage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    course: "",
    grade: "",
    score: "",
    rank: "",
    status: "",
    issue_date: "",
  });

  useEffect(() => {
    loadCertificate();
  }, [id]);

  async function loadCertificate() {
    try {
      const res = await fetch(
        `/api/certificates/${id}`
      );

      const data = await res.json();

      setFormData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch(
        `/api/certificates/${id}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        throw new Error("Update failed");
      }

      alert("Updated successfully");

      router.push("/certificates");
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  }

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card>
        <CardContent>

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
                  label="Score"
                  value={formData.score}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      score: Number(
                        e.target.value
                      ),
                    })
                  }
                />
              </Grid>
                            <Grid size={6}>
                <TextField
                  fullWidth
                  label="Issued Date"
                  value={formData.issue_date}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      issue_date: Date(
                        e.target.value
                      ),
                    })
                  }
                />
              </Grid>

              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Rank"
                  value={formData.rank}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rank: Number(
                        e.target.value
                      ),
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

              <Grid size={12}>
                <Button
                  type="submit"
                  variant="contained"
                >
                  Update Certificate
                </Button>
              </Grid>

            </Grid>
          </form>

        </CardContent>
      </Card>
    </Container>
  );
}