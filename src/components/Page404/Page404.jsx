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
          <Typography gutterBottom variant="h2">
            PAGINA NO ENCONTRADA
          </Typography>
          <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
            <Button variant="contained" size="large">
              Volver al inicio
            </Button>
          </Link>
        </Box>
      </Container>
    </>
  );
}
