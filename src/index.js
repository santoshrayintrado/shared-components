import React from 'react'
import nextjsMaterialDashboard from '../assets/css/nextjs-material-dashboard.css'
import {
  AdminLayout,
  SignLayout,
  TwoFALogin,
  LoginLayout
} from '../components/Layouts'

import {
    Card,
    CardAvatar,
    CardBody,
    CardFooter,
    CardHeader,
    CardIcon
} from '../components/Card'
import apolloclient from '../util/apolloclient'
import PageChange from "../components/PageChange/PageChange";
import RegularButton from '../components/CustomButtons/Button'
import CustomInput from '../components/CustomInput/CustomInput'
import CustomTabs from '../components/CustomTabs/CustomTabs'
import Footer from '../components/Footer/Footer'
import GridContainer from '../components/Grid/GridContainer'
import GridItem from '../components/Grid/GridItem'
import useWindowSize from '../components/Hooks/useWindowSize'
import PhoneField from '../components/PhoneField/PhoneField'
import CustomTable from '../components/Table/Table'
import AdminNavbarLinks from '../components/Navbars/AdminNavbarLinks'
import Navbar from '../components/Navbars/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'

export{
  AdminLayout,
  SignLayout,
  TwoFALogin,
  LoginLayout,
  apolloclient,
  PageChange,
  Card,
  CardAvatar,
  CardBody,
  CardFooter,
  CardHeader,
  CardIcon,
  RegularButton,
  CustomInput,
  CustomTabs,
  Footer,
  GridContainer,
  GridItem,
  useWindowSize,
  PhoneField,
  CustomTable,
  AdminNavbarLinks,
  Navbar,
  Sidebar,
  nextjsMaterialDashboard
}