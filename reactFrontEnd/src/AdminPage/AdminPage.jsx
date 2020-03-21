import React from 'react';
import { connect } from 'react-redux';

import { userService } from '../_services';
import { userActions } from '../_actions';

class AdminPage extends React.Component {
    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }
    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        const { user, users } = this.props;

        return (
            <div className="home-page-height">
            <h2>Hi {user.firstName}!</h2>
                <div>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                <table>
                    <thead>
                        <tr>
                        <th> First Name</th>
                        <th> Last Name</th>
                        <th> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.items.map((user, index) =>
                            <tr key={user.id}>
                                <td>
                                {user.firstName }</td>
                                <td>
                                { user.lastName}</td>
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
                }
                </div>
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
const connectedAdminPage = connect(mapState, actionCreators)(AdminPage)
export { connectedAdminPage as AdminPage };