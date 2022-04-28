import React, { useContext, useEffect, useState } from "react";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import HomeIcon from "@mui/icons-material/Home";
import { Button, Card, Container, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { CartContext } from "../../Context/CartContext";

const shipping = (qty) => qty * 100;

export default function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const { cart, total, clear } = useContext(CartContext);

  useEffect(() => {
    let buyer = {
      buyer: { name, email, phone, address },
      products: cart,
      total: "$ " + total + shipping(cart.length),
    };
    console.log(buyer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, email, phone, address]);

  return (
    <>
      <Container
        className="bodyContainer"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        >
      </Container>
    </>
  );
}
