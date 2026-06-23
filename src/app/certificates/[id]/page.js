"use client";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CertificateTemplate from "../../components/CertificateTemplate";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  CircularProgress,
  Box,
  Divider,
} from "@mui/material";
import Stack from '@mui/material/Stack';
import Dialog from "@mui/material/Dialog";


export default function CertificateDetailsPage() {
  const [openCertificate, setOpenCertificate] = useState(false);
  const { id } = useParams();
  const router = useRouter();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadCertificate();
    }
  }, [id]);

  async function loadCertificate() {
    try {
      const res = await fetch(`/api/certificates/${id}`);
      const data = await res.json();
      setCertificate(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleString();
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 10,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!certificate) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Certificate not found</Typography>
      </Container>
    );
  }

  return (

    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        sx={{ mb: 2 }}
        onClick={() => router.push("/certificates")}
      >
        Back to Certificates
      </Button>


      <Typography variant="h4" gutterBottom>
        Certificate Details
      </Typography>

      {/* Certificate Info */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {certificate.name}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
            <Chip
              label={certificate.status}
              color="success"
            />

            <Chip
              label={
                certificate.is_verified
                  ? "Verified"
                  : "Not Verified"
              }
              color={
                certificate.is_verified
                  ? "primary"
                  : "default"
              }
            />

            <Chip
              label={
                certificate.is_expired
                  ? "Expired"
                  : "Active"
              }
              color={
                certificate.is_expired
                  ? "error"
                  : "success"
              }
            />
          </Stack>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography color="text.secondary">
                Course
              </Typography>
              <Typography>
                {certificate.course}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography color="text.secondary">
                Grade
              </Typography>
              <Typography>
                {certificate.grade}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Typography color="text.secondary">
                Score
              </Typography>
              <Typography>
                {certificate.score}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Typography color="text.secondary">
                Percentage
              </Typography>
              <Typography>
                {certificate.percentage}%
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Typography color="text.secondary">
                Rank
              </Typography>
              <Typography>
                {certificate.rank}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Typography color="text.secondary">
                ID
              </Typography>
              <Typography>
                {certificate.id}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Typography color="text.secondary">
                Issue Date
              </Typography>
              <Typography>
                {formatDate(certificate.issue_date)}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Typography color="text.secondary">
                Expiry Date
              </Typography>
              <Typography>
                {formatDate(certificate.expiry_date)}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Typography color="text.secondary">
                Created
              </Typography>
              <Typography>
                {formatDate(certificate.created_at)}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Student */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Student Information
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>
                Name: {certificate.student?.name}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>
                Email: {certificate.student?.email}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>
                Phone: {certificate.student?.phone}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>
                Location: {certificate.student?.city},{" "}
                {certificate.student?.country}
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ mt: 2 }}>
            <Typography gutterBottom>
              Interests
            </Typography>

            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
              {certificate.student?.interests?.map(
                (interest, index) => (
                  <Chip
                    key={index}
                    label={interest}
                  />
                )
              )}
            </Stack>
          </Box>
        </CardContent>
      </Card>

      {/* Issuer */}
      {/* <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Issuer Information
          </Typography>

          <Typography>
            Name: {certificate.issuer?.name}
          </Typography>

          <Typography>
            Email: {certificate.issuer?.email}
          </Typography>

          <Typography>
            Website: {certificate.issuer?.website}
          </Typography>
        </CardContent>
      </Card> */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Issuer Information
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 2,
            }}
          >
            <Avatar
              src={certificate.issuer?.logo}
              sx={{ width: 64, height: 64 }}
            />

            <Box>
              <Typography fontWeight="bold">
                {certificate.issuer?.name}
              </Typography>

              <Typography>
                {certificate.issuer?.email}
              </Typography>
            </Box>
          </Box>

          <Typography>
            Website: {certificate.issuer?.website}
          </Typography>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Skills
          </Typography>

          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
            {certificate.skills?.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                color="primary"
              />
            ))}
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Categories
          </Typography>

          <Stack direction="row" spacing={1}>
            {certificate.categories?.map((item, index) => (
              <Chip
                key={index}
                label={item}
                color="secondary"
              />
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Tags */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Tags
          </Typography>

          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
            {certificate.tags?.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                variant="outlined"
              />
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Modules */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Modules
          </Typography>

          {certificate.modules?.map((module) => (
            <Box key={module.id} sx={{ mb: 2 }}>
              <Typography fontWeight="bold">
                {module.name}
              </Typography>

              <Typography>
                Score: {module.score} / {module.max_score}
              </Typography>

              <Typography>
                Status: {module.passed ? "Passed" : "Failed"}
              </Typography>

              <Divider sx={{ mt: 1 }} />
            </Box>
          ))}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Achievements
          </Typography>

          {certificate.achievements?.map((achievement) => (
            <Box key={achievement.id} sx={{ mb: 2 }}>
              <Typography fontWeight="bold">
                {achievement.title}
              </Typography>

              <Typography>
                {achievement.description}
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Documents
          </Typography>

          {certificate.documents?.map((doc) => (
            <Box key={doc.id} sx={{ mb: 2 }}>
              <Typography fontWeight="bold">
                {doc.name}
              </Typography>

              <Typography>
                Type: {doc.type}
              </Typography>

              <Typography>
                Size: {doc.size} bytes
              </Typography>

              <Typography>
                URL:
              </Typography>

              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {doc.url}
              </a>
            </Box>
          ))}
        </CardContent>
      </Card>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Statistics
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              Total Students:
              {certificate.statistics?.total_students}
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              Average Score:
              {certificate.statistics?.average_score}
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              Highest Score:
              {certificate.statistics?.highest_score}
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              Completion Rate:
              {certificate.statistics?.completion_rate}%
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              Global Ranking:
              {certificate.statistics?.global_ranking}
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              Country Ranking:
              {certificate.statistics?.country_ranking}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Audit Trail
          </Typography>

          {certificate.audit_trail?.map(
            (item, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography>
                  Action: {item.action}
                </Typography>

                <Typography>
                  User: {item.user}
                </Typography>

                <Typography>
                  IP: {item.ip_address}
                </Typography>

                <Typography>
                  Time:
                  {formatDate(item.timestamp)}
                </Typography>

                <Divider sx={{ mt: 1 }} />
              </Box>
            )
          )}
        </CardContent>
      </Card>
      {/* Custom Fields */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Custom Fields
          </Typography>

          <pre>
            {JSON.stringify(
              certificate.custom_fields,
              null,
              2
            )}
          </pre>
        </CardContent>
      </Card>
      
      
       <Card sx={{ mb: 3 }}>
        <CardContent>
          <Button
            variant="contained"
            color="success"
            onClick={() => setOpenCertificate(true)}
          >
            View Certificate
          </Button>

        </CardContent>
      </Card>


      <Dialog
        open={openCertificate}
        onClose={() => setOpenCertificate(false)}
        maxWidth={false}
      >

        <CertificateTemplate certificate={certificate} />
      </Dialog>
    </Container>
  );
}