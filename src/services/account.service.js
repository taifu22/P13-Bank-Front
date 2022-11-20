import Axios from './CallAxios.service';

//fonction to login user
let login = (login) => {
    return Axios.post('api/v1/user/login', login)
}

//function to get data's user with the token received during the connection
let getProfile = (token) => {
    let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
    }
    let body = {key: "value"}
    return Axios.post('api/v1/user/profile', body, config)
}

export const accountService = {
    login, getProfile
}