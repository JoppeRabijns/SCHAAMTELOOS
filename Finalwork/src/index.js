import ReactDOM from "react-dom/client";
import "./style.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Video from "./pages/Video";
import Login from "./pages/Home/Login";
import Loading from "./pages/Loading/Loading";
import { BrowserView, MobileView } from "react-device-detect";

//REDUX
import { Provider } from "react-redux";
import store from "./store";

//SOCKET
import Socket from "./components/Socket/Socket";
//CURSOR
import AnimatedCursor from "react-animated-cursor";
import AuthRouter from "./components/AuthRouter/AuthRouter";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <Provider store={store}>
      <BrowserView>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/loading"
              element={<AuthRouter route={<Loading />} />}
            />
            <Route path="/video" element={<AuthRouter route={<Video />} />} />
            <Route path="*" element={<Navigate to="/" />}></Route>
          </Routes>
        </BrowserRouter>
        <AnimatedCursor
          innerSize={12}
          outerSize={12}
          color="255, 255, 255"
          outerAlpha={0.2}
          innerScale={0.7}
          outerScale={5}
          hasBlendMode={true}
          outerStyle={{
            mixBlendMode: "exclusion",
          }}
          clickables={[
            "a",
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            "label[for]",
            "select",
            "textarea",
            "button",
            ".link",
            ".cursor",
          ]}
        />
        <Socket />
      </BrowserView>
    </Provider>
    <MobileView>
      <h1 className="mobileBlock">
        Gelieve de website te bezoeken op een desktop!
      </h1>
    </MobileView>
  </>
);
