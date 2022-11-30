import "../style/main.scss";
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route,useParams} from "react-router-dom";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
// import { FortAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSignOutAlt,faEdit,faSpinner } from "@fortawesome/free-solid-svg-icons";

import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import BlogDetail from "./pages/blog-detail";
import PortfolioDetail from "./portfolio/portfolio-detail";
import PortfolioManager from "./portfolio/portfolio-manager";
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match";

library.add(faTrash,faSignOutAlt ,faEdit,faSpinner)


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleASuccessfulLogout =this.handleASuccessfulLogout.bind(this);
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN",
    });
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
    });
  }

  handleASuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
    });
  }


  checkLoginStatus() {
    return axios
      .get("https://api.devcamp.space/logged_in", { withCredentials: true })
      .then((response) => {
        const loggedIn = response.data.logged_in;
        const loggedInStatus = this.state.loggedInStatus;

        if (loggedIn && loggedInStatus === "LOGGED_IN") {
          return loggedIn;
        } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
          this.setState({ loggedInStatus: "LOGGED_IN" });
        } else if (!loggedIn && loggedInStatus === "LOGGIN_IN") {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
          });
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }



  authorizedPage() {  
    return [ <Route key="portfolio-manager" path="/portfolio-manager" element={<PortfolioManager />} />];
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <NavigationContainer 
              loggedInStatus={this.state.loggedInStatus} 
              handleASuccessfulLogout={this.handleSuccessfulLogout}
            />

            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route
                path="/auth"
                element={
                  <Auth
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                  />
                }
              />
              <Route path="/about-me" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/b/:slug" element={<BlogDetail/>} />
              {this.state.loggedInStatus === "LOGGED_IN"
                ? this.authorizedPage()
                : null}
              <Route
                exact path="/portfolio/:slug"
                element={<PortfolioDetail />}
              />
             
              <Route path="/:slug" element={<NoMatch />} />
            </Routes>
          </div>
        </Router>
      </div>
    );
  }
}
