import { useEffect } from "react";
import openSocket from "socket.io-client";
import { useDispatch } from "react-redux";
import { changeStatus } from "../../slices/callSlice";
import { addSocketId } from "../../slices/socketSlice";
import { setRenderProgress } from "../../slices/videoSlice";

const socket = openSocket("https://schaamteloos.herokuapp.com/", {
  transports: ["websocket"],
});

function Socket() {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("call progress event", (call) => {
      console.log(call.to, call.callStatus);
      if (call.to) {
        dispatch(changeStatus(call.callStatus));
      }
    });

    socket.on("render progress", (percents) => {
      dispatch(setRenderProgress(percents));
    });

    socket.on("connect", () => {
      dispatch(addSocketId(socket.id));
    });
  });
}

export default Socket;
