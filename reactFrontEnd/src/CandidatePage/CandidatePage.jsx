import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { candidateActions } from '../_actions';

class CandidatePage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            candidate: {
                FirstName: '',
                LastName: '',
                Email: '',
                Description: '',
                ContactNumber: 0,
                DateOfBirth:'',
                Document:React.createRef()
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const { name, value } = event.target;
        const { candidate } = this.state;
        if(event.target.files){
            console.log(event.target.files[0])
        }
        this.setState({
            candidate: {
                ...candidate,
                [name]: value
            }
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { candidate } = this.state;
        const { dispatch } = this.props;
        if (candidate.FirstName && candidate.LastName && candidate.Email && candidate.ContactNumber) {
            dispatch(candidateActions.register(candidate));
        }
    }
    render() {
        const { candidate, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h4>add candidate !!!</h4>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !candidate.FirstName ? ' has-error' : '')}>
                        <label htmlFor="FirstName">FirstName</label>
                        <input type="text" className={'form-control' +(submitted && !candidate.firstName ? ' error' : '')} name="FirstName" value={candidate.FirstName} onChange={this.handleChange} />
                    </div>
                    <div className={'form-group' + (submitted && !candidate.LastName ? ' has-error' : '')}>
                        <label htmlFor="LastName">LastName</label>
                        <input type="text" className={'form-control' +(submitted && !candidate.LastName ? ' error' : '')} name="LastName" value={candidate.LastName} onChange={this.handleChange} />
                    </div>
                    <div className={'form-group' + (submitted && !candidate.Email ? ' has-error' : '')}>
                        <label htmlFor="Email">Email</label>
                        <input type="email" className={'form-control' +(submitted && !candidate.Email ? ' error' : '')} name="Email" value={candidate.Email} onChange={this.handleChange} />
                    </div>
                    <div className={'form-group' + (submitted && !candidate.Description ? ' has-error' : '')}>
                        <label htmlFor="Description">Description</label>
                        <input type="text" className={'form-control' +(submitted && !candidate.Description ? ' error' : '')} name="Description" value={candidate.Description} onChange={this.handleChange} />
                    </div>
                    <div className={'form-group' + (submitted && !candidate.ContactNumber ? ' has-error' : '')}>
                        <label htmlFor="ContactNumber">ContactNumber</label>
                        <input type="number" minLength="10" className={'form-control' +(submitted && !candidate.ContactNumber ? ' error' : '')} name="ContactNumber" value={candidate.ContactNumber} onChange={this.handleChange} />
                    </div>
                    <div className={'form-group' + (submitted && !candidate.DateOfBirth ? ' has-error' : '')}>
                        <label htmlFor="DateOfBirth">DateOfBirth</label>
                        <input type="date" className={'form-control' +(submitted && !candidate.DateOfBirth ? ' error' : '')} name="DateOfBirth" value={candidate.DateOfBirth} onChange={this.handleChange} />
                    </div>  
                    <div className={'form-group' + (submitted && !candidate.Document ? ' has-error' : '')}>
                        <label htmlFor="Document">Document</label>
                        <input type="file" className="form-control" name="Document" onChange={this.handleChange} />
                    </div>                    
                    <div className="form-group">
                        <button className="btn btn-primary">Add candidate</button> &nbsp;
                        <Link to="/admin" className="btn-link">Cancel</Link>
                    </div>
                </form>

            </div>
        );
    }
}




function mapStateToProps(state) {
    const { candidates } = state.candidates;
    return {
        candidates
    };
}

const connectedProductPage = connect(mapStateToProps)(CandidatePage);
export { connectedProductPage as CandidatePage };