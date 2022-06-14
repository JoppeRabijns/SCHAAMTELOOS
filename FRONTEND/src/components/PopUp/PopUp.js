import "./PopUp.scss";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Smartphone, Volume2 } from "react-feather";
import { useNavigate } from "react-router-dom";
import { setPhonenumber } from "../../slices/dataSlice";

function PopUp() {
  const dispatch = useDispatch();
  const [stap, setStap] = useState(1);
  const [doorgaan, setDoorgaan] = useState(false);

  const navigate = useNavigate();

  //https://regex101.com/r/hN5oL4/1
  const phonenumberRegex =
    /^(((\+|00)32[ ]?(?:\(0\)[ ]?)?)|0){1}(4(60|[789]\d)\/?(\s?\d{2}\.?){2}(\s?\d{2})|(\d\/?\s?\d{3}|\d{2}\/?\s?\d{2})(\.?\s?\d{2}){2})(\d)$/gm;

  const handleInput = (e) => {
    console.log();
    if (e.target.value.match(phonenumberRegex)) {
      dispatch(setPhonenumber(e.target.value));
      setDoorgaan(true);
    } else {
      setDoorgaan(false);
    }
  };

  const stap1 = () => {
    return (
      <>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec erat
          risus, elementum nec feugiat vitae, auctor sit amet nunc. Integer
          lobortis nunc lacus, ut pharetra lorem interdum venenatis. Etiam
          fermentum vehicula tincidunt. Sed facilisis, tortor at aliquam
          lobortis, orci odio euismod tellus, eget luctus odio ante id odio.
          Aliquam dapibus mauris ut faucibus feugiat. Sed quis arcu pharetra,
          sollicitudin mi vel, facilisis nulla. Ut placerat ante in nisl
          vulputate ullamcorper. Suspendisse hendrerit, eros at egestas
          condimentum, dui felis tempus felis, elementum placerat lorem ipsum
          non lectus. Schaamteloos magna, id dapibus leo. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Sed interdum tristique est sed
          lacinia. Nullam et dapibus metus. Ut sit amet enim in justo tempus
          dapibus id egestas est. Quisque condimentum mauris dolor. Aliquam
          sollicitudin in justo eget dignissim. Proin felis felis, luctus sit
          amet lacinia sed, fringilla vitae odio. Pellentesque risus felis.
        </p>
        <button className="doorgaan" onClick={() => setStap(2)}>
          AKKOORD
        </button>
        <button
          className="buttonAfwijzen"
          onClick={() => window.location.reload()}
        >
          AFWIJZEN
        </button>
      </>
    );
  };

  const stap2 = () => {
    return (
      <>
        <div className="icons">
          <Smartphone color="white" size={100} className="icon" />
          <Volume2 color="white" size={100} className="icon" />
        </div>
        <p className="instructie">GSM bij de hand? Computer geluid aan?</p>
        <button className="doorgaan" onClick={() => setStap(3)}>
          CHECK!
        </button>
      </>
    );
  };

  const stap3 = () => {
    return (
      <>
        <p className="instructie">
          Laat je telefoonnummer achter om de ervaring compleet te maken.
        </p>
        <form>
          <input
            onChange={(e) => handleInput(e)}
            type="tel"
            placeholder="+324........"
            required
            className="telefoon cursor"
          />
          <br />
          {doorgaan ? (
            <button
              type="sumbit"
              className="doorgaan"
              onClick={() => navigate("/loading")}
            >
              NAAR DE VIDEO
            </button>
          ) : (
            <></>
          )}
        </form>
      </>
    );
  };

  const stappen = () => {
    if (stap === 1) {
      return stap1();
    } else if (stap === 2) {
      return stap2();
    } else if (stap === 3) {
      return stap3();
    }
  };

  return (
    <div className="popup">
      <div className="popupDiv">
        <h1>STAP {stap}/3</h1>
        {stappen()}
      </div>
    </div>
  );
}

export default PopUp;
