import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./Pwnd.scss";
import gsap from "gsap";

const axios = require("axios").default;

function Pwnd(props) {
  const [pwnd, setPwnd] = useState();
  const [animationDone, setAnimationDone] = useState(false);
  const userPhonenumber = useSelector((state) => state.data.phonenumber);

  useEffect(() => {
    axios({
      method: "post",
      url: "http://84.195.15.105:3000/pwnd",
      data: {
        email: props.email,
      },
    }).then(function (response) {
      setPwnd(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getClasses = (classes) => {
    return classes.map((clas) => {
      return <li key={clas}>{clas}</li>;
    });
  };

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to("#tekst1", { opacity: 1, duration: 2 });
    tl.to("#tekst1", { opacity: 0, duration: 2, delay: 5 });
    tl.to("#tekst2", { opacity: 1, duration: 2 });
    tl.to("#tekst2", {
      opacity: 0,
      duration: 3,
      delay: 7,
      onComplete: () => {
        setAnimationDone(true);
      },
    });
  }, []);

  const powned = () => {
    return (
      <div className="powned">
        <h1>Alle websites waar jouw data is gelekt:</h1>
        <div className="pownedCard">{handlePwnd()}</div>
        <h2 className="copyright">gevonden met haveibeenpwned.com</h2>
      </div>
    );
  };

  const handlePwnd = () => {
    return pwnd.map((data) => {
      console.log(data);
      return (
        <div key={data.Name} className="pwndCard">
          <div className="image">
            <img src={data.LogoPath} alt={data.Name} />
          </div>
          <h1>{data.Name}</h1>
          <h2>{data.BreachDate}</h2>
          <h3>Gecompromitteerde gegevens:</h3>

          <ul>{getClasses(data.DataClasses)}</ul>
        </div>
      );
    });
  };

  return (
    <div className="breaches">
      <h2 id="tekst1">De video wordt geladen…</h2>
      <h2 id="tekst2">
        Websites waarbij data gelekt is van het e-mailadres of telefoon nummer:
        <br />
        {props.email} of {userPhonenumber}
      </h2>
      {pwnd && animationDone && powned()}
    </div>
  );
}

export default Pwnd;
