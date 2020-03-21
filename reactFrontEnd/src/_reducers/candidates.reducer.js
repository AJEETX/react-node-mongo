import { candidateConstants } from '../_constants';
const initialState={
  items:[],
  loading:false,
  error:null,
  item:{}
}
export function candidates(state = initialState, action) {
  switch (action.type) {
    case candidateConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case candidateConstants.GETALL_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.candidates
      };
    case candidateConstants.GETALL_FAILURE:
      return { 
        ...state,
        loading: false,
        error: action.error,
        items: []
      };
      case candidateConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case candidateConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case candidateConstants.REGISTER_FAILURE:
      return { 
        ...state,
        loading: false,
        error: action.error,
        items: []
      };

      case candidateConstants.GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case candidateConstants.GET_SUCCESS:
    {
      return {
        ...state,
        loading: false,
        error: null,
        item:action.candidate
      };
    }
    case candidateConstants.GET_FAILURE:
      return { 
        error: action.error
      };

    case candidateConstants.DELETE_REQUEST:

      return {
        ...state,
        items: state.items.map(candidate =>
          candidate.id === action.id
            ? { ...candidate, deleting: true }
            : candidate
        )
      };
    case candidateConstants.DELETE_SUCCESS:

      return {
        items: state.items.filter(candidate => candidate.id !== action.id)
      };
    case candidateConstants.DELETE_FAILURE:

      return {
        ...state,
        items: state.items.map(candidate => {
          if (candidate.id === action.id) {

            const { deleting, ...candidateCopy } = candidate;

            return { ...candidateCopy, deleteError: action.error };
          }

          return candidate;
        })
      };
    default:
      return state
  }
}