import backgroundVideo from "../../assets/video/INTRO.mp4";
import FacebookComponent from "../../components/Facebook/Facebook";
import Fingerprint from "../../components/Fingerprint/Fingerprint";
import "../Home/Login.scss";
import Title from "../../components/Title/Title";
import OverDitProject from "../../components/OverDitProject/OverDitProject";
import { useEffect, useState } from "react";
import HomeAnimation from "../../components/HomeAnimation/HomeAnimation";
import SocialIcons from "../../components/SocialIcons/SocialIcons";
import { useSelector } from "react-redux";
import PopUp from "../../components/PopUp/PopUp";

function Login() {
  const [Over, setOver] = useState(false);
  const facebookID = useSelector((state) => state.data.facebook.id);
  return (
    <div>
      <HomeAnimation />
      {Over ? <OverDitProject /> : <></>}
      <div className="homeMenu">
        <h2 onClick={() => setOver(!Over)} className="cursor">
          OVER DIT PROJECT
        </h2>
        <h2 className="cursor">PRIVACY POLICY</h2>
        <SocialIcons />
      </div>
      {facebookID ? (
        <>
          <PopUp />
        </>
      ) : (
        <>
          <Title subtitle /> <FacebookComponent />
        </>
      )}
      <Fingerprint />
      <video src={backgroundVideo} autoPlay loop muted className="video" />
    </div>
  );
}

export default Login;
