import socketio from "socket.io-client";
import React from "react";
//https://floating-everglades-75335.herokuapp.com/
const ENDPOINT = `${import.meta.env.VITE_API_URL}/`;
export const socket = socketio(ENDPOINT);
export const SocketContext = React.createContext();