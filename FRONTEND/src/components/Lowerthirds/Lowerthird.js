//https://codepen.io/danhighbrown/pen/VNbqzQ
import { useEffect, useState } from "react";

import "./Lowerthird.scss";
function Lowerthirds() {
  const [timeOut, setTimeOut] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTimeOut(true);
    }, 3000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setTimeOut(false);
    }, 9000);
  }, []);

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); 
  let yyyy = today.getFullYear();
  today = mm + "-" + dd + "-" + yyyy;

  return (
    <>
      {timeOut ? (
        <div id="lowerThird">
          <div className="flexContainer">
            <div className="container">
              <div className="box1 base"></div>
              <div className="box2 color2"></div>
              <div className="box3 base">
                <div className="text primTxt">{today}</div>
              </div>
            </div>
            <div className="lineBreak"></div>
            <div class="container">
              <div className="box1 color1"></div>
              <div className="box2 color2"></div>
              <div className="box3 color1">
                <div className="text secTxt">Leuven</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Lowerthirds;
