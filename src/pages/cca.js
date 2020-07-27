import React, { Component, Fragment } from "react";
import axios from "axios";

// Components
import Event from "../components/Event";
import Profile from "../components/Profile";
import Request from "../components/Request";

// Material-UI
import Grid from "@material-ui/core/Grid";

// Redux
import { connect } from "react-redux";
import { getPendingRequest, getCCADetails } from "../redux/actions/ccaActions";
import {
  Card,
  CardActionArea,
  Typography,
  Collapse,
  Paper,
  List,
  ListItem,
} from "@material-ui/core";

class cca extends Component {
  constructor() {
    super();
    this.state = {
      events: null,
      collapse: false,
    };
  }

  componentDidMount() {
    axios
      .get("/event/cca")
      .then((res) => {
        this.setState({
          events: res.data,
        });
      })
      .catch((err) => console.log(err));

    this.props.getPendingRequest();
    this.props.getCCADetails();
  }

  render() {
    let eventsMarkup = this.state.events ? (
      this.state.events.map((event) => (
        <Event key={event.eventId} event={event} />
      ))
    ) : (
      <p>Loading... </p>
    );

    const {
      cca: { listOfMembers, loading },
    } = this.props;
    const { collapse } = this.state;
    const handleClick = () => {
      this.setState({ collapse: !collapse });
    };

    return (
      <Fragment>
        <Grid container spacing={3} direction="row">
          <Grid item sm={3} xs={12}>
            <Profile />
            <Request />
            <Fragment>
              <Card button onClick={handleClick}>
                <CardActionArea>
                  <Typography variant="h6">Members</Typography>
                </CardActionArea>
              </Card>
              <Collapse in={collapse} timeout="auto" unmountOnExit>
                <Paper>
                  {loading ? (
                    <Typography variant="body2">Loading...</Typography>
                  ) : listOfMembers ? (
                    <List>
                      {listOfMembers.map((studentCard) => (
                        <ListItem key={studentCard}>
                          <Typography variant="body2">{studentCard}</Typography>
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body2">No Members</Typography>
                  )}
                </Paper>
              </Collapse>
            </Fragment>
          </Grid>
          <Grid item sm={8} xs={12}>
            {eventsMarkup}
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  cca: state.cca,
});

const mapActionsToProps = {
  getPendingRequest,
  getCCADetails,
};

export default connect(mapStateToProps, mapActionsToProps)(cca);
