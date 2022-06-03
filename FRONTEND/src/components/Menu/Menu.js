import "./Menu.scss";
import UIfx from "uifx";
import { useDispatch, useSelector, batch } from "react-redux";
import {
  setPlayingStateTrue,
  setPlayingStateFalse,
} from "../../slices/videoSlice";
import { setmenuOpenTrue, setmenuOpenFalse } from "../../slices/menuSlice";
import click_select from "../../assets/sfx/click_select.mp3";
import Title from "../Title/Title";
import { X, Twitter, Facebook, Linkedin } from "react-feather";
import { Menu as MenuIcon } from "react-feather";

const Menu = () => {
  const dispatch = useDispatch();
  const videoPlaying = useSelector((state) => state.video.playing);
  const menuOpen = useSelector((state) => state.menu.menuOpen);

  const clickSFX = new UIfx(click_select, {
    volume: 0.3,
    throttleMs: 100,
  });

  function controlMenu() {
    if (videoPlaying && !menuOpen) {
      clickSFX.play();
      batch(() => {
        dispatch(setPlayingStateFalse());
        dispatch(setmenuOpenTrue());
      });
    } else if (!videoPlaying && menuOpen) {
      clickSFX.play();
      batch(() => {
        dispatch(setPlayingStateTrue());
        dispatch(setmenuOpenFalse());
      });
    }
  }

  return (
    <>
      <h2 onClick={controlMenu} className="menuButton">
        {!menuOpen ? (
          <MenuIcon color="white" size={36} className="menuIcon cursor" />
        ) : (
          <X color="white" size={36} className="menuIcon" />
        )}
      </h2>
      {menuOpen ? (
        <div className="menu">
          <Title />
          <div className="videoMenu">
            <h2>OVER DIT PROJECT</h2>
            <h2>PRIVACY POLICY</h2>
            <h2 onClick={() => window.location.reload()}>DATA VERWIJDEREN</h2>
          </div>
          <div className="delen">
            <Twitter color="white" size={45} className="icon" />
            <Facebook color="white" size={45} className="icon" />
            <Linkedin color="white" size={45} className="icon" />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Menu;
