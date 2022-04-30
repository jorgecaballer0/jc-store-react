import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import { CircleLoader } from "react-spinners";
import { Box } from "@mui/system";
import Carousel from "../Carousel/Carousel";
import { SliderData } from "../../utils/imgCarousel";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

export default function ItemListContainer() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    let productosRef;
    if (!categoryId) {
      productosRef = collection(db, "products");
    } else {
      productosRef = query(
        collection(db, "products"),
        where("category", "==", categoryId)
      );
    }
    getDocs(productosRef)
      .then((res) =>
        setItems(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      )
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, [categoryId]);

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
        {loading ? (
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
              <Typography
                className="MqText"
                mt={4}
                gutterBottom
                variant="h4"
                color="white"
              >
                CARGANDO PRODUCTOS...
              </Typography>
            </Box>
          </>
        ) : (
          <>
            <Carousel slides={SliderData} />
            <ItemList products={items} />
          </>
        )}
      </Container>
    </>
  );
}
