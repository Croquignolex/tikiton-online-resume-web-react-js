import 'nprogress/nprogress.css';
import Nprogress from 'nprogress';
import React, { Component } from 'react';

import '../assets/scss/loader.scss';
import ErrorBoundary from "../pages/error/ErrorBoundary";

export default function asyncComponent(importComponent) {
    class AsyncFunc extends Component {
        constructor(props) {
            super(props);
            this.state = {
                component: null,
            };

            Nprogress.configure({ showSpinner: false });
            Nprogress.start();
        }

        componentWillUnmount() {
            this.mounted = false;
            //Nprogress.remove();
        }

        async componentDidMount() {
            this.mounted = true;
            const { default: Component } = await importComponent();
            Nprogress.done();
            if (this.mounted) {
                this.setState({
                    component: <Component {...this.props} />,
                });
            }
        }

        render() {
            return (
                <ErrorBoundary>
                    {this.state.component || <div className="lds-ripple"><div/><div/></div>}
                </ErrorBoundary>
            )
        }
    }
    return AsyncFunc;
}