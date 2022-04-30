import React, { useContext, useState } from "react";
import { Button, Card, Container, TextField, Typography } from "@mui/material";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { Box } from "@mui/system";
import { Formik, Form } from "formik";
import { CartContext } from "../../Context/CartContext";

const shipping = (qty) => qty * 100;

export default function Formulario() {
  const [sendForm, setSendForm] = useState(false);
  const { cart, total, clear } = useContext(CartContext);

  return (
    <>
      <Typography
        sx={{
          mt: "3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        variant="h4"
        color="white"
      >
        FORMULARIO DE ENVIO
      </Typography>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
        }}
        validate={(validation) => {
          let errors = {};
          // Validacion de Nombre
          if (!validation.name) {
            errors.name = "Por favor ingrese su nombre";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(validation.name)) {
            errors.name = "El nombre solo puede contener letras y espacios";
          }
          // Validacion de Email
          if (!validation.email) {
            errors.email = "Por favor ingrese su email";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              validation.email
            )
          ) {
            errors.email =
              "El correo solo puede contener letras, numeros, puntos y guiones";
          }
          // Validacion de Telefono
          if (!validation.phone) {
            errors.phone = "Por favor ingrese su N° de teléfono";
          } else if (!/^[0-9]{10}$/.test(validation.phone)) {
            errors.phone =
              "El teléfono debe contener 10 dígitos, sin espacios ni guiones";
          }
          return errors;
        }}
        onSubmit={(dataForm, { resetForm }) => {
          // Setear datos para el envio a firebase
          let buyer = {
            dataForm, // Datos del comprador
            cart, // Datos del carrito
            total: "$ " + Number(total + shipping(cart.length)), // Total del carrito
          };
          console.log(buyer);
          // Limpiar el formulario
          resetForm();
          // Mensaje de enviado con éxito
          setSendForm(true);
          setTimeout(() => setSendForm(false), 3000);
          // Limpiar carrito
          clear();
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <Container
              className="bodyContainer"
              maxWidth="sm"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Card
                sx={{
                  p: "2rem",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "flex-end", py: 1 }}>
                  <DriveFileRenameOutlineIcon
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    inputProps={{
                      inputMode: "text",
                      minLength: "5",
                      maxLength: "30",
                    }}
                    fullWidth
                    id="name"
                    label="Nombre"
                    variant="standard"
                    color="primary"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.name && errors.name}
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-end", py: 1 }}>
                  <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                  <TextField
                    inputProps={{
                      inputMode: "email",
                      minLength: "5",
                    }}
                    fullWidth
                    id="email"
                    label="E-mail"
                    variant="standard"
                    color="primary"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.email && errors.email}
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-end", py: 1 }}>
                  <PhoneAndroidIcon
                    sx={{ color: "action.active", mr: 1, my: 0.5 }}
                  />
                  <TextField
                    inputProps={{
                      inputMode: "tel",
                      pattern: "[0-9]*",
                      maxLength: 10,
                    }}
                    fullWidth
                    id="phone"
                    label="N° de teléfono"
                    variant="standard"
                    color="primary"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.phone && errors.phone}
                  />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    width: "50%",
                    mx: "25%",
                    mt: 2,
                  }}
                >
                  Enviar
                </Button>
                {sendForm && (
                  <Typography
                    color="green"
                    sx={{
                      my: 2,
                      fontSize: "1rem",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    El formulario fue enviado con exito!
                  </Typography>
                )}
              </Card>
            </Container>
          </Form>
        )}
      </Formik>
    </>
  );
}
