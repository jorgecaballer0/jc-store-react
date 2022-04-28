import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { ButtonGroup, Container } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

function Copyright() {
  return (
    <Typography variant="body1" color="white" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        J|C Store
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <>
      <Box className="footer-container"
        sx={{
          bgcolor: "rgba(0, 0, 0, 0.4)",
          p: 1,
          color: "white",
          display: "flex",
        }}
        component="footer"
      >
        <Container className="text-footer">
          <Typography variant="h5" align="center" gutterBottom>
            Contacto
          </Typography>
          <ButtonGroup
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <InstagramIcon />
            <FacebookIcon />
            <WhatsAppIcon />
          </ButtonGroup>
        </Container>

        <Container className="text-footer">
          <Typography variant="h5" align="center" gutterBottom>
            Sobre Nosotros
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="white"
            component="p"
          >
            Nosotros
          </Typography>
        </Container>

        <Container className="text-footer">
          <Typography variant="h5" align="center" gutterBottom>
            Preguntas Frecuentes (FAQ)
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="white"
            component="p"
          >
            FAQ
          </Typography>
        </Container>
      </Box>
      <Box
        sx={{
          bgcolor: "rgba(0, 0, 0, 0.4)",
          display: "flex",
          justifyContent: "center",
          pb: 1,
        }}
      >
        <Copyright />
      </Box>
    </>
  );
}
