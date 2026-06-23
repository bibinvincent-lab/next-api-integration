import {
  Box,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";

export default function CertificateTemplate({
  certificate,
}) {
  return (
    <Box
      sx={{
        width: 1200,
        minHeight: 850,
        bgcolor: "#fff",
        color: "#111",
        p: 8,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Border */}
      <Box
        sx={{
          position: "absolute",
          inset: 20,
          border: "8px solid #0d47a1",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 35,
          border: "2px solid #d4af37",
        }}
      />

      {/* Logo */}
      <Box sx={{ textAlign: "center" }}>
        <Avatar
          src={certificate.issuer?.logo}
          sx={{
            width: 90,
            height: 90,
            margin: "auto",
          }}
        />

        <Typography
          sx={{
            mt: 2,
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          {certificate.issuer?.name}
        </Typography>
      </Box>

      <Typography
        align="center"
        sx={{
          mt: 4,
          fontSize: 54,
          fontWeight: 700,
          color: "#0d47a1",
          letterSpacing: 3,
        }}
      >
        CERTIFICATE
      </Typography>

      <Typography
        align="center"
        sx={{
          fontSize: 22,
          mt: 1,
        }}
      >
        OF ACHIEVEMENT
      </Typography>

      <Typography
        align="center"
        sx={{
          mt: 6,
          fontSize: 22,
        }}
      >
        This certifies that
      </Typography>

      <Typography
        align="center"
        sx={{
          mt: 3,
          fontSize: 42,
          fontWeight: 700,
          color: "#000",
        }}
      >
        {certificate.student?.name}
      </Typography>

      <Divider
        sx={{
          width: 400,
          mx: "auto",
          my: 3,
        }}
      />

      <Typography
        align="center"
        sx={{
          fontSize: 20,
          maxWidth: 900,
          mx: "auto",
        }}
      >
        has successfully completed the course
      </Typography>

      <Typography
        align="center"
        sx={{
          mt: 2,
          fontSize: 34,
          fontWeight: 700,
          color: "#0d47a1",
        }}
      >
        {certificate.course}
      </Typography>

      <Typography
        align="center"
        sx={{
          mt: 4,
          fontSize: 18,
        }}
      >
        Grade: <b>{certificate.grade}</b> |
        Score: <b>{certificate.score}%</b>
      </Typography>

      <Typography
        align="center"
        sx={{
          mt: 1,
          fontSize: 18,
        }}
      >
        Rank: #{certificate.rank}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 12,
          px: 8,
        }}
      >
        <Box>
          <Typography>
            Issue Date
          </Typography>

          <Typography fontWeight={700}>
            {new Date(
              certificate.issue_date
            ).toLocaleDateString()}
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              borderTop:
                "2px solid black",
              pt: 1,
              width: 220,
            }}
          >
            Authorized Signature
          </Typography>
        </Box>

        <Box sx={{ textAlign: "right" }}>
          <Typography>
            Certificate ID
          </Typography>

          <Typography fontWeight={700}>
            #{certificate.id}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}