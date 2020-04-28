// import Cookies from 'js-cookie'

const TokenKey = 'haifuToken'

export function getToken() {
    let tmp = localStorage.getItem(TokenKey)
    if (tmp == 'undefined') {
        return null
    } else {
        return tmp
    }
    // return Cookies.get(TokenKey)
}

export function setToken(token) {
    // return Cookies.set(TokenKey, token)
    localStorage.setItem(TokenKey, token)
}

export function removeToken() {
    // return Cookies.remove(TokenKey)
    localStorage.removeItem(TokenKey)
}
