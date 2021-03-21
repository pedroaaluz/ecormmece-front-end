import React, { useState, useEffect } from "react";
import Routes from './routes';
import './App.css'
import { AppContext } from "./libs/contextLibs";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { onError } from "./libs/errorLibs";


export default  function App() {

  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }
  
    setIsAuthenticating(false);
  }
  const history = useHistory();

  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  async function handleLogout() {
    await Auth.signOut();
  
    userHasAuthenticated(false);
  
    history.push("/login");
  }

  return (
    !isAuthenticating && (
      <>

        <nav className="navbar">
          <a href="/" className="logo">
            MINION
          </a>
          <ul className="nav">
            {isAuthenticated ? (
              <>
                <li >
                  <a onClick={handleLogout} >Sair</a>
                </li>
              </>
            ) : (
                <>
                  <li >
                    <a href="/login">Login</a>
                  </li>
                  <li >
                    <a href="/registro">Registro</a>
                  </li>
                </>
              )}
          </ul>
        </nav>

        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>
      </>)
  );
}

