import React from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {
    ErrorsContext,
    DispatchContext,
    RequestsContext,
} from '../../helpers/contexts'

// Component
function AppHigherOrder(WrappedComponent) {
    // Higher order component
    class AppHigherOrderClass extends React.Component {

        render() {
            // All store
            const {requests, errors, dispatch} = this.props;

            return (
                <ErrorsContext.Provider value={errors}>
                    <RequestsContext.Provider value={requests}>
                        <DispatchContext.Provider value={dispatch}>
                            <WrappedComponent />
                        </DispatchContext.Provider>
                    </RequestsContext.Provider>
                </ErrorsContext.Provider>
            )
        }
    }

    // Prop types to ensure destroyed props data type
    AppHigherOrderClass.propTypes = {
        errors: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        requests: PropTypes.object.isRequired,
    };

    // Map state function to component props
    const mapStateToProps = (state) => ({
        errors: state.errors,
        requests: state.requests,
    });

    // Map dispatch function to component props
    const mapDispatchToProps = (dispatch) => ({
        dispatch: (action) => { dispatch(action)}
    });

    // Connect component to Redux
    return connect(mapStateToProps, mapDispatchToProps)(AppHigherOrderClass);
}

export default AppHigherOrder;
