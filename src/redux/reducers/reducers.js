import * as actionTypes from '../actions/types';

const initialState = {
  loading: false,
  userdata: {},
  pinPoint: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.START_LOADING:
    case actionTypes.LOGIN_USER_REQ:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.NOT_LOADING:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        userdata: action.payload,
        loading: false,
      };
    case actionTypes.PIN_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.PIN_ADD_ERROR:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.PIN_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        pinPoint: action.payload,
      };
    case actionTypes.PIN_GET_ERROR:
      return {
        ...state,
        loading: false,
        pinPoint: [],
      };
    default:
      return state;
  }
}
