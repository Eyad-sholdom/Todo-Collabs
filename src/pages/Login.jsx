import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";
import LoadingButton from "@mui/lab/LoadingButton";
import useLogin from "../hooks/useLogin";

const defaultTheme = createTheme();

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { login, loginLoading, error } = useLogin();

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleLogin = (data) => {
    setLoading(true);
    login(data, rememberMe);
    if (!error) {
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (loginLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [loginLoading]);


  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin({ email, password });
    // setLoading(true);

    // if (validateForm()) {
    //   handleLogin({ email, password });
    // } else {
    //   setLoading(false);
    //   console.error(
    //     "Invalid email or password. Please check your email or password."
    //   );
    // }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
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
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {/* Email Field */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={emailError}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {/* Password Field */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={passwordError}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {/* Remember Me Checkbox */}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              onChange={handleRememberMeChange}
              checked={rememberMe}
            />
            {/* Sign In Button */}
            <LoadingButton
              sx={{ mt: 3, mb: 2 }}
              fullWidth
              loading={loading}
              loadingIndicator="Loading…"
              variant="contained"
              type="submit"
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item>
                <Link
                  sx={{
                    "&:hover": { cursor: "pointer" },
                  }}
                  variant="body2"
                  href="signup"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
