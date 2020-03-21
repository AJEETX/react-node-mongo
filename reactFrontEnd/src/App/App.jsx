import React from 'react';
import { Router, Route, Switch, Redirect , Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {userService} from '../_services'
import { history, Role  } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { AdminPage } from '../AdminPage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAdmin: false
        };
        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }
    componentDidMount() {
        userService.currentUser.subscribe(x => this.setState({
            currentUser: x,
            isAdmin: x && x.permissionLevel === Role.Admin
        }));
    }
    logout() {
        userService.logout();
        history.push('/login');
    }
    render() {
        const { alert } = this.props;
        const {currentUser, isAdmin}=this.state
        return (
            <Router history={history}>
            <div className="center-top">
                {currentUser &&
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <div className="navbar-nav">
                            <Link to="/" className="nav-item nav-link">Home</Link>
                            {isAdmin && <Link to="/admin" className="nav-item nav-link">Admin</Link>}
                            <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                        </div>
                    </nav>
                }                
                <div className="jumbotron">
                    <div className="container">
                        <div className="row">
                                <div className="col-md-12 offset-md-0">
                                {alert.message &&
                                    <span className={`alert ${alert.type}`}><i class="fa fa-warning"></i>{alert.message}</span>
                                }
                                    <PrivateRoute exact path="/" component={HomePage} />
                                    <PrivateRoute path="/admin" roles={[Role.Admin]} component={AdminPage} />
                                    <Route path="/login" component={LoginPage} />
                                    <Route path="/register" component={RegisterPage} />
                                </div>

                        </div>
                    </div>
                </div>
            </div>
            </Router>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };