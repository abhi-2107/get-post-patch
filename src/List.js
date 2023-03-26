import React, { useState } from 'react'
import './loader.scss'
import './list.scss'

// memoization or caching line 5 to 16
// const modals = {}
// function getModal (id) {
//   if (modals[id]) {
//     return modals[id]
//   }
//   const myModal = new window.bootstrap.Modal(document.getElementById(id), {
//     keyboard: false
//   })
//   modals[id] = myModal
//   return myModal
// }

function List (props) {
  let [editPostLoading, setEditPostLoading] = useState(false)

  let [editTitle, setEditTitle] = useState(props.title)
  let [editBody, setEditBody] = useState(props.body)
  let [editUserId, setEditUserId] = useState(props.userid)

  const handleEditTitle = event => {
    setEditTitle(event.target.value)
  }
  const handleEditBody = event => {
    setEditBody(event.target.value)
  }
  const handleEditUserId = event => {
    setEditUserId(event.target.value)
  }

  function editPost (editId, event) {
    event.preventDefault()
    setEditPostLoading(true)
    fetch(`https://jsonplaceholder.typicode.com/posts/${editId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: editTitle,
        body: editBody,
        userId: editUserId
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(response => {
      response.json()
      setEditPostLoading(false)
      props.onPatchSuccess()
      window.scrollTo(0, 0)
    })
    // getModal('editid' + editId).hide()
    window.bootstrap.Modal.getOrCreateInstance(
      document.getElementById('editid' + editId)
    ).hide()
  }
  return (
    <tr>
      <td>{props.userid}</td>
      <td> {props.id}</td>
      <td title={props.title}>{props.title.slice(0, 30) + '...'}</td>
      <td title={props.body}>{props.body.slice(0, 50) + '...'}</td>
      <td>
        <button
          type='button'
          className='btn btn-primary'
          onClick={() => {
            // getModal('editid' + String(props.id)).show()
            window.bootstrap.Modal.getOrCreateInstance(
              document.getElementById('editid' + props.id)
            ).show()
          }}
        >
          Edit
        </button>
        <div
          className='modal fade'
          id={'editid' + String(props.id)}
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h1 className='modal-title fs-5'>
                  Apply PATCH method on ID : {props.id}
                </h1>
                <span>{'editid' + String(props.id)}</span>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className='modal-body'>
                Please Fill the form to update Information in Id: {props.id}
                {/* after passing event as argument in onSubmit I got proper response of PATCH. page is not refreshing again */}
                <form
                  className='row'
                  onSubmit={event => editPost(props.id, event)}
                >
                  <div className='col'>
                    <label>
                      <b>Title :-</b>
                    </label>
                    <input
                      type='text'
                      name='title'
                      value={editTitle}
                      onChange={handleEditTitle}
                      placeholder='Enter POST Title here..'
                      id='title-input'
                      required
                    ></input>
                  </div>
                  <div className='col'>
                    <label>
                      <b>Body :-</b>
                    </label>
                    <input
                      type='text'
                      name='body'
                      value={editBody}
                      onChange={handleEditBody}
                      placeholder='Enter Body of POST here..'
                      required
                    ></input>
                  </div>
                  <div className='col-4'>
                    <label>
                      {' '}
                      <b>UserId :-</b>
                    </label>
                    <input
                      type='text'
                      name='userid'
                      value={editUserId}
                      onChange={handleEditUserId}
                      placeholder='Enter User Id here..'
                      required
                    ></input>
                  </div>

                  <div className='modal-footer mt-2 col-12'>
                    <button
                      type='button'
                      className='btn btn-secondary'
                      data-bs-dismiss='modal'
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      className='btn btn-info'
                      disabled={editPostLoading}
                    >
                      {editPostLoading ? 'Updating...' : 'Update'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </td>

      <td>
        {/* { true && <div className="loader  ">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt='loader when POST  method is used'></img>
      </div>} */}

        <button
          type='button'
          className='btn btn-danger'
          data-bs-toggle='modal'
          data-bs-target={'#deleteid' + props.id}
        >
          Delete
        </button>
        <div
          className='modal fade'
          id={'deleteid' + String(props.id)}
          tabIndex='-1'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h1 className='modal-title fs-5' id='exampleModalLabel'>
                  Apply Delete method on ID : {props.id}
                </h1>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
              <div className='modal-body'>
                Are you certain you want to delete row number {props.id} form
                your list?
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-bs-dismiss='modal'
                >
                  Cancel
                </button>
                <button
                  type='button'
                  className='btn btn-danger'
                  disabled={props.deleteLoading}
                  onClick={props.onDelete}
                >
                  {props.deleteLoading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default List
