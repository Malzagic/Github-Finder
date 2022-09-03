import { createContext, useReducer } from "react";
import githubReducer from './GitHubReducer';


const GitHubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const GitHubProvider = ({ children }) => {

  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState);
 
  // Get search results
  const searchUsers =  async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text
    });
  

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`);

    const {items} = await response.json();

    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
  }

  // Get single user
  const getUser =  async (login) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`);

    if(response.status === 404) {
      window.location = '/notfound';
    } else {
      const data = await response.json();

      dispatch({
        type: 'GET_USER',
        payload: data,
      });
    }
    
  }
  
  // Get user repos
  const getUserRepos =  async (login) => {
    setLoading();

    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10
    });

    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`);

    const data = await response.json();

    dispatch({
      type: 'GET_REPOS',
      payload: data,
    });
  }

  // Set loading
  const setLoading = () => {
    dispatch({type: 'SET_LOADING'});
  }

  const clearUsers = () => {
    dispatch({type: 'CLEAR_USERS'});
  }

  return (
    <GitHubContext.Provider value={{
      users: state.users,
      user: state.user,
      loading: state.loading,
      repos: state.repos,
      searchUsers,
      clearUsers,
      getUser,
      getUserRepos,
    }}>
      {children}
    </GitHubContext.Provider>
  )
}

export default GitHubContext;