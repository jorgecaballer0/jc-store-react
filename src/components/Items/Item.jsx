import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";

export default function Item({ id, title, image }) {
  return (
    <Card
      sx={{
        maxWidth: 340,
        maxHeight: 500,
        minHeight: 500,
        my: 3,
        boxShadow: 5,
        borderRadius: 2,
      }}
    >
      <Container
        sx={{
          minHeight: 320,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <CardMedia sx={{
          maxHeight: 300,
        }} key={id} component="img" image={image} alt={title} />
      </Container>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardContent>
          <Typography
            sx={{
              textAlign: "center",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {title}
            <Divider variant="middle" />
          </Typography>
          <CardActions
            sx={{
              justifyContent: "center",
            }}
          >
            <Link to={`/item/${id}`}>
              <Button variant="contained" color="primary" size="large">
                Ver Detalle
              </Button>
            </Link>
          </CardActions>
        </CardContent>
      </Container>
    </Card>
  );
}
