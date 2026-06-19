"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
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
import DeleteIcon from "@mui/icons-material/Delete";

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
async function deleteCertificate(id) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this certificate?"
  );

  if (!confirmed) return;

  try {
    const res = await fetch(
      `/api/certificates/${id}/delete`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to delete certificate");
    }

    setCertificates((prev) =>
      prev.filter((item) => item.id !== id)
    );

    alert("Certificate deleted successfully");
  } catch (error) {
    console.error(error);
    alert("Delete failed");
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
  width: 380,
  sortable: false,
  renderCell: (params) => (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        mt: 0.5,
      }}
    >
      <Button
        component={Link}
        href={`/certificates/${params.row.id}`}
        size="small"
        variant="outlined"
        startIcon={<VisibilityIcon />}
      >
        View
      </Button>

<Button
  component={Link}
  href={`/certificates/edit/${params.row.id}`}
  size="small"
  color="warning"
  variant="contained"
  startIcon={<EditIcon />}
>
  Edit
</Button>

      <Button
        size="small"
        color="error"
        variant="contained"
        startIcon={<DeleteIcon />}
        onClick={() =>
          deleteCertificate(params.row.id)
        }
      >
        Delete
      </Button>
    </Box>
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
  component={Link}
  href="/certificates/create-certificate"
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