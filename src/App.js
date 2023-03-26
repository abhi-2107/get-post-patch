import './loader.scss'
import List from './List'
import { useState, useEffect } from 'react'

function App () {
  // get request states
  let [posts, setPosts] = useState([])
  let [postLoading, setPostLoading] = useState(false)
  let [postError, setPostError] = useState(false)
  // post request states
  let [addPostLoading, setAddPostLoading] = useState(false)
  let [addPostError, setAddPostError] = useState(false)
  let [addPostSuccess, setAddPostSuccess] = useState(false)
  // Delete request states
  let [deletePostLoading, setDeletePostLoading] = useState(false)
  let [deletePostError, setDeletePostError] = useState(false)
  let [deletePostSuccess, setDeletePostSuccess] = useState(false)

  // Add post form state
  let [showPostForm, setShowPostForm] = useState(false)

  // PATCH request states using data from child to parent
  let [editPostSuccess, setEditPostSuccess] = useState(false)

  let [page, setPage] = useState(1)

  // GET  request
  useEffect(() => {
    setPostLoading(true)
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        if (res.ok) {
          return res
        } else {
          throw res
        }
      })
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        setPosts(data)
        setPostLoading(false)
      })
      .catch(error => {
        setPostLoading(false)
        setPostError(true)
      })
  }, [])

  // DELETE request
  function deletePost (postId) {
    setDeletePostLoading(true)
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          return res
        } else {
          throw res
        }
      })
      .then(() => {
        setDeletePostLoading(false)
        setDeletePostSuccess(true)
        // var myModal = new window.bootstrap.Modal(document.getElementById("deleteid" + postId), {keyboard : true})
        // myModal.hide()
        // console.log(`working on ld ${postId}`)
        window.scrollTo(0, 0)
      })
      .catch(() => {
        setDeletePostLoading(false)
        setDeletePostError(true)
        window.scrollTo(0, 0)
      })
  }

  let listItems = posts.slice(page * 10 - 10, page * 10).map(post => (
    <List
      // onEdit={() => editPost(post.id)}
      onDelete={() => deletePost(post.id)}
      deleteLoading={deletePostLoading}
      onPatchSuccess={() => setEditPostSuccess(true)}
      key={post.id}
      userid={post.userId}
      id={post.id}
      title={post.title}
      body={post.body}
    />
  ))

  const pageSelected = pageNo => {
    if (pageNo >= 1 && pageNo <= posts.length / 10) {
      setPage(pageNo)
    }
  }

  let pageNumber = [...Array(posts.length / 10)].map((_, index) => (
    <span
      className={page === index + 1 ? 'selected__page' : ''}
      onClick={() => pageSelected(index + 1)}
      key={index}
    >
      {index + 1}
    </span>
  ))

  return (
    <div>
      {addPostSuccess && (
        <div className='alert alert-success d-flex justify-content-between'>
          <p>Your POST request is Successfully executed...</p>
          <button
            className='btn btn-success'
            onClick={() => setAddPostSuccess(false)}
          >
            Hide Alert
          </button>
        </div>
      )}
      {editPostSuccess && (
        <div className='alert alert-success d-flex justify-content-between'>
          <p>Your PATCH request is Successfully executed...</p>
          <button
            className='btn btn-success'
            onClick={() => setEditPostSuccess(false)}
          >
            Hide Alert
          </button>
        </div>
      )}

      {deletePostSuccess && (
        <div className='alert alert-success d-flex justify-content-between'>
          <p>Your DELETE request is Successfully executed...</p>
          <button
            className='btn btn-success'
            onClick={() => setDeletePostSuccess(false)}
          >
            Hide Alert
          </button>
        </div>
      )}

      {postError && (
        <div className='alert alert-danger d-flex justify-content-between'>
          <p>An Error occured during GET request...</p>
          <button
            className='btn btn-outline-secondary'
            onClick={() => setPostError(false)}
          >
            Hide Alert
          </button>
        </div>
      )}

      {addPostError && (
        <div className='alert alert-danger'>A POST Error has occured...</div>
      )}

      {deletePostError && (
        <div className='alert alert-danger d-flex justify-content-between'>
          <p>Your DELETE request has been rejected...</p>
          <button
            className='btn btn-outline-secondary'
            onClick={() => setDeletePostError(false)}
          >
            Hide Alert
          </button>
        </div>
      )}

      <table className='table table-striped'>
        <thead>
          <tr>
            <th>UserId</th>
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{listItems}</tbody>
      </table>

      <div className='pagination'>
        <span onClick={() => pageSelected(page - 1)}>
          <b>PREV</b>
        </span>
        {pageNumber}
        <span onClick={() => pageSelected(page + 1)}>
          <b>NEXT</b>
        </span>
      </div>

      {postLoading && (
        <div className='loader'>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'
            alt='loader when GET method is used '
          ></img>
        </div>
      )}

      {addPostLoading && (
        <div className='loader '>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'
            alt='loader when POST  method is used'
          ></img>
        </div>
      )}

      {deletePostLoading && (
        <div className='loader '>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif'
            alt='loader when POST  method is used'
          ></img>
        </div>
      )}

      {showPostForm && <AddPostForm />}

      <div className='d-flex justify-content-center mb-4'>
        {!showPostForm && (
          <button
            className='btn btn-primary '
            onClick={() => setShowPostForm(true)}
          >
            Add New Post
          </button>
        )}
      </div>
    </div>
  )

  function AddPostForm () {
    let [inputTitle, setInputTitle] = useState('')
    let [inputBody, setInputBody] = useState('')
    let [inputUserId, setInputUserId] = useState('')
    //  this is called TWO WAY  BINDING of data , state banao fir usko onchange se handle kar lo
    const inputTitleHandler = event => {
      setInputTitle(event.target.value)
    }
    const inputBodyHandler = event => {
      setInputBody(event.target.value)
    }
    const inputUserIdHandler = event => {
      setInputUserId(event.target.value)
    }

    function postReq (event) {
      event.preventDefault()
      setAddPostLoading(true)
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: inputTitle,
          body: inputBody,
          userId: inputUserId
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
        .then(res => {
          if (res.ok) {
            return res
          } else {
            throw res
          }
        })
        .then(response => {
          setAddPostLoading(false)
          response.json()
        })
        .then(postSuccess => {
          setAddPostSuccess(true)
          setShowPostForm(false)
          window.scrollTo(0, 0)
        })
        .catch(error => {
          setAddPostLoading(false)
          setAddPostError(true)
          window.scrollTo(0, 0)
        })
    }
    return (
      <div className='container text-center'>
        <form className='row' onSubmit={postReq}>
          <div className='col-4'>
            <label className='form-label'>
              <b>Title </b>
            </label>
            <input
              className='form-control'
              type='text'
              name='title'
              value={inputTitle}
              onChange={inputTitleHandler}
              placeholder='Enter POST Title here..'
              id='title-input'
              required
            ></input>
          </div>
          <div className='col-4'>
            <label className='form-label'>
              <b>Body </b>
            </label>
            <input
              className='form-control'
              type='text'
              name='body'
              value={inputBody}
              onChange={inputBodyHandler}
              placeholder='Enter Body of POST here..'
              required
            ></input>
          </div>
          <div className='col-4'>
            <label className='form-label'>
              <b>UserId </b>
            </label>
            <input
              className='form-control'
              type='text'
              name='userid'
              value={inputUserId}
              onChange={inputUserIdHandler}
              placeholder='Enter User Id here..'
              required
            ></input>
          </div>
          <div className='col m-3'>
            <button
              className='btn btn-secondary  '
              onClick={() => setShowPostForm(false)}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='btn btn-primary mx-2'
              disabled={addPostLoading}
            >
              {addPostLoading ? 'Loading...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default App
