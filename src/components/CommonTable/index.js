import { useEffect, useMemo, useState } from "react";
import { filter } from "lodash";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import Scrollbar from "../Scrollbar";
import SearchNotFound from "../SearchNotFound";
import ListHead from "./ListHead";
import ListToolbar from "./ListToolbar";
import { Box } from "@mui/system";

export default function CommonTable(props) {
  const {
    tableTitle,
    filterCol,
    tableHead,
    list,
    RowItem,
    loading,
    disablePagination,
    api,
  } = props;

  const { paginationState } = api;

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("");
  const [filterName, setFilterName] = useState(filterCol || "");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (paginationState && !disablePagination) {
      setPage(paginationState.page - 1);
      setRowsPerPage(paginationState.limit);
    }
  }, [paginationState]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = list.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    api.paginatedFetch(rowsPerPage, newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    api.paginatedFetch(parseInt(event.target.value, 10), 1);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - list.length) : 0;

  const filteredList = applySortFilter(
    list,
    getComparator(order, orderBy),
    filterName,
  );

  const isNotFound = filteredList.length === 0;

  const showHead = [].includes(tableTitle);

  const paginatedList = disablePagination ? filteredList : filteredList;

  return (
    <>
      {showHead && (
        <ListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
      )}
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <ListHead
              order={order}
              orderBy={orderBy}
              headLabel={tableHead}
              rowCount={list.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {loading && (
                <TableRow style={{ height: 300 }}>
                  <TableCell colSpan={tableHead.length}>
                    <Box w="100%" display="flex" justifyContent="center">
                      <CircularProgress />
                    </Box>
                  </TableCell>
                </TableRow>
              )}
              {!loading &&
                paginatedList.map((row, index) => (
                  <RowItem
                    key={row._id || String(index)}
                    selected={selected}
                    row={row}
                    index={index + (page + 1) * rowsPerPage - (rowsPerPage - 1)}
                  />
                ))}
              {/* {!loading && emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>

            {!loading && isNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound
                      searchQuery={filterName || tableTitle || ""}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>
      {!disablePagination && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={paginationState ? paginationState.totalResults : list.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  );
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_item) => _item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1,
    );
  }
  return stabilizedThis.map((el) => el[0]);
}
