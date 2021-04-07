import React from "react";
import { useRouter } from "next/router";
import Footer from "../Footer/Footer.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/nextjs-material-dashboard/layouts/loginStyle.js";
import { useTranslation } from 'next-i18next'
const  Login = ({ children, ...rest }) => {
  // styles
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const router = useRouter();
  const { i18n } = useTranslation('common')
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();

  const changeLang = (e) => {
    i18n.changeLanguage(e.target.value);
    router.push(router.asPath, router.asPath, { locale: e.target.value })
  };

  var lang = (<select onChange={changeLang} defaultValue={router.locale}>
    {router.locales.map((loc) => {
      return (
        <option key={loc} value={loc}>{loc}</option>
      )
    })
    }
  </select>
  )

  return (
    <div className={classes.wrapper}>
      <div >
        {'Change language :'}{lang}
      </div>
      <div className={classes.mainPanel} ref={mainPanel}>
        <div className={classes.content}>
          <div className={classes.container}>{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );

}

export default  Login