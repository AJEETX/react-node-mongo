import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { candidateActions } from '../_actions';
import {DatePicker} from 'react-datepicker';
class UpdateCandidatePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false
        };
    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ 
            submitted: true 
        });

        let id=this.props.candidate.id
        let candidate={
                id:id,
                FirstName:this.refs.FirstName.value,
                LastName:this.refs.LastName.value,
                Email:this.refs.Email.value,
                Description:this.refs.Description.value,
                DateOfBirth:this.refs.DateOfBirth.value,
                ContactNumber:this.refs.ContactNumber.value
                // ,
                // Document:this.refs.Document.value
        }
        if ( candidate.FirstName && candidate.LastName && candidate.Email  && candidate.Description && candidate.ContactNumber) {
            this.props.dispatch(candidateActions.update(candidate));
        }
    }

    render() {
        const { candidate } = this.props;
        const {FirstName,LastName,Email,Description,ContactNumber,DateOfBirth,Document,submitted}=this.state
        return (
            <div className="col-md-6 col-md-offset-3">
                <h4>Update candidate</h4>
                <form name="form" onSubmit={this.handleSubmit.bind(this)}>
                    <div className={'form-group' + ( submitted && !candidate.FirstName ? ' has-error' : '')}>
                        <label htmlFor="FirstName">FirstName</label>
                        <input type="text" className="form-control" name="FirstName" defaultValue={candidate.FirstName} 
                        onChange={(value) => this.onChange(value)} ref="FirstName" />
                    </div>
                    <div className={'form-group' + (submitted && !candidate.LastName ? ' has-error' : '')}>
                        <label htmlFor="LastName">LastName</label>
                        <input type="text" className="form-control" name="LastName" defaultValue={candidate.LastName} 
                        onChange={(value) => this.onChange(value)} ref="LastName" />
                    </div>
                    <div className={'form-group' + (submitted && !candidate.Email ? ' has-error' : '')}>
                        <label htmlFor="Email">Email</label>
                        <input type="text" className="form-control" name="Email" defaultValue={candidate.Email} 
                        onChange={(value) => this.onChange(value)} ref="Email"  />
                    </div>
                    <div className={'form-group' + (submitted && !candidate.Description ? ' has-error' : '')}>
                        <label htmlFor="Description">Description</label>
                        <input type="text" className="form-control" name="Description" value={Description} defaultValue={candidate.Description} 
                        onChange={(value) => this.onChange(value)} ref="Description"  />
                    </div>
                    <div className={'form-group' + (submitted && !candidate.ContactNumber ? ' has-error' : '')}>
                        <label htmlFor="ContactNumber">ContactNumber</label>
                        <input type="number" className="form-control" name="ContactNumber" defaultValue={candidate.ContactNumber} 
                        onChange={(value) => this.onChange(value)} ref="ContactNumber"  />
                    </div>
                    <div className={'form-group' + (submitted && !candidate.DateOfBirth ? ' has-error' : '')}>
                        <label htmlFor="DateOfBirth">DateOfBirth</label>
                        <input type="date" className="form-control" placeholder="ddMMyyyy" name="DateOfBirth" 
                        defaultValue={new Date(candidate.DateOfBirth).toISOString().substr(0,10)}
                        onChange={(value) => this.onChange(value)} ref="DateOfBirth"  />
                    </div>
                    <div className={'form-group' + (submitted && !candidate.Document ? ' has-error' : '')}>
                        <label htmlFor="Document">Document</label>
                        <input type="file" className="form-control" name="Document" value={candidate.Document} defaultValue={candidate.Document} onChange={this.handleChange} />
                    </div> 
                    <div className="form-group">
                        <button className="btn btn-primary">Update candidate</button>
                        <Link to="/admin" className="btn btn-link">Cancel</Link>
                    </div>
                </form>

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { candidates } = state;
    return {
        candidate:candidates.item,
    };
}

const connectedUpdatePage = connect(mapStateToProps)(UpdateCandidatePage);
export { connectedUpdatePage as UpdateCandidatePage };