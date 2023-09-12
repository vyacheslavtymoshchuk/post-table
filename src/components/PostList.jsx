import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, addPost, deletePost } from "../store/actions/postActions";

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const [sortedField, setSortedField] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleSort = (field) => {
    if (sortedField === field) {
      setSortedField(null);
      posts.sort((a, b) => a.id - b.id);
    } else {
      setSortedField(field);
      posts.sort((a, b) => (a[field] < b[field] ? -1 : 1));
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPost = () => {
    if (newPost.title && newPost.body) {
      dispatch(addPost(newPost));
      setNewPost({ title: "", body: "" });
    }
  };

  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId));
  };

  return (
    <div>
      <h1>Post Table</h1>
      <div className="search-post-container">
        <input
          className="search-post-input"
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="add-post-container">
        <input
          className="add-post-input"
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <input
          className="add-post-input"
          type="text"
          placeholder="Body"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        />
        <button className="add-button" onClick={handleAddPost}>ADD POST</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("id")}>ID</th>
              <th onClick={() => handleSort("title")}>Title</th>
              <th>Body</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostList;
