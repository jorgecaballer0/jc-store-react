import React, { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import DetailLoading from "../Loadings/DetailLoading";

export default function ItemDetailContainer() {
  const [card, setCard] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    const detailRef = doc(db, "products", id);
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
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignContent: "center",
        }}
      >
        {loading === true ? <DetailLoading /> : <ItemDetail card={card} />}
      </Container>
    </>
  );
}
