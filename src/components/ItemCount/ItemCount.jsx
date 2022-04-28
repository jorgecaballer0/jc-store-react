import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import { Box, ButtonGroup } from "@mui/material";
import { CartContext } from "../../Context/CartContext";

export default function ItemCount({ stock, addCart, product, resetCount }) {
  const [count, setCount] = useState(0);
  const { addToCart } = useContext(CartContext);

  // Remover unidades del carrito
  function remove() {
    if (count > 0) {
      setCount(count - 1);
    }
  }
  // Agregar unidades al carrito
  function add() {
    if (count < stock) {
      setCount(count + 1);
    }
  }

  // Agregar producto al carrito
  function handleClickAdd() {
    addToCart({ ...product, count });
    addCart(count);
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
        }}
      >
        <ButtonGroup aria-label="text button group">
          <Button onClick={remove} variant="text" color="error" size="large">
            -
          </Button>
          <Button variant="text" color="inherit" size="large">
            {count}
          </Button>
          <Button onClick={add} variant="text" color="success" size="large">
            +
          </Button>
        </ButtonGroup>
        <Button
          onClick={() => {
            handleClickAdd();
          }}
          disabled={count === 0}
          variant="contained"
          color="primary"
          size="large"
        >
          Agregar al carrito
        </Button>
      </Box>
    </>
  );
}
