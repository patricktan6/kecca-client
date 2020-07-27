import React, { Component } from "react";
import Icon from "../images/logo.png";
import axios from "axios";

// Material-UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import MenuItem from "@material-ui/core/MenuItem";

// Redux
import { connect } from "react-redux";
import { joinCCA, getAllCCA } from "../redux/actions/userActions";

const styles = {
  form: {
    textAlign: "center",
  },
  image: {
    margin: "20px auto 20px auto",
  },
  pageTitle: {
    margin: "10px auto 10px auto",
  },
  textField: {
    margin: "5px auto 10px auto",
  },
  button: {
    marginTop: 20,
    position: "relative",
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10,
  },
  progress: {
    position: "absolute",
  },
};

class join extends Component {
  constructor() {
    super();
    this.state = {
      cca: "",
      studentCard: "",
      ccaList: [],
      errors: {},
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      cca: this.state.cca,
      studentCard: this.state.studentCard,
    };
    this.props.joinCCA(userData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  componentDidMount() {
    axios
      .get("/cca")
      .then((res) => {
        this.setState({ ccaList: res.data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const {
      classes,
      UI: { loading },
      user: { studentCard },
    } = this.props;
    const { errors, ccaList } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={Icon} alt="KEVII Logo" className={classes.image} />
          <Typography variant="h3" className={classes.pageTitle}>
            Join CCA
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="cca"
              name="cca"
              type="text"
              label="CCA Name"
              className={classes.textField}
              helperText={errors.cca}
              error={errors.cca ? true : false}
              value={this.state.cca}
              onChange={this.handleChange}
              select
              fullWidth
            >
              {ccaList.map((ccaName) => (
                <MenuItem key={ccaName} value={ccaName}>
                  {ccaName}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="studentCard"
              name="studentCard"
              type="text"
              label="Student Card"
              className={classes.textField}
              helperText={errors.studentCard}
              error={errors.studentCard ? true : false}
              value={this.state.studentCard}
              onChange={this.handleChange}
              select
              fullWidth
            >
              <MenuItem value={studentCard}>{studentCard}</MenuItem>
            </TextField>
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Send Join Request
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  joinCCA,
  getAllCCA,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(join));
