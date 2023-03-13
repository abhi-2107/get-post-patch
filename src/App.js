import "./App.css";
import List from "./List";
import { useState, useEffect } from "react";

function App() {
  let [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {console.log(data);  setPosts(data) });
  }, []);

  function postReq() {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: 'Post request adding...',
        body: 'This is my first post request of all time ',
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
    })
    .then((response) => response.json())
  }

  function deletePost(post) {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: 'DELETE',
    })
  }


console.log(posts)
  let listItems = posts.map((post) => (
    <List
      onDelete = {() => deletePost(post)}
      key = {post.id}
      userid={post.userId}
      id={post.id}
      title={post.title}
      body={post.body}
    />
  ));

  return (
    <div>
      <div className="table table-striped">
          <tr>
            <th>UserId</th>
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        <tbody>{listItems}</tbody>
      </div>
      <button className="btn btn-primary mx-auto d-flex justify-content-center m-4" onClick={postReq}>Add post</button>
    </div>
  );
}

export default App;
