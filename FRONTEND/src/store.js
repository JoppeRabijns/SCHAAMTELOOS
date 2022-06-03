import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slices/dataSlice";
import callReducer from "./slices/callSlice";
import socketReducer from "./slices/socketSlice";
import videoReducer from "./slices/videoSlice";
import menuReducer from "./slices/menuSlice";

export default configureStore(
  {
    reducer: {
      data: dataReducer,
      call: callReducer,
      socket: socketReducer,
      video: videoReducer,
      menu: menuReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
