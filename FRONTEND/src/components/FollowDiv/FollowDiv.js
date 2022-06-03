import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./FollowDiv.scss";

function FollowDiv() {
  const ip = useSelector((state) => state.data.fingerprint.ip);
  const [mouseY, setMouseY] = useState(window.innerHeight / 2);

  useEffect(() => {
    onmousemove = (e) => {
      setMouseY(e.screenY);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onmousemove]);

  return (
    <div className="follow" style={{ top: mouseY }}>
      <h6>IP: {ip}</h6>
      <div className="followDiv"></div>
    </div>
  );
}

export default FollowDiv;
