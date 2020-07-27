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
import { setAsAdmin } from "../redux/actions/userActions";

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
  ccaList: {
    textAlign: "center",
  },
};

class admin extends Component {
  constructor() {
    super();
    this.state = {
      cca: "",
      token: "",
      errors: {},
      ccaList: [],
    };
  }

  componentDidMount() {
    axios
      .get("/cca")
      .then((res) => {
        this.setState({ ccaList: res.data });
      })
      .catch((err) => console.log(err));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      cca: this.state.cca,
      token: this.state.token,
    };
    this.props.setAsAdmin(userData, this.props.history);
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

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { ccaList, errors, cca, token } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={Icon} alt="KEVII Logo" className={classes.image} />
          <Typography variant="h3" className={classes.pageTitle}>
            Admin
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="cca"
              name="cca"
              type="text"
              label="CCA"
              className={classes.textField}
              helperText={errors.cca}
              error={errors.cca ? true : false}
              value={this.state.cca}
              onChange={this.handleChange}
              select
              fullWidth
            >
              {ccaList.length !== 0 ? (
                ccaList.map((ccaName) => (
                  <MenuItem key={ccaName} value={ccaName}>
                    {ccaName}
                  </MenuItem>
                ))
              ) : (
                <Typography variant="body2" className={classes.ccaList}>
                  Loading...
                </Typography>
              )}
            </TextField>
            <TextField
              id="token"
              name="token"
              type="text"
              label="Token"
              className={classes.textField}
              helperText={errors.token}
              error={errors.token ? true : false}
              value={this.state.token}
              onChange={this.handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading || cca === "" || token === ""}
            >
              Become Admin
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
  setAsAdmin,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(admin));
