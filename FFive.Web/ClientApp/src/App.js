import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { ListPlatform, AddPlatform, EditPlatform } from './components/platform';
import { ListClient, AddClient } from './components/client';
import { Counter } from './components/Counter';
import { Login } from './components/Login';
import { PrivateRoute } from './components/PrivateRoute';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class App extends Component {
    displayName = App.name

    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        //history.listen((location, action) => {
        //    // clear alert on location change
        //    dispatch(alertActions.clear());
        //});
    }

    render() {
        const { alert } = this.props;

        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Layout>
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route path='/login' component={Login} />
                                <PrivateRoute path='/counter' component={Counter} />
                                <PrivateRoute path='/resources' component={Counter} />

                                <PrivateRoute path='/clients/add' component={AddClient} />
                                <PrivateRoute path='/clients' component={ListClient} />

                                <PrivateRoute path='/platforms/add' component={AddPlatform} />
                                <PrivateRoute path='/platforms/edit' component={EditPlatform} />
                                <PrivateRoute path='/platforms' component={ListPlatform} />
                            </Switch>
                        </Layout>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

export default withRouter(
    connect(mapStateToProps)(App)
);