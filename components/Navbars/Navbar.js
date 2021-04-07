import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
import Link from "next/link"
// core components
import AdminNavbarLinks from "./AdminNavbarLinks.js";

import Button from "../CustomButtons/Button.js";

import styles from "../../assets/jss/nextjs-material-dashboard/components/headerStyle.js";
import { useTranslation } from 'next-i18next'
export default function Navbar(props) {
  // used for checking current route
  const router = useRouter();
  // create styles for this component
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { t,i18n } = useTranslation('common')
  let defaultLocale = router.locale
  
  const handleChange = (e) => {
    let locale = e.target.value
    console.log(" default locale :"+defaultLocale)
    console.log(" locale :"+locale)
    let path = router.asPath
    return {redirect: {
          destination: path,
          locale: locale,
          permanent: false,
        },
      }
  }
  function makeBrand() {
    var name = "Dashboard";
    props.routes.map((prop) => {
      if (router.route.indexOf(prop.layout + prop.path) !== -1) {
        name =  prop.name;
      }
      return null;
    });
    props.allowedRoutes.map((prop) => {
      if (router.route.indexOf(prop.path) !== -1) {
        name =  prop.name;
      }
      return null;
    });
    return t(name);
  }
  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color,
  });
  
  const changeLang = (e) => {
    i18n.changeLanguage(e.target.value);
    router.push(router.asPath,router.asPath,{locale:e.target.value})
   };

     var lang =(  <select onChange={changeLang} defaultValue={router.locale}>
                {router.locales.map((loc) => {
                  return (
                    <option key={loc} value={loc}>{loc}</option>
                  )
                })
              }
              </select>
     )
 
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button color="transparent" href="#" className={classes.title}>
            {makeBrand()}
          </Button>
          
         
            {'Change Language :'}{lang}
            
        </div>
        <Hidden smDown implementation="css">
          {/* {<AdminNavbarLinks />} */}
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
};
