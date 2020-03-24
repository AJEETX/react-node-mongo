import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { candidateActions } from '../_actions';
import { of } from 'rxjs';

class AdminPage extends React.Component {
    constructor(props){
        super(props)
        this.filtered=[];
        this.currentList=[];
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleDeletecandidate=this.handleDeletecandidate.bind(this);
    }
    handleDeletecandidate(id) {
         this.props.dispatch(candidateActions.delete(id));
    }
    handleEditProduct(id) {
        this.props.dispatch(candidateActions.getById(id));
    }
    componentDidMount() {
       this.props.dispatch(candidateActions.getAll());
       this.refs.search.focus();
    }
    List(e){
        if (e && e.target.value !== "") {
            const filter = e.target.value.toLowerCase();
            this.props.dispatch(candidateActions.getAll(filter));
        }else{
            this.props.dispatch(candidateActions.getAll(''));
        }
    }
    handleSearchChange(e) {
        this.List(e);
    }
    render() {
        const { user, candidates } = this.props;
        
        return (
            <div className="home-page-height">

            <h4>Hi {user.firstName}!</h4>
            <div className="search"> 
                <input ref="search" type="text" className="form-control" onChange={this.handleSearchChange} placeholder="Search..." />
            </div>
            <div className="add-candidate"> <Link to="/candidate" className="add-candidate-link-button" >
                <button type="button" className="btn btn-primary">Add Candidate</button>
                </Link></div>

                <div>
                {candidates.loading && <em>Loading candidates...</em>}
                {candidates.error && <span className="text-danger">ERROR: {candidates.error}</span>}
                {candidates.items &&
                <table>
                    <thead>
                        <tr>
                        <th> First Name</th>
                        <th> Last Name</th>
                        <th> Email</th>
                        <th> Contact Number</th>
                        <th> Date of Birth</th>
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
                                <td>
                                { candidate.Email}</td>
                                <td>
                                { candidate.ContactNumber}</td>
                                <td>
                                {  new Date(candidate.DateOfBirth).toDateString()}</td>
                                <td className="action">
                                {
                                    candidate.editing ? <em> - Editing...</em>
                                    : candidate.editError ? <span className="text-danger"> - ERROR: {candidate.editError}</span>
                                    : <a className="" onClick={this.handleEditProduct.bind(this,candidate.id)}>
                                    <i className="fa fa-edit"></i></a>
                                }
                                &nbsp;&nbsp;&nbsp;
                                {
                                    candidate.deleting ? <em> - Deleting...</em>
                                    : candidate.deleteError ? <span className="text-danger"> - ERROR: {candidate.deleteError}</span>
                                    : <a className="" onClick={() => {if(window.confirm('Delete the item?')){this.handleDeletecandidate(candidate.id)};}}>
                                        <i className="fa fa-trash-o"></i></a>
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

const connectedAdminPage = connect(mapState)(AdminPage)
export { connectedAdminPage as AdminPage };