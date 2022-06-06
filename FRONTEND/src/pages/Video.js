import Menu from "../components/Menu/Menu";
import Player from "../components/Player/Player";
import { useSelector } from "react-redux";

function Video() {
  const menuHide = useSelector((state) => state.menu.menuHide);

  return (
    <div className="App">
      {menuHide ? <></> : <Menu />}
      <Player />
    </div>
  );
}

export default Video;
