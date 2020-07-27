// import React, { Component, Fragment } from "react";
// import axios from "axios";

// // Redux
// import { connect } from "react-redux";
// import { getPendingRequest } from "../redux/actions/ccaActions";
// import {
//   Collapse,
//   List,
//   ListItem,
//   Paper,
//   Typography,
//   Card,
//   CardActionArea,
//   Button,
// } from "@material-ui/core";
// import Check from "@material-ui/icons/Check";

// class Request extends Component {
//   constructor() {
//     super();
//     this.state = {
//       pendingRequest: [],
//       collapse: false,
//     };
//   }

//   componentDidMount() {
//     axios
//       .get("/request")
//       .then((res) => {
//         this.setState({ pendingRequest: res.data });
//       })
//       .catch((err) => console.log(err));
//   }

//   handleClick = (studentCard) => {
//     axios
//       .post("/cca/accept", { studentCard })
//       .then((res) => {
//         this.props.history.push("/cca");
//       })
//       .catch((err) => console.log(err));
//   };

//   render() {
//     const { pendingRequest, collapse } = this.state;
//     const handleClick = () => {
//       this.setState({ collapse: !collapse });
//     };
//     return (
//       <Fragment>
//         <Card button onClick={handleClick}>
//           <CardActionArea>
//             <Typography variant="h6">Pending Request</Typography>
//           </CardActionArea>
//         </Card>
//         <Collapse in={collapse} timeout="auto" unmountOnExit>
//           <Paper>
//             <List>
//               {pendingRequest.map((studentCard) => (
//                 <ListItem key={studentCard}>
//                   <Button
//                     name="acceptRequest"
//                     value={studentCard}
//                     onClick={() => this.handleClick(studentCard)}
//                   >
//                     <Check />
//                   </Button>
//                   {studentCard}
//                 </ListItem>
//               ))}
//             </List>
//           </Paper>
//         </Collapse>
//       </Fragment>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   pendingRequest: state.cca.pendingRequest,
// });

// const mapActionsToProps = {
//   getPendingRequest,
// };

// export default connect(mapStateToProps, mapActionsToProps)(Request);
