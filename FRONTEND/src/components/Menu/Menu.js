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
import { X } from "react-feather";
import { Menu as MenuIcon } from "react-feather";
import UseAnimations from "react-useanimations";
import twitter from "react-useanimations/lib/twitter";
import facebook from "react-useanimations/lib/facebook";
import linkedin from "react-useanimations/lib/linkedin";

//https://stackoverflow.com/questions/9120539/facebook-share-link-without-javascript

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
            <UseAnimations
              animation={twitter}
              size={45}
              className="icon"
              strokeColor="white"
              wrapperStyle={{ padding: 10 }}
              render={(eventProps, animationProps) => (
                <a
                  {...eventProps}
                  href="http://www.twitter.com/share?url=https://schaamteloos.online/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div {...animationProps} />
                </a>
              )}
            />
            <UseAnimations
              animation={facebook}
              size={30}
              strokeColor="white"
              wrapperStyle={{ padding: 10 }}
              render={(eventProps, animationProps) => (
                <a
                  {...eventProps}
                  href="https://www.facebook.com/sharer/sharer.php?u=https://schaamteloos.online/L&t=SCHAAMTELOOS"
                  onclick="javascript:window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;"
                  target="_blank"
                  rel="noreferrer"
                  title="Share on Facebook"
                >
                  <div {...animationProps} />
                </a>
              )}
            />
            <UseAnimations
              animation={linkedin}
              size={45}
              className="icon"
              strokeColor="white"
              wrapperStyle={{ padding: 10 }}
              render={(eventProps, animationProps) => (
                <a
                  {...eventProps}
                  href="https://www.linkedin.com/sharing/share-offsite/?url=https://schaamteloos.online/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div {...animationProps} />
                </a>
              )}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Menu;
