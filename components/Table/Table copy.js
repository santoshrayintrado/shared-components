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
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function descendingComparator(a, b, orderBy) {
  //console.log(a[orderBy]+' '+b[orderBy]+' '+orderBy)
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  //console.log(order+'  '+orderBy)
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  //console.log(array+'--> array')
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  //console.log(stabilizedThis+'-->stabilizedThis')
  return stabilizedThis.map((el) => el[0]);
}



function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort,headCells,isEdit ,isDelete } = props;
  
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {/* {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : ' sorted ascending'}
                </span>
              ) : null} */}
             
            </TableSortLabel>
          </TableCell>
        ))}
         {(isEdit || isDelete)?
         (
          <TableCell
          key={'actions'}
          align={'right'}
          padding={'default'}
          sortDirection={false}
          >
            {'Actions'}
          </TableCell>
         )
         
         :null
          
          }
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  //numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  //onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function CustomTable({children,...props}) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const useCstyles = makeStyles(cstyles);
  const cClasses = useCstyles();
  const { tableHead, tableData, tableHeaderColor,densed, isEdit ,isDelete } = props;
  //console.log(tableData)
 // console.log(tableHead)
  let head = tableHead.filter(h => h.sort === true)
  //console.log(head[0].id)
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(head[0].id);
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
            <h4 className={cClasses.cardTitleWhite}>Simple Table</h4>
            <p className={cClasses.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
      <TableContainer className={classes.container}>
      <Table className={classes.table} stickyHeader aria-label="sticky table" size={dense ?'small' : 'medium'}>
        {/* {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null} */}
        <EnhancedTableHead
              headCells={tableHead}
              classes={classes}
              //numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              //onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={tableData.length}
              isEdit={isEdit}
              isDelete={isDelete}
            />
        <TableBody >
          {stableSort(tableData, getComparator(order, orderBy))
           .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
           .map((row, index) => {
            return (
              <TableRow key={index} >
                  {tableHead.map((h,key) => {
                    return(
                    <TableCell key={key}>{row[h.id]}</TableCell>
                    )
                  })}
                  {(isEdit || isDelete)?
                  <TableCell >
                     {isEdit?
                      <IconButton/>
                     :
                      <IconButton/>
                     }
                  
                  </TableCell>
                  :null}
                  {/* <TableCell >{row.city}</TableCell>
                  <TableCell >{row.salary}</TableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          colSpan={3}
          SelectProps={{
            inputProps: { 'aria-label': 'rows per page' },
            //native: true,
          }}
          ActionsComponent={TablePaginationActions}

        />
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
