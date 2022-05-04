import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Fade from "@mui/material/Fade";

function priceFormat(num) {
  return `${num.toFixed(2)}`;
}

const priceRow = (qty, price) => qty * price;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Cart() {
  const { cart, removeFromCart, total, shipping } = useContext(CartContext);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {cart.length > 0 ? (
        <Container className="bodyContainer">
          <Typography
            sx={{
              my: "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            variant="h4"
            color="white"
          >
            DETALLE DE LA COMPRA
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={6}>
                    CARRITO
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Acciones</TableCell>
                  <TableCell />
                  <TableCell>Producto</TableCell>
                  <TableCell align="right">Cantidad</TableCell>
                  <TableCell align="right">Precio</TableCell>
                  <TableCell align="right">TOTAL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Tooltip
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 350 }}
                        title="Eliminar producto"
                        arrow
                        placement="bottom-start"
                      >
                        <DeleteOutlineIcon
                          onClick={() => removeFromCart(item.id)}
                          fontSize="small"
                          sx={{
                            cursor: "pointer",
                            color: "black",
                            "&:hover": {
                              color: "red",
                            },
                          }}
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: "50px", padding: "2px" }}
                      />
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell align="right">{item.count}</TableCell>
                    <TableCell align="right">
                      $ {priceFormat(item.price)}
                    </TableCell>
                    <TableCell align="right">
                      $ {priceFormat(priceRow(item.count, item.price))}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4} />
                  <TableCell colSpan={1}>
                    <Typography variant="subtitle1">Subtotal</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle1">
                      $ {priceFormat(total)}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} />
                  <TableCell colSpan={1}>
                    <Typography variant="caption">
                      Costo de envío estimado
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="caption">
                      $ {priceFormat(shipping(cart.length))}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} />
                  <TableCell colSpan={1}>
                    <Typography variant="h4">Total</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h5">
                      $ {priceFormat(total + shipping(cart.length))}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: "1rem",
            }}
          >
            <Button
              variant="contained"
              color="success"
              onClick={handleClickOpen}
            >
              <Typography variant="h6" color="white">
                Confirmar compra
              </Typography>
            </Button>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>
                {"Desea finalizar la compra y completar el formulario de envío?"}
              </DialogTitle>
              <DialogActions>
                <Button onClick={handleClose} color="error">
                  No, seguir comprando
                </Button>
                <Link to={"/form"}>
                  <Button onClick={handleClose} color="primary">
                    Continuar
                  </Button>
                </Link>
              </DialogActions>
            </Dialog>
          </Box>
        </Container>
      ) : (
        <Container
          className="bodyContainer"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            className="MqText"
            gutterBottom
            variant="h2"
            color="white"
          >
            Tu carrito esta vacío!
          </Typography>
          <Link to="/">
            <Button variant="contained" color="primary">
              Volver a comprar
            </Button>
          </Link>
        </Container>
      )}
    </>
  );
}
