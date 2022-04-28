import React, { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { CircleLoader } from "react-spinners";
import { doc, getDoc, getFirestore } from "firebase/firestore";

export default function ItemDetailContainer() {
  const [card, setCard] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    const detailRef = doc(db, "productos", id);
    getDoc(detailRef)
      .then((res) => setCard({ id: res.id, ...res.data() }))
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <Container
        className="bodyContainer"
        maxWidth="xl"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignContent: "center",
        }}
      >
        {loading === true ? (
          <>
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
              <Typography mt={4} gutterBottom variant="h4" color="white">
                CARGANDO DETALLE DEL PRODUCTO...
              </Typography>
            </Box>
          </>
        ) : (
          <ItemDetail card={card} />
        )}
      </Container>
    </>
  );
}
