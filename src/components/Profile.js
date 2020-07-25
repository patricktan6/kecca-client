import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";

// Material-UI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

// Icon
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

const styles = {
  paper: {
    padding: 20,
  },
};

class Profile extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      classes,
      user: {
        authenticated,
        loading,
        name,
        studentCard,
        ccaParticipated,
        adminStatus: { cca, tokenHeader },
      },
    } = this.props;
    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <Typography variant="h5">{name}</Typography>
          <Typography>{studentCard}</Typography>
          <Typography>{ccaParticipated}</Typography>
          <Typography>
            {cca}
            {tokenHeader}
          </Typography>
          <Tooltip title="Logout" placement="top">
            <IconButton onClick={this.handleLogout}>
              <KeyboardReturn color="primary" />
            </IconButton>
          </Tooltip>
        </Paper>
      ) : (
        <Redirect to="/login" />
      )
    ) : (
      <p>Loading...</p>
    );

    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { logoutUser };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
