import { useState, useEffect } from "react";
import "./Title.scss";

function Title(props) {
  const [translateLeft, setTranslateLeft] = useState(
    "translate(" + 816 + "," + 72 + ")"
  );
  const [translateRight, setTranslateRight] = useState(
    "translate(" + 924 + "," + 72 + ")"
  );

  //https://dev.to/stackfindover/animated-eyes-follow-mouse-cursor-javascript-mouse-move-3n40
  useEffect(() => {
    window.addEventListener("mousemove", (event) => {
      let xLeft = 816 - (window.innerWidth / 2 + 400 - event.pageX) / 100;
      let yLeft = 72 - (window.innerHeight / 2 - event.pageY) / 70;
      setTranslateLeft("translate(" + xLeft + "," + yLeft + ")");
      let xRight = 924 - (window.innerWidth / 2 + 400 - event.pageX) / 100;
      let yRight = 72 - (window.innerHeight / 2 - event.pageY) / 70;
      setTranslateRight("translate(" + xRight + "," + yRight + ")");
    });
  });

  return (
    <div className="titleDiv">
      <svg
        className="title"
        id="Component_2_14"
        data-name="Component 2 – 14"
        xmlns="http://www.w3.org/2000/svg"
        width="1072"
        height="169"
        viewBox="0 0 1072 169"
      >
        <text
          id="SCHAAMTELOOS"
          fill="#fff"
          fontSize="140"
          fontFamily="FatFrank-Free, FatFrank"
        >
          <tspan x="0" y="130">
            SCHAAMTELOOS
          </tspan>
        </text>
        <circle
          id="Ellipse_5"
          data-name="Ellipse 5"
          cx="25.5"
          cy="25.5"
          r="25.5"
          transform="translate(802 58)"
          fill="#709abf"
        />
        <circle
          id="Ellipse_8"
          data-name="Ellipse 8"
          cx="25.5"
          cy="25.5"
          r="25.5"
          transform="translate(910 58)"
          fill="#709abf"
        />
        <circle
          id="Ellipse_6"
          data-name="Ellipse 6"
          cx="11.5"
          cy="11.5"
          r="11.5"
          transform={translateRight}
          fill="rgba(26,26,26,0.95)"
        />
        <circle
          id="Ellipse_7"
          data-name="Ellipse 7"
          cx="11.5"
          cy="11.5"
          r="11.5"
          transform={translateLeft}
          fill="rgba(26,26,26,0.95)"
        />
      </svg>
      {props.subtitle ? (
        <h6 className="subtitle">
          EEN INTERACTIEVE WEBSITE OVER ONLINE PRIVACY
        </h6>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Title;
