import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { CircleLoader } from "react-spinners";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
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
        CARGANDO PRODUCTOS...
      </Typography>
    </Box>
  );
}
