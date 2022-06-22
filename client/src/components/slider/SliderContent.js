import React from "react";

function SliderContent({ activeIndex, sliderImage }) {
  return (
    <section>
      {sliderImage.map((slide, index) => (
        <div
          key={index}
          className={index === activeIndex ? "slides active" : "inactive"}
        >
        <a href={`http://localhost:3001/pagenews/${slide._id}`}>
          <img className="slide-image" src={`http://localhost:5000/${slide.img}`} alt="" />
          <h2 className="slide-title">{slide.header}</h2>
          <h3 className="slide-text">{slide.subtitle}</h3>
        </a>
        </div>
      ))}
    </section>
  );
}

export default SliderContent;