import React from 'react'

function List(props) {
    
  return (
    <tr  >
      <td >{props.userid}</td>
      <td > {props.id}</td>
      <td >{props.title}</td>
      <td >{props.body}</td>
      <td><a href='/'>Edit</a></td>
      <td><a href='/'>Delete</a></td>
    </tr>
  )
}

export default List