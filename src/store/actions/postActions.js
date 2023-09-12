import axios from 'axios';

export const getPosts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      dispatch({ type: 'SET_POSTS', payload: response.data });
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
};

export const addPost = (newPost) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
      dispatch({ type: 'ADD_POST', payload: response.data });
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };
};

export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      dispatch({ type: 'DELETE_POST', payload: postId });
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };
};