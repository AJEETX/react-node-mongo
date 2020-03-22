import { candidateConstants } from '../_constants';
import { candidateService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const candidateActions = {
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function register(candidate) {
    return dispatch => {
        dispatch(request(candidate));

        candidateService.register(candidate)
            .then(
                candidate => { 
                    dispatch(success());
                    history.push('/admin');
                    dispatch(alertActions.success('Candidate added successfully'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(candidate) { return { type: candidateConstants.REGISTER_REQUEST, candidate } }
    function success(candidate) { return { type: candidateConstants.REGISTER_SUCCESS, candidate } }
    function failure(error) { return { type: candidateConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        candidateService.getAll()
            .then(
                candidates => dispatch(success(candidates)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: candidateConstants.GETALL_REQUEST } }
    function success(candidates) { return { type: candidateConstants.GETALL_SUCCESS, candidates } }
    function failure(error) { return { type: candidateConstants.GETALL_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request(id));

        candidateService.getById(id)
            .then(
                (candidate) => { 
                    dispatch(success(candidate));
                    history.push('/update')
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) { return { type: candidateConstants.GET_REQUEST, id } }
    function success(product) { return { type: candidateConstants.GET_SUCCESS, product } }
    function failure(id, error) { return { type: candidateConstants.GET_FAILURE, id, error } }
}
function update(candidate){
    return dispatch => {
        dispatch(request(candidate));

        candidateService.update(candidate)
            .then(() => { 
                dispatch(success());
                history.push('/admin');
                dispatch(alertActions.success('Update successful'));
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
        );
    };

    function request(id) { return { type: candidateConstants.UPDATE_REQUEST, id } }
    function success(id) { return { type: candidateConstants.UPDATE_SUCCESS, id } }
    function failure(id, error) { return { type: candidateConstants.UPDATE_FAILURE, id, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        candidateService.delete(id)
            .then(
                candidate => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: candidateConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: candidateConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: candidateConstants.DELETE_FAILURE, id, error } }
}