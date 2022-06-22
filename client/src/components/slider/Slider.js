import React, { useEffect, useState, useCallback } from "react";
import SliderContent from "./SliderContent";
import Dots from "./Dots";
import Arrows from "./Arrows";
import "./slider.css";
import { useHttp } from "../../hooks/http.hook";





function Slider(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [linksFast, setFastLinks] = useState([])
    const {request} = useHttp()

    const len = linksFast.length - 1;

  const fetchFastNews = useCallback(async () => {
    try {
        const fetchedFastNews = await request('/api/news/importantnews', 'GET', null)
        setFastLinks(fetchedFastNews)
    } catch (e) {}
}, [request])

  useEffect(() => {
    fetchFastNews()
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, fetchFastNews]);

  return (
    <div className="slider-container">
      <SliderContent activeIndex={activeIndex} sliderImage={linksFast} />
      <Arrows
        prevSlide={() =>
          setActiveIndex(activeIndex < 1 ? len : activeIndex - 1)
        }
        nextSlide={() =>
          setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)
        }
      />
      <Dots
        activeIndex={activeIndex}
        sliderImage={linksFast}
        onclick={(activeIndex) => setActiveIndex(activeIndex)}
      />
    </div>
  );
}

export default Slider;