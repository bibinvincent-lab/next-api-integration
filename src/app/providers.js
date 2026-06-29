// "use client";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";

// const theme = createTheme({
//   palette: {
//     mode: "dark",
//     primary:   { main: "#90caf9", light: "#e3f2fd", dark: "#42a5f5" },
//     secondary: { main: "#ce93d8", light: "#f3e5f5", dark: "#ab47bc" },
//     background:{ default: "#0a0a14", paper: "#1e1e30" },
//     text:      { primary: "#ffffff", secondary: "#b0bec5" },
//     success:   { main: "#4caf50" },
//     error:     { main: "#f44336" },
//   },
//   typography: {
//     fontFamily: '"Outfit","Inter","Roboto","Helvetica","Arial",sans-serif',
//     h4: { fontWeight: 800, letterSpacing: "0.5px" },
//     h6: { fontWeight: 600 },
//     button: { textTransform: "none", fontWeight: 600 },
//   },
//   components: {
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           backgroundImage: "none",
//           borderRadius: 16,
//           border: "1px solid rgba(255,255,255,0.08)",
//           boxShadow: "0 8px 32px 0 rgba(0,0,0,0.37)",
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: { root: { borderRadius: 8, padding: "10px 20px" } },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: { "& .MuiOutlinedInput-root": { borderRadius: 8 } },
//       },
//     },
//     MuiStepper: {
//       styleOverrides: {
//         root: {
//           padding: "24px",
//           background: "rgba(0,0,0,0.1)",
//           borderRadius: "12px",
//           marginBottom: "24px",
//         },
//       },
//     },
//   },
// });

// export default function Providers({ children }) {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       {children}
//     </ThemeProvider>
//   );
// }


"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#2563eb",
      light: "#60a5fa",
      dark: "#1d4ed8",
      contrastText: "#fff",
    },

    secondary: {
      main: "#7c3aed",
      light: "#a78bfa",
      dark: "#5b21b6",
    },

    success: {
      main: "#16a34a",
    },

    warning: {
      main: "#f59e0b",
    },

    error: {
      main: "#dc2626",
    },

    info: {
      main: "#0284c7",
    },

    background: {
      default: "#f5f7fb",
      paper: "#ffffff",
    },

    text: {
      primary: "#1e293b",
      secondary: "#64748b",
    },

    divider: "#e2e8f0",
  },

  typography: {
    fontFamily:
      '"Outfit","Inter","Roboto","Helvetica","Arial",sans-serif',

    h4: {
      fontWeight: 800,
      color: "#0f172a",
    },

    h5: {
      fontWeight: 700,
    },

    h6: {
      fontWeight: 700,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f5f7fb",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(15,23,42,.08)",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 14,
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 18,
          padding: 8,
          boxShadow: "0 20px 50px rgba(15,23,42,.15)",
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          boxShadow: "0 10px 30px rgba(15,23,42,.12)",
        },
      },
    },

    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#fff",
          borderRight: "1px solid #e2e8f0",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#ffffff",
          color: "#1e293b",
          boxShadow: "0 2px 8px rgba(0,0,0,.05)",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "10px 22px",
          fontWeight: 600,
        },

        contained: {
          boxShadow: "none",

          "&:hover": {
            boxShadow: "0 6px 20px rgba(37,99,235,.25)",
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,

          "& fieldset": {
            borderColor: "#d1d5db",
          },

          "&:hover fieldset": {
            borderColor: "#2563eb",
          },

          "&.Mui-focused fieldset": {
            borderWidth: 2,
            borderColor: "#2563eb",
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },

    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 600,
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 600,
        },

        standardSuccess: {
          background: "#dcfce7",
          color: "#166534",
        },

        standardError: {
          background: "#fee2e2",
          color: "#991b1b",
        },

        standardWarning: {
          background: "#fef3c7",
          color: "#92400e",
        },

        standardInfo: {
          background: "#dbeafe",
          color: "#1e40af",
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 8,
          fontSize: 13,
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          background: "#f8fafc",
        },
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          background: "#fff",
        },

        columnHeaders: {
          background: "#f8fafc",
          fontWeight: 700,
        },

        row: {
          "&:hover": {
            background: "#f1f5f9",
          },
        },
      },
    },

    MuiStepper: {
      styleOverrides: {
        root: {
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: 14,
          padding: 24,
        },
      },
    },
  },
});

export default function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
