import React, { useState, useEffect, useCallback } from "react";
import { formatDistanceToNow, isSameDay, isPast } from "date-fns";
import cx from "classnames";
import "./App.css";
import Cake from "./components/cake";
import Ticket from "./components/ticket/Ticket";

function App() {
  const currentBDayDate = new Date(new Date().getFullYear(), 8, 30);
  const [slide, setSlide] = useState(1);
  const [bdayDate, setBDayDate] = useState(currentBDayDate);
  const showNextSlide = () => {
    const newSlide = slide + 1;
    if (newSlide === 3) {
      alert("Y ahora ...");
      alert("El regalo!");
      alert("O bueno, una representación gráfica de el regalo xD");
      alert("Pon el teléfono en horizontal");
      alert("Te quiero muchísimo negrita hermosa, feliz cumpleaños");
    }
    setSlide(newSlide);
  };
  const calculatedDate = useCallback(() => {
    const currentDate = new Date();
    if (isPast(bdayDate, currentDate) && !isSameDay(bdayDate, currentDate)) {
      currentBDayDate.setFullYear(currentBDayDate.getFullYear() + 1);
      setBDayDate(currentBDayDate);
      return currentBDayDate;
    } else {
      return bdayDate;
    }
  }, [bdayDate, setBDayDate, currentBDayDate]);

  const randomGif = () => {
    const gifs = [
      "https://media.giphy.com/media/RMhbmeqWeOBQIiQkS4/giphy.gif",
      "https://media.giphy.com/media/AMSUrxqH4vxPW/giphy.gif",
      "https://media.giphy.com/media/o5oLImoQgGsKY/giphy.gif",
      "https://media.giphy.com/media/xf20D8HzvTQzu/giphy.gif",
      "https://media.giphy.com/media/PWfHC8ogZpWcE/giphy.gif",
    ];
    return gifs[Math.floor(Math.random() * gifs.length)];
  };
  useEffect(() => {
    const interval = setInterval(() => {
      calculatedDate();
    }, 1000);
    return () => clearInterval(interval);
  }, [calculatedDate, bdayDate, setBDayDate]);
  const classNamesCake = cx("animate__animated", {
    animate__fadeOutUp: slide === 2,
  });

  const classNamesBDay = cx("bday-message", {
    "height-50": slide === 1,
    "height-30": slide === 2,
  });
  return isSameDay(bdayDate, new Date()) ? (
    <div className="App">
      {slide > 0 && slide < 3 && (
        <div className={classNamesBDay}>
          <span>HAPPY BIRTHDAY </span>
          <span>CINDY MARGARITA! <span role="img" aria-label="tada">🎉</span></span>
        </div>
      )}
      {(slide === 1 && (
        <Cake onNextSlide={showNextSlide} className={classNamesCake} />
      )) ||
        (slide === 2 && (
          <div id="message">
            <span>
              Cindy (mi negri), hoy que es el día de tu cumpleaños, sólo quiero
              decirte que te deseo lo mejor de la vida, que este nuevo año esté cargado de mucha felicidad, salud, mucho amor e infinitas razones
              para que sonrías <span role="img" aria-label="tada">🎉</span><span role="img" aria-label="tada">🎉</span><span role="img" aria-label="tada">🎉</span>.
              <br />
              <br />
              Te quiero Cindy Margarita, espero poder seguir celebrando tu vida
              cada año que pase, seguir siendo testigo de tus logros y sobre
              todo de tu linda sonrisa. Y como te dije el año pasado, ¡Seguí
              brillando negrita!, que cumplas muchísimos más.
            </span>
            <hr />
            <img
              src="https://media.giphy.com/media/dCERkihZ9m7xjIvSau/giphy.gif"
              className="tap-me"
              onClick={showNextSlide}
              alt="tap"
            />
          </div>
        )) ||
        (slide === 3 && <Ticket onNextSlide={showNextSlide} />)}
    </div>
  ) : (
    <div className="App">
      <img src={randomGif()} width="90%" alt="not-yet"/>
      <span id="countdown">
        {`We'll be back ${formatDistanceToNow(calculatedDate(), new Date(), {
          addSuffix: false,
        })}`}
      </span>
    </div>
  );
}

export default App;
