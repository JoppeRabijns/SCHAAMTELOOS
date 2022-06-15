import "./PrivacyPolicy.scss";
import { useDispatch } from "react-redux";
import { setPrivacyPolicyFalse } from "../../slices/menuSlice";
import { X } from "react-feather";

function PrivacyPolicy() {
  const dispatch = useDispatch();

  return (
    <div className="PrivacyPolicy">
      <div className="PrivacyPolicyDiv">
        <button onClick={() => dispatch(setPrivacyPolicyFalse())}>
          <X size={30} />
        </button>
        <h2>Privacy Policy</h2>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
