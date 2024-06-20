import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  CircularProgress,
  Container,
  Box,
  TextField,
  InputAdornment
} from "@material-ui/core";
import GroupIcon from "@material-ui/icons/Group";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(4),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  table: {
    minWidth: 650,
  },
  tableContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
  },
  searchField: {
    marginBottom: theme.spacing(3),
  },
  link: {
    color: theme.palette.text.secondary,
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.text.primary,
    },
  },
}));

export default function EmployeeDirectory() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/employee");
      const body = await response.json();
      setData(body);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const filteredData = data.filter((employee) =>
    Object.values(employee).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Box className={classes.header}>
        <Avatar className={classes.avatar}>
          <GroupIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h4" gutterBottom>
          Employee Directory
        </Typography>
      </Box>

      <TextField
        className={classes.searchField}
        variant="outlined"
        fullWidth
        placeholder="Search employees..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="employee table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Department</TableCell>
                <TableCell align="center">Gender</TableCell>
                <TableCell align="center">Date of Birth</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.department}</TableCell>
                  <TableCell align="center">{row.gender}</TableCell>
                  <TableCell align="center">{row.dob}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box mt={3}>
        <Link to="/" className={classes.link}>
          <Typography variant="body1">
            &#x2190; Head back to save data
          </Typography>
        </Link>
      </Box>
    </Container>
  );
}