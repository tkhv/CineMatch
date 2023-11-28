import React from "react";

type UserContextType = {
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
};

export const UserContext = React.createContext<UserContextType | null>(null);
