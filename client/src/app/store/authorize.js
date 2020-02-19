import { createAction, handleActions } from "redux-actions"
import Gh from '../utils/GithubClient'

const getPermission = createAction('GET_PERMISSION')
const setAuthorize = createAction('SET_AUTHORIZE')

const initialState = {
    isFetching: false,
    error: null,
    authorized: '',
}

export const fetchUserPermission = (token, owner, repo) => async function(dispatch) {
    dispatch(getPermission())

    let permissible = [ 'write', 'maintain', 'admin' ]
    let gh = new Gh(token)

    try {
        let { login } = await gh.get('user')
        console.log(`try fetching permissions using owner, repo & login, ${owner}, ${repo} & ${login}`)
        let { permission } = await gh.get('permission', { owner, repo, user: login })
        
        if (permissible.includes(permission)) {
            console.log(`permission level "${permission}" is permissible: ${permissible.includes(permission)}`)
            dispatch(setAuthorize('authorized'))
        } else dispatch(setAuthorize('unauthorized'))
    } catch (er) {
        console.error(er)
        dispatch(setAuthorize(er))
    }
}

const reducer = handleActions({
    [ getPermission ]: state => ({
        ...state,
        isFetching: true
    }),
    [ setAuthorize ]: (state, action) => (
        action.error
        ? {
            ...state,
            authorized: '',
            isFetching: false,
            error: action.payload.message // NOTE: The payload here is an Error instance
        }
        : {
            ...state,
            authorized: action.payload,
            error: null
        }
    )
}, initialState)

export default reducer
