import "./App.css";
import List from "./List";
import { useState, useEffect } from "react";

function App() {
  let [obj, setObj] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {console.log(data);  setObj(data) });
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
    .then((data) => setObj(data))
  }

  let listItems = obj.map((responseObj) => (
    <List
      key = {responseObj.id}
      userid={responseObj.userId}
      id={responseObj.id}
      title={responseObj.title}
      body={responseObj.body}
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
