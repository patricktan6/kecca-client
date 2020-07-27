import React, { Component, Fragment } from "react";
import axios from "axios";

// Redux
import { connect } from "react-redux";
import { getPendingRequest } from "../redux/actions/ccaActions";

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
    axios
      .post("/cca/accept", { studentCard })
      .then((res) => {
        this.props.getPendingRequest();
      })
      .catch((err) => console.log(err));
  };

  handleDecline = (studentCard) => {
    axios
      .post("/cca/decline", { studentCard })
      .then((res) => {
        this.props.getPendingRequest();
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { collapse } = this.state;
    const { pendingRequest } = this.props;
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
            <List>
              {pendingRequest.map((studentCard) => (
                <ListItem key={studentCard}>
                  <Tooltip title="Accept" placement="top">
                    <Button onClick={() => this.handleAccept(studentCard)}>
                      <Check />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Decline" placement="top">
                    <Button onClick={() => this.handleDecline(studentCard)}>
                      <Clear />
                    </Button>
                  </Tooltip>

                  {studentCard}
                </ListItem>
              ))}
            </List>
          </Paper>
        </Collapse>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  pendingRequest: state.cca.pendingRequest,
});

const mapActionsToProps = {
  getPendingRequest,
};

export default connect(mapStateToProps, mapActionsToProps)(Request);
