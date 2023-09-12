const initialState = {
  posts: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, posts: action.payload };
    case 'ADD_POST':
      return { ...state, posts: [...state.posts, action.payload] };
    case 'DELETE_POST':
      const updatedPosts = state.posts.filter((post) => post.id !== action.payload);
      return { ...state, posts: updatedPosts };
    default:
      return state;
  }
};

export default postReducer;