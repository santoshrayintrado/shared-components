import React from "react";
import { useRouter } from "next/router";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "../Navbars/Navbar.js";
import Footer from "../Footer/Footer.js";
import Sidebar from "../Sidebar/Sidebar.js";
//import FixedPlugin from "../components/FixedPlugin/FixedPlugin.js";
import Link from "next/link";
//import routes from "routes.js";

import styles from "../../assets/jss/nextjs-material-dashboard/layouts/adminStyle.js";

//import bgImage from "assets/img/sidebar-2.jpg";
import logo from "../../assets/img/logo-retail.png";
import { destroySession } from "next-server-session";

export default function Customer({ children, routes, loginUser, ...rest }) {
  // used for checking current route
  const router = useRouter();
  // styles
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState();
  const [color, setColor] = React.useState("white");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // {people.filter(person => person.age < 60).map(filteredPerson => (
  //   <li>
  //     {filteredPerson.name}
  //   </li>
  // ))}

  const filterRoutes = routes;

  function checkRoute() {
    //return router.route.indexOf(r.layout+r.path) > -1?true:false
    //isValidRoute = adminRoutes.filter(r => router.route.indexOf(r.layout+r.path) > -1).map(r1 => { return r1.roles[0].admin })
    let isValidRoute;
    isValidRoute = filterRoutes.filter(
      (r) => router.route.indexOf(r.layout + r.path) > -1
    );
    if (router.route.indexOf("/login/oauth/callback") > -1)
      isValidRoute[0] = true;
    if (isValidRoute.length === 0) {
      isValidRoute[0] = false;
    } else {
      isValidRoute[0] = true;
    }
    console.log("isValidRoute :" + isValidRoute);
    return isValidRoute[0];
  }
  let isvalid = checkRoute();
  console.log("isvalid :" + isvalid + " : Route -->" + router.route);

  const handleImageClick = (image) => {
    setImage(image);
  };
  const handleColorClick = (color) => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };

  //const filterRoutes = routes.filter(route => route.roles[0].customer == true)

  if (isvalid) {
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={filterRoutes}
          logoText={""}
          logo={logo}
          image={image}
          handleDrawerToggle={handleDrawerToggle}
          open={mobileOpen}
          color={color}
          {...rest}
        />
        <div className={classes.mainPanel} ref={mainPanel}>
          <Navbar
            routes={filterRoutes}
            handleDrawerToggle={handleDrawerToggle}
            {...rest}
          />

          <div className={classes.content}>
            <div className={classes.container}>{children}</div>
          </div>

          <Footer />
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.wrapper}>
        <div className={classes.mainPanel} ref={mainPanel}>
          <div className={classes.content}>
            <div className={classes.container}>
              {
                <>
                  {"Your are not allowed to access this page. "}
                  <Link href='/login/logout'>
                    <a>Click here to Login</a>
                  </Link>
                </>
              }
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    );
  }
}
