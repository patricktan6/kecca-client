import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import jwtDecode from "jwt-decode";
import axios from "axios";
import PrivateRoute from "./util/PrivateRoute";

// Pages
import Home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import admin from "./pages/admin";
import join from "./pages/join";
import cca from "./pages/cca";

// Components
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute";

// Material-UI
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { blue } from "@material-ui/core/colors";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: blue,
  },
  typography: {
    useNextVariants: true,
  },
});

const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
              <PrivateRoute exact path="/admin" component={admin} />
              <PrivateRoute exact path="/join" component={join} />
              <PrivateRoute exact path="/cca" component={cca} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
