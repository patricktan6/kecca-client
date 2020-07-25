import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Redux
import { connect } from "react-redux";

// Material-UI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import { Paper, Typography } from "@material-ui/core";

const styles = {
  paper: {
    padding: 20,
  },
};

class Profile extends Component {
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

export default connect(mapStateToProps)(withStyles(styles)(Profile));
