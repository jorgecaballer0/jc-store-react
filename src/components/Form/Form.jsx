import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  Container,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import HomeIcon from "@mui/icons-material/Home";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Box } from "@mui/system";
import { Formik, Form } from "formik";
import { CartContext } from "../../Context/CartContext";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

// Funcion auxiliar
const shipping = (qty) => qty * 100;
// Estilo del modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "white",
  border: "medium dashed red",
  boxShadow: 2,
  p: 4,
};

export default function Formulario() {
  // Envia los datos del formulario a firebase
  const [sendForm, setSendForm] = useState(false);
  // Abre el modal
  const [open, setOpen] = useState(false);
  // Muestra el ticket de la compra
  const [ticket, setTicket] = useState(false);
  // Id del ticket
  const [codeId, setCodeId] = useState("");
  // Copiar al portapapeles
  const [copied, setCopied] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Context
  const { cart, total, clear } = useContext(CartContext);

  return (
    <>
      <Typography
        sx={{
          pt: "4rem",
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
          address: "",
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
          // Validacion de Direccion
          if (!validation.address) {
            errors.address = "Por favor ingrese su dirección";
          } else if (!/^[a-zA-Z0-9À-ÿ\s]{1,40}$/.test(validation.address)) {
            errors.address =
              "La dirección solo puede contener letras, espacios y números";
          }
          return errors;
        }}
        onSubmit={(dataForm, { resetForm }) => {
          // Setear datos para el envio a firebase
          let buyer = {
            dataForm, // Datos del comprador
            cart, // Datos del carrito
            total: "$ " + Number(total + shipping(cart.length)), // Total del carrito
            date: serverTimestamp(), // Fecha de compra
          };
          // Enviar datos a firebase
          const db = getFirestore();
          const orderRef = collection(db, "orders");
          // Agregar documento a la colección
          addDoc(orderRef, buyer).then(({ id }) => {
            // Setear id del ticket
            console.log("Ticket: ", id);
            setCodeId(id);
            // Muestra el boton para obtener el ticket
            setTimeout(() => setTicket(true), 1500);
            // Limpio el carrito
            clear();
          });
          // Reinicio el formulario
          resetForm();
          // Mensaje "enviado con éxito"
          setSendForm(true);
          setTimeout(() => setSendForm(false), 1500);
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
                  p: "3rem",
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
                    label="Nombre y apellido"
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
                <Box sx={{ display: "flex", alignItems: "flex-end", py: 1 }}>
                  <HomeIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                  <TextField
                    inputProps={{
                      inputMode: "text",
                      minLength: "5",
                      maxLength: "30",
                    }}
                    fullWidth
                    id="address"
                    label="Dirección"
                    variant="standard"
                    color="primary"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.address && errors.address}
                  />
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={cart.length === 0}
                  sx={{
                    width: "50%",
                    mx: "25%",
                    mt: 2,
                  }}
                >
                  Enviar
                </Button>
                {/* TEXTO "CARGANDO DATOS EN FIREBASE" */}
                {sendForm && (
                  <Typography
                    color="green"
                    sx={{
                      my: 2,
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                  >
                    Cargando pedido, por favor espere...
                  </Typography>
                )}
              </Card>
              {/* MODAL PARA VER EL TICKET CON EL ID*/}
              {ticket && (
                <Box
                  sx={{
                    mx: "auto",
                    mt: 2,
                  }}
                >
                  <Typography
                    color="white"
                    sx={{
                      my: 1,
                      fontSize: "1.2rem",
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                  >
                    Compra realizada con éxito!
                  </Typography>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={handleOpen}
                    sx={{
                      mx: "20%",
                    }}
                  >
                    Obtener el ID de tu compra
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                  >
                    <Fade in={open}>
                      <Box sx={style}>
                        <Typography
                          id="modal-title"
                          variant="h4"
                          component="h2"
                          textAlign="center"
                        >
                          El código de tu compra es:
                        </Typography>
                        <Typography
                          id="modal-id"
                          variant="body2"
                          textAlign="center"
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            mt: 2,
                            fontSize: "1.2rem",
                          }}
                        >
                          {codeId}
                          <CopyToClipboard
                            text={codeId}
                            onCopy={() => setCopied(true)}
                          >
                            <Button
                              onClick={() => {
                                if (copied) {
                                  setCopied(false);
                                  console.log("Ya se ha copiado el código");
                                } else {
                                  setTimeout(() => setCopied(false), 3000);
                                }
                              }}
                            >
                              <ContentCopyIcon
                                sx={{
                                  color: "action.active",
                                  cursor: "pointer",
                                }}
                              />
                            </Button>
                          </CopyToClipboard>
                        </Typography>
                        {copied ? (
                          <Typography
                            sx={{
                              color: "green",
                              fontSize: ".7rem",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            Copiado con éxito!
                          </Typography>
                        ) : null}
                      </Box>
                    </Fade>
                  </Modal>
                </Box>
              )}
            </Container>
          </Form>
        )}
      </Formik>
    </>
  );
}
