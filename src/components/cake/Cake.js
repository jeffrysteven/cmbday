import React, { useState, useEffect } from "react";
import "./Cake.css";

function Cake({ onNextSlide }) {
  const [years, setYears] = useState(0);
  const countYears = (e) => {
    e.preventDefault();
    setYears(years + 1);
  };
  useEffect(() => {
    if (years === new Date().getFullYear() - 1991) {
      onNextSlide();
    }
    if (years === 10) {
      alert("Falta poco");
    }
    if (years === 20) {
      alert("Ya casi");
    }
  }, [years, onNextSlide]);
  return (
    <div className="show1">
      <div className="cake">
        <div className="plate"></div>
        <div className="layer layer-bottom"></div>
        <div className="layer layer-middle"></div>
        <div className="layer layer-top"></div>
        <div className="icing"></div>
        <div className="drip drip1"></div>
        <div className="drip drip2"></div>
        <div className="drip drip3"></div>
        <div className="candle">
          <div className="flame"></div>
        </div>
        <span className="candle-number">
          {years > 0 && years < 30 ? years : ""}
        </span>
      </div>
      <a onClick={countYears} href="#">
        <img
          src="https://media.giphy.com/media/QaBMSqWBhbgaKZb2Kb/giphy.gif"
          className="tap-here"
          onClick={countYears}
        />
      </a>
    </div>
  );
}

export default Cake;
