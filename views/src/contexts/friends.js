// user context 
import * as React from "react";
import { useState } from "react";

const FriendContext = React.createContext();
function FriendProvider({ children }) {
  const [friends, setFriends] = useState([]);
  return (
    <FriendContext.Provider value={[friends, setFriends]}>
      {children}
    </FriendContext.Provider>
  );
}

export { FriendProvider, FriendContext };