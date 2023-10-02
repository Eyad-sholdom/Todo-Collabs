import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#03001C",
    },
    secondary: {
      main: "#393E46",
    },
    tertiary: {
      main: "#7895ad",
    },
    quaternary: {
      main: "#9d9d9d",
    },
    background: {
      default: "#5f6268",
      paper: "#525d77",
      card: "#333c49",
    },
    boxShadow: {
      main: "",
    },
  },
  typography: {
    title: {
      color: "#ffffff",
      fontFamily: "Roboto Slab",
      fontWeight: "900",
      textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
    },
    description: {
      color: "#ffffff",
      fontFamily: "Sofia Sans Condensed",
      fontWeight: "900",
      textShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
    },
  },
  divider: {
    main: {
      backgroundColor: "#919191",
      height: "5px",
      borderRadius: "25px",
      width: "80%",
    },
    secondary: {
      backgroundColor: "#cccccc",
      height: "5px",
      borderRadius: "25px",
      width: "80%",
    },
  },
  icons: {
    color: "#ffffff",
  },
  avatars: {
    Admin: {
      border: "2px solid #ff0000",
      boxShadow: "0 2px 4px #ff0000", // Box shadow for admin avatars
      transition: "box-shadow 0.3s ease-in-out", // Smooth transition for the box shadow
      "&:hover": {
        boxShadow: "0 4px 8px rgb(255, 255, 255)", // Box shadow on hover
      },
    },
    Moderator: {
      border: "2px solid #2F3DC7",
      boxShadow: "0 2px 4px #2F3DC7", // Box shadow for admin avatars
      transition: "box-shadow 0.3s ease-in-out", // Smooth transition for the box shadow
      "&:hover": {
        boxShadow: "0 4px 8px #ffffff)", // Box shadow on hover
      },
    },
    Normal: {
      border: "2px solid #5FD08D",
      boxShadow: "0 2px 4px #5FD08D", // Box shadow for admin avatars
      transition: "box-shadow 0.3s ease-in-out", // Smooth transition for the box shadow
      "&:hover": {
        boxShadow: "0 4px 8px #ffffff", // Box shadow on hover
      },
    },
  },
  textfield: {
    label: {
      color: "#fffff",
    },
    border: {
      "& fieldset": {
        borderColor: "#ffffff", // Change the border color
      },
    },
  },
});

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#276c93",
    },
    secondary: {
      main: "#8a8a8a24",
    },
    tertiary: {
      main: "#4567b3",
    },
    quaternary: {
      main: "#d7d7d7",
    },
    background: {
      default: "#F1F6F9",
      paper: "#eeeeee",
      card: "#ffffff",
    },
    boxShadow: {
      main: "#222222",
    },
  },
  typography: {
    title: {
      color: "#212A3E",
      fontFamily: "Roboto Slab",
      fontWeight: "900",
      textShadow: "1px 1px 3px rgba(181, 181, 181, 0.5)",
    },
    description: {
      color: "#212A3E",
      fontFamily: "Sofia Sans Condensed",
      fontWeight: "900",
      textShadow: "1px 1px 3px rgba(181, 181, 181, 0.5)",
    },
  },
  divider: {
    main: {
      backgroundColor: "#9BA4B5",
      height: "5px",
      borderRadius: "25px",
      width: "80%",
    },
    secondary: {
      backgroundColor: "#3c3c3c87",
      height: "5px",
      borderRadius: "25px",
      width: "80%",
    },
  },
  icons: {
    color: "#000000",
  },
  avatars: {
    Admin: {
      border: "2px solid #fa7575",
      boxShadow: "0 2px 4px rgba(255, 0, 0, 0.2)", // Box shadow for admin avatars
      transition: "box-shadow 0.3s ease-in-out", // Smooth transition for the box shadow
      "&:hover": {
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Box shadow on hover
      },
    },
    Moderator: {
      border: "2px solid #2F3DC7",
      boxShadow: "0 2px 4px #000000", // Box shadow for admin avatars
      transition: "box-shadow 0.3s ease-in-out", // Smooth transition for the box shadow
      "&:hover": {
        boxShadow: "0 4px 8px #000000)", // Box shadow on hover
      },
    },
    Normal: {
      border: "2px solid #5FD08D",
      boxShadow: "0 2px 4px #000000", // Box shadow for admin avatars
      transition: "box-shadow 0.3s ease-in-out", // Smooth transition for the box shadow
      "&:hover": {
        boxShadow: "0 4px 8px #000000", // Box shadow on hover
      },
    },
  },
  textfield: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#000000", // Change the border color
        color: "#000000",
      },
      "&:focus fieldset": {
        borderColor: "#303030", // Change the border color on hover
        color: "#303030",
      },
    },
  },
});

export { darkTheme, lightTheme };
