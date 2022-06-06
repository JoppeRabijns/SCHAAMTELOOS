import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./Pwnd.scss";
import gsap from "gsap";

const axios = require("axios").default;

function Pwnd() {
  const [pwnd, setPwnd] = useState(false);
  const [notPwnd, setnotPwdn] = useState(false);

  const [animationDone, setAnimationDone] = useState(false);
  const userPhonenumber = useSelector((state) => state.data.phonenumber);
  const email = useSelector((state) => state.data.facebook.email);

  useEffect(() => {
    console.log(email);
    axios({
      method: "post",
      url: "https://schaamteloos.herokuapp.com/pwnd",
      data: {
        email: email,
      },
    })
      .then(function (response) {
        setPwnd(response.data);
      })
      .catch((error) => {
        console.log(error);
        setnotPwdn(true);
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
    tl.to("#tekst1", { opacity: 1, duration: 1 });
    tl.to("#tekst1", { opacity: 0, duration: 1, delay: 2 });
    tl.to("#tekst2", { opacity: 1, duration: 2 });
    tl.to("#tekst2", {
      opacity: 0,
      duration: 1,
      delay: 3,
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
        {email} of {userPhonenumber}
      </h2>
      {pwnd && animationDone && powned()}
      {notPwnd && animationDone ? (
        <h2>Proficiat, er werden geen datalekken gevonden!</h2>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Pwnd;
