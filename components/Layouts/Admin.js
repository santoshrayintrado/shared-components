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

import styles from "../../assets/jss/nextjs-material-dashboard/layouts/adminStyle.js";

//import bgImage from "../../assets/img/sidebar-2.jpg";
//import logo from "../../assets/img/logo-retail.png";
import allowedAdminRoutes from './AllowedAdminRoutes'


export default function Admin({children,routes,loginUser,logo, ...rest }) {
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

  
  // const loginDetail = userDetails;
  // console.log(loginDetail)
  //const adminRoutes = routes.map(route => route.admin)
  //const filterRoutes = adminRoutes[0] 
  const allowedRoutes = allowedAdminRoutes.filter(r => router.route.indexOf(r.path) > -1)
  const filterRoutes = routes
   function checkRoute() {
    let isValidRoute = filterRoutes.filter(r => router.route.indexOf(r.layout+r.path) > -1)
    let allowedRoute = allowedAdminRoutes.filter(r => router.route.indexOf(r.path) > -1)
    //if(router.route.indexOf('/login/oauth/callback') > -1) isValidRoute[0]=true
    if(isValidRoute.length===0 && allowedRoute.length===0){
      isValidRoute[0]=false
    }else{
      isValidRoute[0]=true
    } 
    return isValidRoute[0];
  }
   let isvalid = checkRoute();
   console.log('isvalid :'+isvalid +' : Route -->'+router.route)
   
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

  //routes.filter(route => route.roles[0].admin == true)
  //const filterRoutes = routes.map((prop, key) => {console.log(key)})
  
  if(isvalid){
    return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={filterRoutes}
        logoText={''}
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
          allowedRoutes = {allowedAdminRoutes}
          {...rest}
        />
        
          <div className={classes.content}>
            <div className={classes.container}>{children}</div>
          </div>
        
         <Footer />
       
      </div>
    </div>
    )
  }else{
  return (
    <div className={classes.wrapper}>
      <div className={classes.mainPanel} ref={mainPanel}>
          <div className={classes.content}>
            <div className={classes.container}>
              {'Your are not allowed to access this page. '}
              <Link href='/logout'>
                <a>Click here to Login</a>
              </Link>
             </div>
          </div>
         {/* <Footer /> */}
      </div>
    </div>
  );
 }
}
