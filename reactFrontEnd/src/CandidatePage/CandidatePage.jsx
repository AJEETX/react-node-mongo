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
                Description: 'In progress...',
                Document:null,
                ContactNumber: 0,
                DateOfBirth:'',
                UserId:''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.onChangeHandler=this.onChangeHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onChangeHandler(event){
        this.setState({
             Document:event.target.files[0],
            loaded: 0,
        })
    }
    handleChange(event) {
        const { name, value } = event.target;
        const { candidate } = this.state;
        this.setState({
            candidate: {
                ...candidate,
                [name]: value
            }
        });
        if(event.target.files && event.target.files[0]){
            this.setState({
                image: URL.createObjectURL(event.target.files[0])
              });
            this.Base64(event.target.files[0]).then(fileData=>{
                candidate.Document=fileData
            });
        }
    }
    convert2Base64(file){
        return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        });}
        Base64(file){ 
            return this.convert2Base64(file);
        }
    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { candidate } = this.state;
        const { dispatch } = this.props;
        candidate.UserId=this.props.authentication.user.email;
            if (candidate.UserId && candidate.FirstName && candidate.LastName && candidate.Email && candidate.ContactNumber) {
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
                        <input type="text" className={'form-control' +(submitted && !candidate.FirstName ? ' error' : '')} name="FirstName" value={candidate.FirstName} onChange={this.handleChange} />
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
                    <div className='form-group'>
                        <label htmlFor="Document">Document</label>
                        <input type="file" className="form-control" name="Document" onChange={this.onChangeHandler} />
                        <img id="target" src={this.state.image}/>
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
    const { authentication } = state;
    return {
        authentication
    };
}

const connectedProductPage = connect(mapStateToProps)(CandidatePage);
export { connectedProductPage as CandidatePage };