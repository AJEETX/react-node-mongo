import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
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

                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
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