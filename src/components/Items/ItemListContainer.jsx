import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import Carousel from "../Carousel/Carousel";
import { SliderData } from "../../utils/imgCarousel";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import Loading from "../Loadings/Loading";

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
          <Loading />
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
