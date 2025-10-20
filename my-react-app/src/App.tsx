// src/App.tsx
import React from "react";
import {UserContextProvider} from './typeScript/miniUserListApp/contexts/userContext.js'
import { UserDropdown } from "./typeScript/miniUserListApp/components/UserDropdown.js";
import { Profile } from "./typeScript/miniUserListApp/components/Profile.js";

function App() {
  return (
    <UserContextProvider>
      <div style={{ padding: "20px" }}>
        <h1>👩‍💻 User Selector</h1>
        <UserDropdown />
        <Profile />
      </div>
    </UserContextProvider>
  );
}

export default App;
