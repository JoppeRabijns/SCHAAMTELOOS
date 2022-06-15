import backgroundVideo from "../../assets/video/INTRO.mp4";
import FacebookComponent from "../../components/Facebook/Facebook";
import Fingerprint from "../../components/Fingerprint/Fingerprint";
import "../Home/Login.scss";
import Title from "../../components/Title/Title";
import OverDitProject from "../../components/OverDitProject/OverDitProject";
import HomeAnimation from "../../components/HomeAnimation/HomeAnimation";
import SocialIcons from "../../components/SocialIcons/SocialIcons";
import { useDispatch, useSelector } from "react-redux";
import PopUp from "../../components/PopUp/PopUp";
import {
  setOverDitProjectTrue,
  setPrivacyPolicyTrue,
} from "../../slices/menuSlice";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";

function Login() {
  const dispatch = useDispatch();
  const Over = useSelector((state) => state.menu.overDitProject);
  const Privacy = useSelector((state) => state.menu.privacyPolicy);
  const facebookID = useSelector((state) => state.data.facebook.id);

  return (
    <div>
      <HomeAnimation />
      {Over ? <OverDitProject /> : <></>}
      {Privacy ? <PrivacyPolicy /> : <></>}
      <div className="homeMenu">
        <h2
          onClick={() => dispatch(setOverDitProjectTrue())}
          className="cursor"
        >
          OVER DIT PROJECT
        </h2>
        <h2 className="cursor" onClick={() => dispatch(setPrivacyPolicyTrue())}>
          PRIVACY POLICY
        </h2>
        <SocialIcons />
      </div>
      {facebookID ? (
        <>
          <PopUp />
        </>
      ) : (
        <></>
      )}
      {facebookID || Over || Privacy ? (
        <></>
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
