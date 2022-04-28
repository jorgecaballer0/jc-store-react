import React from "react";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { Link } from "react-router-dom";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

export default function CartWidget({ cant }) {
  return (
    <Link to={"/cart"}>
      <IconButton aria-label="cart">
        <Badge badgeContent={cant} color="secondary">
          {cant > 0 ? (
            <div className="carrito">
              <ShoppingCartCheckoutIcon fontSize="medium" />
            </div>
          ) : (
            <div className="carrito">
              <ShoppingCartRoundedIcon fontSize="medium" />
            </div>
          )}
        </Badge>
      </IconButton>
    </Link>
  );
}
