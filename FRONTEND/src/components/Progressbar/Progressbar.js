import("./Progressbar.scss");

function Progressbar() {
  return (
    <div className="progressBarContainer">
      <h6 className="loadingText">UW VIDEO WORDT GELADEN...</h6>
      <div className="progressBar"></div>
    </div>
  );
}

export default Progressbar;
