import { setCurrentUser } from '../redux/actions'

const API_URL = 'http://localhost:3000/api/v1/';

export default class FlatbookAdapter {

  static getToken() {
    return localStorage.getItem('token');
  }

  static loginUser = (username, password, setCurrentUser) => {
    fetch(`${API_URL}/login`, {
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
        setCurrentUser(user)
      })
    }

  // static reviewInfo = () => {
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": FlatbookAdapter.getToken(),
  //     },
  //   }
  //
  //   return fetch(`${API_URL}/reviews`, config)
  //     .then(response => {
  //       if(response.ok) {
  //         return response.json();
  //       }
  //     })
  //   }


}