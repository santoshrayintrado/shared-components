import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles ,useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Checkbox from '@material-ui/core/Checkbox';
//import IconButton from '@material-ui/core/IconButton';
import GridItem from "../Grid/GridItem.js";
import GridContainer from "../Grid/GridContainer.js";
//import Table from "../Table/Table.js";
import Card from "../Card/Card.js";
import CardHeader from "../Card/CardHeader.js";
import CardBody from "../Card/CardBody.js";
// core components
import styles from "../../assets/jss/nextjs-material-dashboard/components/tableStyle.js";
import cstyles from "../../assets/jss/nextjs-material-dashboard/components/cardStyle.js";




export default function CustomTable({children,...props}) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const useCstyles = makeStyles(cstyles);
  const cClasses = useCstyles();
  const { tableHead, tableData, tableHeaderColor,densed, title, desc } = props;
  //console.log(tableData)
 // console.log(tableHead)
  //let head = tableHead.filter(h => h.sort === true)
  //console.log(head[0].id)
  const [order, setOrder] = React.useState('asc');
  //const [orderBy, setOrderBy] = React.useState(head[0].id);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(densed);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    //console.log(property+ '-->property-->orderBy--'+orderBy)
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div className={classes.tableResponsive}>
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={cClasses.cardTitleWhite}>{title}</h4>
            <p className={cClasses.cardCategoryWhite}>
              {desc}
            </p>
          </CardHeader>
          <CardBody>
            {/* className={classes.container} */}
          <TableContainer  >
            {children}
          </TableContainer>
      
          </CardBody>
        </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
};
