import Menu from "../components/Menu/Menu";
import Player from "../components/Player/Player";
import { useSelector } from "react-redux";

function Video() {
  const menuHide = useSelector((state) => state.menu.menuHide);
  const facebookGender = useSelector((state) => state.data.facebook.gender);

  return (
    <div className="App">
      {menuHide ? <></> : <Menu />}
      <Player gender={facebookGender} />
    </div>
  );
}

export default Video;
