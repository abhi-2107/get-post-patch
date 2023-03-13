import React from 'react'

function List(props) {
    
  return (
    <tr  >
      <td >{props.userid}</td>
      <td > {props.id}</td>
      <td >{props.title}</td>
      <td >{props.body}</td>
      <td><button className='btn btn-danger' onClick={props.onDelete}>Delete</button></td>
    </tr>
  )
}

export default List