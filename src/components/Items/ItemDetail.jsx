import { Button, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { CardActions, Card, CardMedia, CardContent, Chip } from "@mui/material";
import ItemCount from "../ItemCount/ItemCount";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

export default function ItemDetail({ card }) {
  const [number, setNumber] = useState(0);
  const [mostrar, setMostrar] = useState(false);

  // Comprar o ir al carrito
  const addCart = (count) => {
    setNumber(count);
    setMostrar(!mostrar);
  };

  return (
    <>
      <Container
        className="container-detail"
        sx={{
          display: "flex",
        }}
      >
        <Card
          sx={{
            maxWidth: "45%",
            margin: "auto",
            mx: "1rem",
            my: "1rem",
          }}
        >
          <CardMedia component="img" image={card.image} alt={card.title} />
        </Card>
        <Card
          sx={{
            Width: "55%",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                textAlign: "center",
                fontSize: "2.5rem",
              }}
            >
              {card.title}
            </Typography>
            <Typography textAlign="center" variant="subtitle2">
              {card.description}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                border: "1px solid #e0e0e0",
                borderColor: "blue",

                borderRadius: "0.5rem",
                padding: "0.5rem",
                textAlign: "center",
                mx: "25%",
                my: "1rem",
              }}
            >
              Precio: $ {card.price}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                my: "1rem",
              }}
            >
              <Typography
                textAlign="center"
                variant="body1"
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  mb: "1rem",
                }}
              >
                <u>Características Principales</u>
              </Typography>
              <Chip
                size="small"
                label={card.feature1}
                sx={{
                  mx: "1rem",
                  my: ".2rem",
                }}
              ></Chip>
              <Chip
                size="small"
                label={card.feature2}
                sx={{
                  mx: "1rem",
                  my: ".2rem",
                }}
              ></Chip>
              <Chip
                size="small"
                label={card.feature3}
                sx={{
                  mx: "1rem",
                  my: ".2rem",
                }}
              ></Chip>
              <Chip
                size="small"
                label={card.feature4}
                sx={{
                  mx: "1rem",
                  my: ".2rem",
                }}
              ></Chip>
            </Box>
            {number === 0 ? (
              <CardActions
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  mt: "1rem",
                }}
              >
                <ItemCount
                  stock={card.stock}
                  addCart={addCart}
                  product={card}
                />
                <Chip
                  sx={{
                    mt: 1,
                  }}
                  label={"STOCK: " + card.stock}
                />
              </CardActions>
            ) : (
              <CardActions
                sx={{
                  mt: 3,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Link to={`/cart`}>
                  <Button
                    sx={{
                      mb: 1,
                    }}
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Ir al Carrito
                  </Button>
                </Link>
                <Link to={`/`}>
                  <Button variant="text" color="success" size="small">
                    Continuar comprando
                  </Button>
                </Link>
              </CardActions>
            )}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
