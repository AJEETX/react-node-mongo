import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {userService} from '../_services'
import { history, Role  } from '../_helpers';

import { userActions } from '../_actions';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAdmin: false
        };
    }
    componentDidMount() {
        userService.currentUser.subscribe(x => this.setState({
            currentUser: x,
            isAdmin: x && x.permissionLevel === Role.Admin
        }));
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="home-page-height">
                <h4>Hi {user.firstName}!</h4>
                {user.permissionLevel === Role.Admin && users.items &&
                <div>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                <table>
                    <thead>
                        <tr>
                        <th> First Name</th>
                        <th> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.items.map((user, index) =>
                            <tr key={user.id}>
                                <td>
                                {user.firstName + ' ' + user.lastName}</td>
                                <td>
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <a className="btn btn-primary" onClick={this.handleDeleteUser(user.id)}>Delete</a>
                                }
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                
                </div>
                }
                {user.permissionLevel === Role.User &&
                <Link to="/admin" className="nav-item nav-link">See Profile</Link>
                }
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };