import FacebookLogin from "react-facebook-login";
import "./Facebook.scss";
import { useDispatch } from "react-redux";
import { addFacebookData } from "../../slices/dataSlice";

function Facebook() {
  const dispatch = useDispatch();

  const dispatchFacebookData = (response) => {
    dispatch(addFacebookData(response));
  };

  return (
    <div className="button">
      <FacebookLogin
        appId="659826721686533"
        fields="name,email,picture,birthday,gender"
        callback={dispatchFacebookData}
        scope="public_profile, user_birthday, user_gender, email "
        cssClass="facebookButton"
        textButton="LOGIN MET FACEBOOK OM TE STARTEN"
      />
    </div>
  );
}

export default Facebook;
