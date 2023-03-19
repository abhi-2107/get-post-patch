import React from 'react'
import "./loader.scss"
import "./list.scss"

function List(props) {
  // let [modal, setModal] = useState(false);
  // const modalClick = () => {
  //   setModal(true)
  // }
  // console.log(props.deleteLoading)
  return (
    <tr >
      <td >{props.userid}</td>
      <td > {props.id}</td>
      <td title={props.title}>{props.title.slice(0, 30) + "..."}</td>
      <td title={props.body} >{props.body.slice(0, 50) + "..."}</td>
      <td>
        <button type='button' className='btn btn-primary' data-bs-toggle="modal" data-bs-target={"#editid" + props.id}>Edit</button>
        <div className="modal fade" id={"editid" + String(props.id)} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Apply PATCH method on ID : {props.id}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Please Fill the form to update Information in Id: {props.id}
                <form className="row" onSubmit={props.onEdit}>
                  <div className='col'>
                    <label><b>Title :-</b></label>
                    <input type="text" name='title' placeholder='Enter POST Title here..' id='title-input' required ></input>
                  </div>
                  <div className='col'>
                    <label><b>Body :-</b></label>
                    <input type="text" name='body' placeholder='Enter Body of POST here..' required></input>
                  </div>
                  <div className='col-4'>
                    <label> <b>UserId :-</b></label>
                    <input type="text" name='userid' placeholder='Enter User Id here..' required></input>
                  </div>
                  
                  <div className="modal-footer mt-2 col-12">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" className="btn btn-info" disabled={props.deleteLoading} >{props.deleteLoading ? "Updating..." : "Update"}</button>
              </div>
                </form>
              </div>
              {/* <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-info" disabled={props.deleteLoading} >{props.deleteLoading ? "Updating..." : "Update"}</button>
              </div> */}
            </div>
          </div>
        </div>
      </td>


      <td>
        {/* { true && <div className="loader  ">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt='loader when POST  method is used'></img>
      </div>} */}


        <button type='button' className='btn btn-danger' data-bs-toggle="modal" data-bs-target={"#id" + props.id} >Delete</button>
        <div className="modal fade" id={"id" + String(props.id)} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Apply Delete method on ID : {props.id}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Are you certain you want to delete row number {props.id} form your list?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-danger" disabled={props.deleteLoading} onClick={props.onDelete}>{props.deleteLoading ? "Deleting..." : "Delete"}</button>
              </div>
            </div>
          </div>
        </div>

      </td>
    </tr>

  )
}



export default List