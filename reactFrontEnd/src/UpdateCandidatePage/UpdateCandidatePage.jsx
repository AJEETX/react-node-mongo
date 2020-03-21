import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { candidateActions } from '../_actions';

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
                ContactNumber:this.refs.ContactNumber.value
        }
        if ( candidate.FirstName && candidate.LastName && candidate.Email  && candidate.Description && candidate.ContactNumber) {
            this.props.dispatch(candidateActions.update(candidate));
        }
    }

    render() {
        const { candidate } = this.props;
        const {FirstName,LastName,Email,Description,ContactNumber,submitted}=this.state
        return (
            <div className="col-md-6 col-md-offset-3">
                <h4>Update candidate</h4>
                <form name="form" onSubmit={this.handleSubmit.bind(this)}>
                    <div className={'form-group' + ( submitted && !FirstName ? ' has-error' : '')}>
                        <label htmlFor="FirstName">FirstName</label>
                        <input type="text" className="form-control" name="FirstName" value={FirstName} defaultValue={candidate.FirstName} 
                        onChange={(value) => this.onChange(value)} ref="FirstName" />
                        {submitted && !FirstName &&
                            <div className="help-block">FirstName is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !LastName ? ' has-error' : '')}>
                        <label htmlFor="LastName">LastName</label>
                        <input type="text" className="form-control" name="LastName" value={LastName} defaultValue={candidate.LastName} 
                        onChange={(value) => this.onChange(value)} ref="LastName" />
                        { submitted && !LastName &&
                            <div className="help-block">LastName is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !Email ? ' has-error' : '')}>
                        <label htmlFor="Email">Email</label>
                        <input type="text" className="form-control" name="Email" value={Email} defaultValue={candidate.Email} 
                        onChange={(value) => this.onChange(value)} ref="Email"  />
                        { submitted &&!Email &&
                            <div className="help-block">Email is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !Description ? ' has-error' : '')}>
                        <label htmlFor="Description">Description</label>
                        <input type="text" className="form-control" name="Description" value={Description} defaultValue={candidate.Description} 
                        onChange={(value) => this.onChange(value)} ref="Description"  />
                        { submitted &&!Description &&
                            <div className="help-block">Description is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !ContactNumber ? ' has-error' : '')}>
                        <label htmlFor="ContactNumber">ContactNumber</label>
                        <input type="number" className="form-control" name="ContactNumber" value={ContactNumber} defaultValue={candidate.ContactNumber} 
                        onChange={(value) => this.onChange(value)} ref="ContactNumber"  />
                        { submitted &&!ContactNumber &&
                            <div className="help-block">ContactNumber is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Update candidate</button>
                        <Link to="/" className="btn btn-link">Cancel</Link>
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