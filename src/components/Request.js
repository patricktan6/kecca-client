import React, { Component, Fragment } from "react";
import axios from "axios";

// Redux
import { connect } from "react-redux";
import {
  getPendingRequest,
  acceptRequest,
  declineRequest,
} from "../redux/actions/ccaActions";

// Material-UI
import {
  Collapse,
  List,
  ListItem,
  Paper,
  Typography,
  Card,
  CardActionArea,
  Button,
  Tooltip,
} from "@material-ui/core";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";

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
    const { collapse } = this.state;
    const {
      pendingRequest,
      loading,
      UI: { loading: uiLoading },
    } = this.props;
    const handleClick = () => {
      this.setState({ collapse: !collapse });
    };
    return (
      <Fragment>
        <Card button onClick={handleClick}>
          <CardActionArea>
            <Typography variant="h6">Pending Request</Typography>
          </CardActionArea>
        </Card>
        <Collapse in={collapse} timeout="auto" unmountOnExit>
          <Paper>
            {loading ? (
              <Typography variant="body2">Loading...</Typography>
            ) : pendingRequest ? (
              <List>
                {pendingRequest.map((studentCard) => (
                  <ListItem key={studentCard}>
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
                    {studentCard}
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

export default connect(mapStateToProps, mapActionsToProps)(Request);
