import { writable } from 'svelte/store'
import axios from 'axios'

const todosUrl = process.env.API_URL + 'todos/'
const authUrl  = process.env.API_URL + 'auth/'

const getAccessToken  = () => localStorage.getItem('access_token')
const getRefreshToken = () => localStorage.getItem('refresh_token')
const setAccessToken  = (token) => localStorage.setItem('access_token',  token)
const setRefreshToken = (token) => localStorage.setItem('refresh_token', token)

export const getUsername = () => {
    try{
        const data = getAccessToken().split('.')[1]
        const decoded = JSON.parse(atob(data))
        return decoded.username
    }
    catch(err) {
        console.log(err)
        return null
    }
}

// Login state management, the set function will not be exported
const loggedInStore = (() => {

    const { subscribe, set } = writable(false)
	return { subscribe, set }
})()

export const loggedIn = {subscribe: loggedInStore.subscribe}

// Access and refresh token management
const todoApi = axios.create()
todoApi.interceptors.request.use(
    async config => {
        config.headers.Authorization = 'Bearer ' + getAccessToken()
        return config
    },
    error => Promise.reject(error)
)
todoApi.interceptors.response.use(
    response => response,
    error => {
        if(error.response.status != 401) return Promise.reject(error)

        return refresh()
        .then(() => {
            error.config.headers.Authorization = 'Bearer ' + getAccessToken()
            return todoApi(error.config)
        })
        .catch(err => Promise.reject(err))
    }
)

export const refresh = async() => {

    try{
        const response = await axios({
            method: 'post',
            url: authUrl + 'refresh',
            headers: { Authorization: 'Bearer '+ getRefreshToken() }
        })

        setAccessToken(response.data.access_token)
        loggedInStore.set(true)
    }
    catch(err) {
        logout()
    }
}

// Api auth routes
export const login = async (username, password) => {

    const response = await axios.post(authUrl + 'login', {username, password})

    setAccessToken(response.data.access_token)
    setRefreshToken(response.data.refresh_token)
    loggedInStore.set(true)
}

export const logout = async() => {
    setAccessToken('')
    setRefreshToken('')
    loggedInStore.set(false)
}

export const signup = async (username, password) => {

    await axios.post(authUrl + 'signup', {username, password})
}

// Api todo routes
export const getTodos = async () => {

    const response = await todoApi.get(todosUrl)

    return response.data
}

export const addTodo = async (title, description) => {

    const response = await todoApi.post(todosUrl, {title, description, completed: false})

    return response.data
}

export const updateTodo = async (todo) => {

    const response = await todoApi.put(todosUrl + todo.id, todo)

    return response.data
}

export const deleteTodo = async (todo) => {

    await todoApi.delete(todosUrl + todo.id)

    return todo
}
