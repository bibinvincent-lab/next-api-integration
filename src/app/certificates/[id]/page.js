// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// import {
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   Grid,
//   Chip,
//   CircularProgress,
//   Box,
// } from "@mui/material";

// export default function CertificateDetailsPage() {
//   const { id } = useParams();

//   const [certificate, setCertificate] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadCertificate();
//   }, [id]);

//   async function loadCertificate() {
//     try {
//       const res = await fetch(
//         `/api/certificates/${id}`
//       );

//       const data = await res.json();

//       setCertificate(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           mt: 10,
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!certificate) {
//     return (
//       <Typography>
//         Certificate not found
//       </Typography>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Typography variant="h4" mb={3}>
//         Certificate Details
//       </Typography>

//       <Card>
//         <CardContent>
//           <Grid container spacing={3}>
//             <Grid size={12}>
//               <Typography variant="h5">
//                 {certificate.name}
//               </Typography>

//               <Chip
//                 label={certificate.status}
//                 color="success"
//                 sx={{ mt: 1 }}
//               />
//             </Grid>

//             <Grid size={6}>
//               <Typography color="text.secondary">
//                 Course
//               </Typography>
//               <Typography>
//                 {certificate.course}
//               </Typography>
//             </Grid>

//             <Grid size={6}>
//               <Typography color="text.secondary">
//                 Grade
//               </Typography>
//               <Typography>
//                 {certificate.grade}
//               </Typography>
//             </Grid>

//             <Grid size={6}>
//               <Typography color="text.secondary">
//                 Score
//               </Typography>
//               <Typography>
//                 {certificate.score}
//               </Typography>
//             </Grid>

//             <Grid size={6}>
//               <Typography color="text.secondary">
//                 Rank
//               </Typography>
//               <Typography>
//                 {certificate.rank}
//               </Typography>
//             </Grid>

//             <Grid size={12}>
//               <Typography variant="h6">
//                 Student
//               </Typography>

//               <Typography>
//                 {certificate.student?.name}
//               </Typography>

//               <Typography>
//                 {certificate.student?.email}
//               </Typography>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
export default function CertificateDetailsPage() {
  const { id } = useParams();

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
      <Card sx={{ mb: 3 }}>
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
    </Container>
  );
}