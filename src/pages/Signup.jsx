import React, { useState } from "react";
import {
  Avatar,
  TextField,
  Link,
  Snackbar,
  CssBaseline,
  Stack,
  Grid,
  IconButton,
  Typography,
  Container,
  Box,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { styled } from "@mui/material/styles";
import {
  LockOutlined as LockOutlinedIcon,
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { validateInput } from "../validation/validationUtils";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function SignUp() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    photo: "",
  });
  const [formErrors, setFormErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const isFormValid = () => {
    return (
      formData.first_name.trim() !== "" &&
      formData.last_name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      formData.confirm_password.trim() !== ""
    );
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        setFormData({
          ...formData,
          photo: base64Image,
        });
        setImage(base64Image);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleSignup = async (Userdata) => {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Userdata),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate(`/login`, { replace: true });
      } else {
        console.log("Error: Request failed with status", response.status);
      }
    } catch (error) {
      console.log("error");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const validationErrors = validateInput({
      first_name: data.get("first_name"),
      last_name: data.get("last_name"),
      email: data.get("email"),
      password: data.get("password"),
      confirm_password: data.get("confirm_password"),
      avatar: data.get("photo"), // Include the avatar input here
    });
    if (data.get("password") !== data.get("confirm_password")) {
      validationErrors.confirm_password = "Passwords do not match";
    }

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
    } else {
      console.log(data.get("photo"));
      console.log(data.get("email"));
      let userData = {
        email: data.get("email"),
        password: data.get("password"),
        name: data.get("first_name"),
        photo: image,
      };
      handleSignup(userData); // You can call your signup logic here
    }
    setLoading(false);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formData.first_name}
                  onChange={handleInputChange}
                  error={!!formErrors.first_name}
                  helperText={formErrors.first_name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  error={!!formErrors.last_name}
                  helperText={formErrors.last_name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  id="confirm_password"
                  autoComplete="confirm-password"
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                  error={!!formErrors.confirm_password}
                  helperText={formErrors.confirm_password}
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {!image && (
                    <label htmlFor="upload-photo">
                      <VisuallyHiddenInput
                        id="upload-photo"
                        name="photo"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <CloudUploadIcon />
                      </IconButton>
                    </label>
                  )}

                  {/* If image is selected preview with delete Icon */}
                  {image && (
                    <>
                      <img
                        src={image}
                        alt="preview"
                        style={{ width: "100px", height: "100px" }}
                      />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        onClick={() => {
                          setImage("");
                          setFormData({
                            ...formData,
                            photo: "",
                          });
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
            <LoadingButton
              sx={{ mt: 3, mb: 2 }}
              fullWidth
              loading={loading}
              loadingIndicator="Loading…"
              disabled={!isFormValid() || loading}
              variant="contained"
              type="submit"
            >
              Sign Up
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* {formData.photo && <img src={formData.photo} alt="Converted Image" />} */}
      </Container>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}

export default SignUp;
