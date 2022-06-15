import "./Menu.scss";
import UIfx from "uifx";
import { useDispatch, useSelector } from "react-redux";
import {
  setPlaying1StateTrue,
  setPlaying1StateFalse,
  setPlaying2StateTrue,
  setPlaying2StateFalse,
} from "../../slices/videoSlice";
import { setmenuOpenTrue, setmenuOpenFalse } from "../../slices/menuSlice";
import click_select from "../../assets/sfx/click_select.mp3";
import Title from "../Title/Title";
import { X } from "react-feather";
import { Menu as MenuIcon } from "react-feather";
import OverDitProject from "../OverDitProject/OverDitProject";
import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy";
import {
  setOverDitProjectTrue,
  setPrivacyPolicyTrue,
} from "../../slices/menuSlice";
import SocialIcons from "../SocialIcons/SocialIcons";

//https://stackoverflow.com/questions/9120539/facebook-share-link-without-javascript

const Menu = () => {
  const dispatch = useDispatch();

  const Playing1 = useSelector((state) => state.video.playing1);
  const Playing2 = useSelector((state) => state.video.playing2);
  const menuOpen = useSelector((state) => state.menu.menuOpen);
  const Over = useSelector((state) => state.menu.overDitProject);
  const Privacy = useSelector((state) => state.menu.privacyPolicy);

  const clickSFX = new UIfx(click_select, {
    volume: 0.3,
    throttleMs: 100,
  });

  function controlMenu() {
    if (Playing1 && !menuOpen) {
      clickSFX.play();
      dispatch(setPlaying1StateFalse());
      dispatch(setmenuOpenTrue());
    } else if (!Playing1 && menuOpen) {
      clickSFX.play();
      dispatch(setPlaying1StateTrue());
      dispatch(setmenuOpenFalse());
    } else if (Playing2 && !menuOpen) {
      clickSFX.play();
      dispatch(setPlaying2StateFalse());
      dispatch(setmenuOpenTrue());
    } else if (!Playing2 && menuOpen) {
      clickSFX.play();
      dispatch(setPlaying2StateTrue());
      dispatch(setmenuOpenFalse());
    }
  }

  const menuItem = () => {
    return (
      <>
        {Over || Privacy ? (
          <div className="menu"></div>
        ) : (
          <div className="menu">
            <Title />
            <div className="videoMenu">
              <h2
                onClick={() => dispatch(setOverDitProjectTrue())}
                className="cursor"
              >
                OVER DIT PROJECT
              </h2>
              <h2
                className="cursor"
                onClick={() => dispatch(setPrivacyPolicyTrue())}
              >
                PRIVACY POLICY
              </h2>
              <h2 onClick={() => window.location.reload()}>DATA VERWIJDEREN</h2>
            </div>
            <div className="delen">
              <SocialIcons size={45} />
            </div>
          </div>
        )}
      </>
    );
  };
  return (
    <>
      <h2 onClick={controlMenu} className="menuButton">
        {!menuOpen ? (
          <MenuIcon color="white" size={36} className="menuIcon cursor" />
        ) : (
          <X color="white" size={36} className="menuIcon" />
        )}
      </h2>
      {Over ? <OverDitProject /> : <></>}
      {Privacy ? <PrivacyPolicy /> : <></>}
      {menuOpen ? menuItem() : <></>}
    </>
  );
};

export default Menu;
