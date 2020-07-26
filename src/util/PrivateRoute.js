import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import { connect } from "react-redux";

class PrivateRoute extends Component {

    render() {
        const { authenticated, component: RouteComponent, ...rest } = this.props;

        return (
            <Route
                {...rest}
                render = {routeProps =>
                    authenticated ? (
                        <RouteComponent {...routeProps} />
                    ) : (
                        <Redirect to={'/login'} />
                    )
                }
            />
        );
    }
}

PrivateRoute.propTypes = {
    authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(PrivateRoute);