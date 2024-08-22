// room context 
import * as React from "react";
import { useState } from "react";

const RoomContext = React.createContext();
function RoomProvider({ children }) {
  const [room, setRoom] = useState('');
  return (
    <RoomContext.Provider value={[room, setRoom]}>
      {children}
    </RoomContext.Provider>
  );
}

export { RoomProvider, RoomContext };