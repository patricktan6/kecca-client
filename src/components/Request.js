import React, { Component, Fragment } from "react";

// Redux
import { connect } from "react-redux";
import {
  getPendingRequest,
  acceptRequest,
  declineRequest,
} from "../redux/actions/ccaActions";

// Material-UI
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Collapse,
  List,
  ListItem,
  Paper,
  Typography,
  Card,
  CardActions,
  Button,
  Tooltip,
} from "@material-ui/core";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import transitions from "@material-ui/core/styles/transitions";

const styles = {
  root: {
    textAlign: "center",
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: transitions.create('transform', {
      duration: transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
};

class Request extends Component {

  constructor() {
    super();
    this.state = {
      collapse: false,
    };
  }

  handleAccept = (studentCard) => {
    this.props.acceptRequest(studentCard);
  };

  handleDecline = (studentCard) => {
    this.props.declineRequest(studentCard);
  };

  render() {
    const {
      classes,
      pendingRequest,
      loading,
      UI: { loading: uiLoading },
    } = this.props;
    const { collapse } = this.state;
    const handleClick = () => {
      this.setState({ collapse: !collapse });
    };
    return (
      <Fragment>
        <Card className={classes.root}>
          <CardActions>
            <Typography variant="button">Pending Requests</Typography>
            <IconButton
              className={!collapse ? classes.expand : classes.expandOpen}
              onClick={handleClick}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        </Card>
        <Collapse in={collapse} timeout="auto" unmountOnExit>
          <Paper>
            {loading ? (
              <Typography variant="body2">Loading...</Typography>
            ) : pendingRequest.length !== 0 ? (
              <List>
                {pendingRequest.map((studentCard) => (
                  <ListItem key={studentCard}>
                    {studentCard}
                    <Tooltip title="Accept" placement="top">
                      <Button
                        onClick={() => this.handleAccept(studentCard)}
                        disabled={uiLoading}
                      >
                        <Check />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Decline" placement="top">
                      <Button
                        onClick={() => this.handleDecline(studentCard)}
                        disabled={uiLoading}
                      >
                        <Clear />
                      </Button>
                    </Tooltip>
                    <Typography varian="body2">{studentCard}</Typography>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2">No Request</Typography>
            )}
          </Paper>
        </Collapse>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  pendingRequest: state.cca.pendingRequest,
  loading: state.cca.loading,
  UI: state.UI,
});

const mapActionsToProps = {
  getPendingRequest,
  acceptRequest,
  declineRequest,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Request));
