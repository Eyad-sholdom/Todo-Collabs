import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box, Grid } from "@mui/material";
import { useTheme } from "@mui/system";

export default function Footer() {
  const theme = useTheme();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" paragraph>
        We are a passionate team dedicated to bringing you the best experiences
        and solutions. Our mission is to simplify your life and inspire your
        creativity.
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Copyright © TODO Collabs2023
      </Typography>
      <Typography variant="body2">
        Contact us via{" "}
        <Link href="mailto:aead.abo.sholdom1@gmail.com">
          aead.abo.sholdom1@gmail.com
        </Link>
      </Typography>
    </Container>
  );
}
