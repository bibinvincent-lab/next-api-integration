"use client";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import Link from "next/link";
import SchoolIcon from "@mui/icons-material/School";
import VerifiedIcon from "@mui/icons-material/Verified";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, #0a0a14 0%, #121226 100%)",
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: "center", py: 8 }}>
        <SchoolIcon sx={{ fontSize: 90, color: "primary.main", mb: 3 }} />

        <Typography variant="h3" fontWeight={800} gutterBottom>
          Certificate Registry
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: 540, mx: "auto", lineHeight: 1.7 }}
        >
          Issue, manage and verify digital certificates for students and courses — all in one place.
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
          sx={{ mb: 8 }}
        >
          <Button
            component={Link}
            href="/certificates"
            variant="contained"
            size="large"
            startIcon={<AssignmentIcon />}
            sx={{ px: 5, py: 1.5, fontSize: "1rem" }}
          >
            View Certificates
          </Button>
          <Button
            component={Link}
            href="/certificates/create-certificate"
            variant="outlined"
            size="large"
            startIcon={<VerifiedIcon />}
            sx={{ px: 5, py: 1.5, fontSize: "1rem" }}
          >
            Issue New Certificate
          </Button>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={4}
          justifyContent="center"
          sx={{ opacity: 0.6 }}
        >
          {[
            { label: "Multi-step issuance", icon: "📋" },
            { label: "Backend verified", icon: "🔒" },
            { label: "Instant PDF preview", icon: "📄" },
          ].map(({ label, icon }) => (
            <Box key={label}>
              <Typography variant="h5">{icon}</Typography>
              <Typography variant="body2" color="text.secondary">
                {label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}