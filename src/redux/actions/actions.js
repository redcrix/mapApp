import * as actionTypes from './types';
import AsyncStorage from '@react-native-community/async-storage';
import {googleMapsApiKey} from '../../constants/googleMapsApiKey';
import axios from 'axios';

const apiEndPoint = "http://167.172.127.234:4000/api/";

export const login = (navigation,toast, username, password, device_token = "XX", device_os = "xx") => async dispatch => {
  dispatch({type: actionTypes.LOGIN_USER_REQ});
  axios.post(apiEndPoint + 'login', {
    username,
    password,
    device_token,
    device_os,
  })
  .then((response) => {
    console.log(response);
    if (response.data) {
      if (response.data.success) {
        toast.show(response.data.message);
        dispatch({
          type: actionTypes.LOGIN_USER_SUCCESS,
          payload: response.data
        });
        navigation.navigate('HomeScreen');
      } else {
        toast.show(response.data.message);
        dispatch({
          type: actionTypes.LOGIN_USER_ERROR,
        });
      }
    } else {
      toast.show('There is some issue with API');
      dispatch({
        type: actionTypes.LOGIN_USER_ERROR,
      });
    }
  })
  .catch(err => {
    console.log('e______', err);
    dispatch({
      type: actionTypes.LOGIN_USER_ERROR,
    });
  });
};

export const addNewPinPoint = (toast, postObject, cb) => async dispatch => {
  dispatch({type: actionTypes.START_LOADING});
  axios.post(apiEndPoint + 'add_new_pin_point', postObject)
  .then((response) => {
    console.log(response);
    if (response.data) {
      if (response.data.success) {
        toast.show(response.data.message);
        dispatch({
          type: actionTypes.PIN_ADD_SUCCESS,
          payload: response.data
        });
        cb();
      } else {
        toast.show(response.data.message);
        dispatch({
          type: actionTypes.PIN_ADD_ERROR,
        });
      }
    } else {
      toast.show('There is some issue with API');
      dispatch({
        type: actionTypes.PIN_ADD_ERROR,
      });
    }
  })
  .catch(err => {
    console.log('e______', err);
    dispatch({
      type: actionTypes.PIN_ADD_ERROR,
    });
  });
};

export const getAllPinPoints = (postObject) => async dispatch => {
  dispatch({
    type: actionTypes.START_LOADING
  });
  axios.post(apiEndPoint + 'get_all_pin_points', postObject)
    .then((response) => {
      if (response.data) {
        if (response.data.status) {
          let pinPoints = [];
          response.data.data.map(item => {
            if (Array.isArray(item.orderdetails) && item.orderdetails.length > 0) {
              item.orderdetails.map(spin => {
                pinPoints.push({
                  ...spin,
                  userName: item.username,
                  userImage: item.profile_pick,
                });
              });
            }
          });
          dispatch({
            type: actionTypes.PIN_GET_SUCCESS,
            payload: pinPoints
          });
        } else {
          dispatch({
            type: actionTypes.PIN_GET_ERROR,
          });
        }
      } else {
        dispatch({
          type: actionTypes.PIN_GET_ERROR,
        });
      }
    })
    .catch(err => {
      console.log('e______', err);
      dispatch({
        type: actionTypes.PIN_GET_ERROR,
      });
    });
};

export const signup = (navigation, toast, registerObj) => async dispatch => {
  console.log("________signup", registerObj);
  dispatch({
    type: actionTypes.REGISTER_USER_REQ
  });
  axios.post(apiEndPoint + 'signup', registerObj)
    .then((response) => {
      console.log(response);
      if (response.data) {
        if (response.data.success) {
          toast.show(response.data.message);
          dispatch({
            type: actionTypes.REGISTER_USER_SUCCESS,
            payload: response.data
          });
          navigation.navigate('LoginScreen');
        } else {
          toast.show(response.data.message);
          dispatch({
            type: actionTypes.REGISTER_USER_ERROR,
          });
        }
      } else {
        toast.show('There is some issue with API');
        dispatch({
          type: actionTypes.REGISTER_USER_ERROR,
        });
      }
    })
    .catch(err => {
      toast.show('There is some issue with API');
      console.log('e______', err);
      dispatch({
        type: actionTypes.REGISTER_USER_ERROR,
      });
    });
};