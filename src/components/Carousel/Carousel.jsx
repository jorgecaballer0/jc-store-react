import React, { useState } from "react";
import { SliderData } from "../../utils/imgCarousel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Container } from "@mui/material";

export default function Carousel({ slides }) {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          my: "3rem",
          mx: "auto",
        }}
      >
        <ArrowBackIosIcon
          fontSize="large"
          className="arrowPrev"
          onClick={prevSlide}
        />
        <ArrowForwardIosIcon
          fontSize="large"
          className="arrowNext"
          onClick={nextSlide}
        />
        {SliderData.map((slide, index) => {
          return (
            <Box
              className={index === current ? "slide active" : "slide"}
              key={index}
            >
              {index === current && (
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="imgCarousel"
                />
              )}
            </Box>
          );
        })}
      </Container>
    </>
  );
}
