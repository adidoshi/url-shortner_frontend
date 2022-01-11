import { ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Account from "./components/auth/Account";
import theme from "./components/theme";
import VerifyEmail from "./components/VerifyEmail";
import PrivateRoutes from "./components/PrivateRoutes";
import ResetPass from "./components/auth/ResetPass";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/verifyEmail" component={VerifyEmail}></Route>
        <Route exact path="/resetPass/:token">
          <ResetPass />
        </Route>
        <PrivateRoutes
          exact
          path="/account"
          component={Account}></PrivateRoutes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
