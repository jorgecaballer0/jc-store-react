import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { CircleLoader } from "react-spinners";

export default function DetailLoading() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircleLoader size={65} color="white" />
      <Typography
        className="MqText"
        mt={4}
        gutterBottom
        variant="h4"
        color="white"
      >
        CARGANDO DETALLE DEL PRODUCTO...
      </Typography>
    </Box>
  );
}
