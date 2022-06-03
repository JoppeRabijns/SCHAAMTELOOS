import("./Progressbar.scss");

function Progressbar(props) {
  let scaleprogress = props.progress / 100;
  return (
    <div className="progressBarContainer">
      <div
        className="progressBar"
        style={{ transform: `scale(${scaleprogress}, 1)`, opacity: 1 }}
      >
        {/*   <h6 className="progressNumber">{props.progress}%</h6> */}
      </div>
    </div>
  );
}

export default Progressbar;
