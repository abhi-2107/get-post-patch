import './loder.scss'
import List from "./List";
import { useState, useEffect } from "react";

function App() {
  let [posts, setPosts] = useState([]);
  let [postLoading, setPostLoading] = useState(false);
  let [postError, setPostError] = useState(false);
  // error state
  useEffect(() => {
    setPostLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => {if(res.ok){
        return res
      }else {
        throw res
      }})
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
        setPostLoading(false);
      }).catch((error) => {setPostLoading(false); setPostError(true)});
  }, []);

  function postReq() {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: "Post request adding...",
        body: "This is my first post request of all time ",
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());
  }

  function deletePost(postId) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: "DELETE",
    });
  }

  let listItems = posts.map((post) => (
    <List
      onDelete={() => deletePost(post.id)}
      key={post.id}
      userid={post.userId}
      id={post.id}
      title={post.title}
      body={post.body}
    />
  ));

  return (
    <div>
      {postError}
      {postError && <div className='alert alert-danger'>A fetch error has occured.... </div>}
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
      <button
        className="btn btn-primary mx-auto d-flex justify-content-center m-4"
        onClick={postReq}
      >
        Add post
      </button>


     { postLoading  &&  <div className="loader">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"></img>
      </div>}
    </div>
  );
}

export default App;
