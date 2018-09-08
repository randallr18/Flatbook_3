import { SET_CURRENT_USER, ADD_REVIEW_INFO } from './types';
import FlatbookAdapter from '../api/Adapter'
import history from '../history';

export function loginUser(username, password) {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepct: 'application/json'
      },
      body: JSON.stringify({user: { username, password } })
    })
    .then(response => response.json())
    .then(({user, jwt}) => {
      localStorage.setItem('jwt', jwt)
      dispatch(setCurrentUser(user))
    })
  }
}

export const signUpUser = (username, password) => {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accepct: 'application/json'
      },
      body: JSON.stringify({user: { username, password } })
    })
    .then(response => response.json())
    .then(({user, jwt}) => {
      localStorage.setItem('jwt', jwt)
      dispatch(setCurrentUser(user))
    })
  }
}

export const fetchCurrentUser = () => {
  return dispatch => {
    fetch('http://localhost:3000/api/v1/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(response => response.json())
    .then(({ user }) => dispatch(setCurrentUser(user)))
  }
}

export const retrieveReviews = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
    },
  }
  return dispatch => {
    fetch('http://localhost:3000/api/v1/reviews', config)
    .then(response => response.json())
    .then((data) => dispatch(updateReviewInfo(data)))
  }
}

export const updateUser = (userID, user) => {
  const config = {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  }
  return dispatch => {
  fetch(`http://localhost:3000/api/v1/users/${userID}`, config)
  .then(res => res.json())
  .then(({user}) => dispatch(setCurrentUser(user)))
  .then(history.push('/home'))
  }
}


export const setCurrentUser = userData => ({
  type: SET_CURRENT_USER,
  payload: userData
})

export const updateReviewInfo = reviewData => ({
  type: ADD_REVIEW_INFO,
  payload: reviewData
})



// export const authenticatingUser = () => ({ type: 'AUTHENTICATING_USER' })
