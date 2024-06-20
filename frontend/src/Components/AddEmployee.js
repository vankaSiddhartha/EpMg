import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import GroupIcon from "@material-ui/icons/Group";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

// Custom colors: You can change these values to your desired colors
const primaryColor = "#3f51b5"; // Blue
const secondaryColor = "#f50057"; // Pink
const backgroundColor = "#e0f7fa"; // Light cyan
const textColor = "#004d40"; // Teal

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: backgroundColor, // Custom background color
    padding: theme.spacing(3), // Add padding to separate from the container edges
    borderRadius: theme.shape.borderRadius, // Optional: add rounded corners
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: secondaryColor // Custom secondary color
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: primaryColor, // Custom primary color
    color: "#ffffff", // White text on the button
    "&:hover": {
      backgroundColor: "#303f9f" // Darker blue for hover state
    }
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
    color: textColor, // Custom text color
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: primaryColor // Custom border color
      },
      "&:hover fieldset": {
        borderColor: secondaryColor // Custom hover border color
      },
      "&.Mui-focused fieldset": {
        borderColor: secondaryColor // Custom focused border color
      }
    }
  },
  link: {
    color: primaryColor, // Custom link color
    textDecoration: "none",
    "&:hover": {
      color: secondaryColor, // Custom hover color for links
      textDecoration: "underline"
    }
  }
}));

export default function AddEmployee() {
  const classes = useStyles();
  const [firstLoad, setLoad] = React.useState(true);

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("1998-04-02T21:11:54")
  );
  const [name, setName] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [gender, setGender] = React.useState("");

  const handleDateChange = date => setSelectedDate(date.target.value);
  const handleNameChange = event => setName(event.target.value);
  const handleDepartmentChange = event => setDepartment(event.target.value);
  const handleGenderChange = event => setGender(event.target.value);

  const [message, setMessage] = React.useState("Nothing saved in the session");

  async function sampleFunc(toInput) {
    const response = await fetch("/api/employee", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
      body: JSON.stringify(toInput) // body data type must match "Content-Type" header
    });
    let body = await response.json();
    console.log(body.id);
    setMessage(body.id ? "Data successfully updated" : "Data updation failed");
  }

  const handleSubmit = variables => {
    const toInput = { name, department, gender, dob: selectedDate };
    sampleFunc(toInput);
    setName("");
    setDepartment("");
    setGender("");
  };

  if (firstLoad) {
    // sampleFunc();
    setLoad(false);
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <GroupIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Employee Directory
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                value={name}
                label="Name"
                name="name"
                autoComplete="name"
                onChange={handleNameChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="department"
                name="department"
                variant="outlined"
                required
                fullWidth
                value={department}
                id="department"
                label="Department"
                onChange={handlDepartmentChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="gender"
                value={gender}
                label="Gender"
                name="gender"
                autoComplete="gender"
                onChange={handleGenderChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="date"
                label="Date of birth"
                type="date"
                defaultValue="1998-04-02"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                onChange={handleDateChange}
              />
            </Grid>
          </Grid>
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            preventDefault
            className={classes.submit}
            onClick={handleSubmit}
          >
            Save
          </Button>

          <Grid container justify="center">
            <Grid item>
              <Link to="/view">View Employee Records</Link>
            </Grid>
          </Grid>
        </form>
        <Typography style={{ margin: 7 }} variant="body1">
          Status: {message}
        </Typography>
      </div>
    </Container>
  );
}
