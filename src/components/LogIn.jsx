import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Button, Box, Container, createTheme, CssBaseline, Grid, TextField, ThemeProvider, Typography } from "@mui/material";
import { login } from "../features/authSlice";

export default function LogIn() {
  const { loading } = useSelector((state) => state.wall);
  const dispatch = useDispatch();

  const theme = createTheme();

  const validationSchema = Yup.object({
    username: Yup.string().min(3, "Must be at least 3 characters").max(15, "Must be 15 characters or less").required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().min(8, "Must be at least 8 characters").max(15, "Must be 15 characters or less").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      console.log("submission:", values);
      dispatch(login(values));
    },
  });

  return (
    <div id="loginContainer">
      <ThemeProvider theme={theme}>
        <Box>
          <img className="loginImg" src="assets/loginPic1.jpg" alt="Login Left" />
        </Box>
        <Container component="main" maxWidth="xs" sx={{ padding: "0 !important" }}>
          <Paper elevation={5}>
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 5,
              }}
            >
              <img className="arrangeMeEntrance" src="/assets/ArrangeMeLogo.svg" alt="Arrange Me Logo" />
              <Typography component="h1" variant="h5">
                Log in
              </Typography>
              <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="username"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      autoFocus
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      error={formik.touched.username && Boolean(formik.errors.username)}
                      helperText={formik.touched.username && formik.errors.username}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
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
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                    />
                  </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
                  Log In
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to={"/signup"} variant="body2">
                      New to ArrangeMe? Sign up!
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
        </Container>
        <Box>
          <img className="loginImg" src="assets/loginPic2.jpg" alt="Login Right" />
        </Box>
      </ThemeProvider>
    </div>
  );
}
