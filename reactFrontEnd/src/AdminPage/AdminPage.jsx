import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { userService } from '../_services';
import { userActions } from '../_actions';
import { candidateActions } from '../_actions';

class AdminPage extends React.Component {
    constructor(props){
        super(props)
    }
    handleDeletecandidate(id) {
        return (e) => this.props.dispatch(candidateActions.delete(id));
    }
    handleEditProduct(id) {
        this.props.dispatch(candidateActions.getById(id)); 
    }
    componentDidMount() {
       this.props.dispatch(candidateActions.getAll());
    }

    render() {
        const { user, candidates } = this.props;

        return (
            <div className="home-page-height">
            <h2>Hi {user.firstName}!</h2>
            {/* <Link to="/candidate" className="btn btn-link">Add candidate</Link> */}
                <div>
                {candidates.loading && <em>Loading candidates...</em>}
                {candidates.error && <span className="text-danger">ERROR: {candidates.error}</span>}
                {candidates.items &&
                <table>
                    <thead>
                        <tr>
                        <th> First Name</th>
                        <th> Last Name</th>
                        <th> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {candidates.items.map((candidate, index) =>
                            <tr key={candidate.id}>
                                <td>
                                {candidate.FirstName }</td>
                                <td>
                                { candidate.LastName}</td>
                                <td className="action">
                                {
                                    candidate.deleting ? <em> - Deleting...</em>
                                    : candidate.deleteError ? <span className="text-danger"> - ERROR: {candidate.deleteError}</span>
                                    : <a className="btn btn-primary" onClick={this.handleDeletecandidate(candidate.id)}>Edit</a>
                                }
                                &nbsp;&nbsp;&nbsp;
                                {
                                    candidate.deleting ? <em> - Deleting...</em>
                                    : candidate.deleteError ? <span className="text-danger"> - ERROR: {candidate.deleteError}</span>
                                    : <a className="btn btn-primary" onClick={this.handleDeletecandidate(candidate.id)}>Delete</a>
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
    const { authentication,candidates } = state;
    const { user } = authentication;
    return { user, candidates };
}

// const actionCreators = {
//     getUsers: userActions.getAll,
//     deleteUser: userActions.delete,
//     getcandidates:candidateActions.getAll,
//     deleteCandidate:candidateActions.delete
// }
const connectedAdminPage = connect(mapState)(AdminPage)
export { connectedAdminPage as AdminPage };