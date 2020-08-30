import React, {createContext, useState, useEffect} from "react";
import AuthService from "./AuthService";

export const AuthContext = createContext();

export default ({children}) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AuthService.isAuthenticated().then((data) => {
      console.log(data);
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
    });
  }, []);
  console.log(isLoaded);
  //if is loaded is not true render loading thingy
  return (
    <div>
      {!isLoaded ? (
        <h1>Loading</h1>
      ) : (
        <AuthContext.Provider
          value={{user, setUser, isAuthenticated, setIsAuthenticated}}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};
