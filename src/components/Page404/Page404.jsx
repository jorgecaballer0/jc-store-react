import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <>
      <Container maxWidth="xl" className="bodyContainer">
        <Box
          sx={{
            mt: "25%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            gutterBottom
            variant="h2"
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: "2rem",
              textAlign: "center",
            }}
          >
            ¡Lo sentimos!
          </Typography>
          <Typography
            gutterBottom
            variant="h2"
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: "3rem",
              textAlign: "center",
            }}
          >
            NO ENCONTRAMOS LO QUE BUSCABAS, POR FAVOR VUELVA A LA PAGINA
            PRINCIPAL
          </Typography>
          <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
            <Button variant="contained" size="large">
              Volver a la pagina principal
            </Button>
          </Link>
        </Box>
      </Container>
    </>
  );
}
