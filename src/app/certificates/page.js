"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  CircularProgress,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCertificates();
  }, []);

  async function fetchCertificates() {
    try {
      setLoading(true);

      const res = await fetch("/api/certificates");

      const data = await res.json();

      if (Array.isArray(data)) {
        setCertificates(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredRows = certificates.filter((item) =>
    `${item.name} ${item.course}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "name",
      headerName: "Certificate",
      flex: 1,
    },
    {
      field: "course",
      headerName: "Course",
      flex: 1,
    },
    {
      field: "score",
      headerName: "Score",
      width: 120,
    },
    {
      field: "rank",
      headerName: "Rank",
      width: 120,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === "Completed"
              ? "success"
              : params.value === "Draft"
              ? "warning"
              : "default"
          }
          size="small"
        />
      ),
    },
    {
      field: "issue_date",
      headerName: "Issue Date",
      width: 180,
      renderCell: (params) =>
        params.value
          ? new Date(params.value).toLocaleDateString()
          : "-",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      sortable: false,
      renderCell: (params) => (
        <Button
  component={Link}
  href={`/certificates/${params.row.id}`}
  size="small"
  variant="outlined"
  startIcon={<VisibilityIcon />}
>
  View
</Button>
      ),
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h4">
          Certificates
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          Create Certificate
        </Button>
      </Box>

      <Card>
        <CardContent>
          <TextField
            fullWidth
            label="Search Certificates"
            sx={{ mb: 3 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                py: 5,
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSizeOptions={[5, 10, 20]}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              autoHeight
            />
          )}
        </CardContent>
      </Card>
    </Container>
  );
}