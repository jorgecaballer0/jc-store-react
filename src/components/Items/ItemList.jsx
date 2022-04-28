import React from "react";
import Item from "./Item";

export default function ItemList({ products }) {
  return products.map((p) => (
    <Item
      key={p.id}
      id={p.id}
      title={p.title}
      price={p.price}
      image={p.image}
      stock={p.stock}
    />
  ));
}
