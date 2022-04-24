import React,{Component} from 'react';
import {variables} from './Variables.js';


export class Orderr extends Component{

    constructor(props){
        super(props);

        this.state={
            users:[],
            drugs:[],
            routes:[],
            orders:[],
            ModalTitle:"",
            OrderId:0,
            Patient_No:"",
            P_User:"",
            DateOfJoining:"",
            P_Drug:"",
            P_Route_Of_Admin:"",

        }
    }
    
    refreshList(){
        fetch(variables.API_URL+'orderr')
        .then(response=>response.json())
        .then(data=>{
            this.setState({orders:data});
        });

        fetch(variables.API_URL+'p_user')
        .then(response=>response.json())
        .then(data=>{
            this.setState({users:data});
        });

        fetch(variables.API_URL+'p_drug')
        .then(response=>response.json())
        .then(data=>{
            this.setState({drugs:data});
        });


        fetch(variables.API_URL+'p_route_of_admin')
        .then(response=>response.json())
        .then(data=>{
            this.setState({routes:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    
    changePatient_No =(e)=>{
        this.setState({Patient_No:e.target.value});
    }

    changeP_UserName =(e)=>{
        this.setState({P_User:e.target.value});
    }

    changeP_DrugName =(e)=>{
        this.setState({P_Drug:e.target.value});
    }

    changeP_Route_Of_AdminName =(e)=>{
        this.setState({P_Route_Of_Admin:e.target.value});
    }
    
    changeDateOfJoining =(e)=>{
        this.setState({DateOfJoining:e.target.value});
    }

    addClick(){
        this.setState({
            ModalTitle:"Add Order",
            OrderId:0,
            Patient_No:"",
            P_User:"",
            P_Drug:"",
            P_Route_Of_Admin:"",
            DateOfJoining:"",
        });
    }
    editClick(ord){
        this.setState({
            ModalTitle:"Edit Order",
            OrderId:ord.OrderId,
            Patient_No:ord.Patient_No,
            P_User:ord.P_User,
            P_Drug:ord.P_Drug,
            P_Route_Of_Admin:ord.P_Route_Of_Admin,
            DateOfJoining:ord.DateOfJoining,
        });
    }

    createClick(){
        fetch(variables.API_URL+'orderr',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Patient_No:this.state.Patient_No,
                P_User:this.state.P_User,
                P_Drug:this.state.P_Drug,
                P_Route_Of_Admin:this.state.P_Route_Of_Admin,
                DateOfJoining:this.state.DateOfJoining,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    updateClick(){
        fetch(variables.API_URL+'orderr',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                OrderId:this.state.OrderId,
                Patient_No:this.state.Patient_No,
                P_User:this.state.P_User,
                P_Drug:this.state.P_Drug,
                P_Route_Of_Admin:this.state.P_Route_Of_Admin,
                DateOfJoining:this.state.DateOfJoining,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'orderr/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }


    render(){
        const {
            users,
            drugs,
            routes,
            orders,
            ModalTitle,
            OrderId,
            Patient_No,
            P_User,
            P_Drug,
            P_Route_Of_Admin,
            DateOfJoining
        }=this.state;

        return(
            <div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Order
    </button>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                OrderId
                            </th>
                            <th>
                                Patient_No
                            </th>
                            <th>
                                User
                            </th>
                            <th>
                                Drug
                            </th>
                            <th>
                                Route
                            </th>
                            <th>
                                Date
                            </th>
                            <th>
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(ord=>
                            <tr key={ord.OrderId}>
                                <td>{ord.OrderId}</td>
                                <td>{ord.Patient_No}</td>
                                <td>{ord.P_User}</td>
                                <td>{ord.P_Drug}</td>
                                <td>{ord.P_Route_Of_Admin}</td>
                                <td>{ord.DateOfJoining}</td>
                                <td>
                                    
                                    <button type="button"
                                    className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={()=>this.editClick(ord)}>

                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </button>

                                    <button type="button"
                                    className="btn btn-light mr-1"
                                    onClick={()=>this.deleteClick(ord.OrderId)}>    
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                    </button>

                                </td>
                            </tr>
                            )}
                    </tbody>
                </table>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
<div className="modal-header">
       <h5 className="modal-title">{ModalTitle}</h5>
       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>                    
    <div className="modal-body">

        <div className="input-group mb-3">
        <span className="input-group-text">Patient_No</span>
        <input type="text" className="form-control"
        value={Patient_No}
        onChange={this.changePatient_No}/>
        </div>
        
        <div className="input-group mb-3">
            <span className="input-group-text">User</span>
            <select className="form-select"
            onChange={this.changeP_UserName}
            value={P_User}>
                {users.map(usr=><option key={usr.UserId}>
                    {usr.UserName}
                </option>)}
            </select>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Drug</span>
            <select className="form-select"
            onChange={this.changeP_DrugName}
            value={P_Drug}>
                {drugs.map(drg=><option key={drg.DrugId}>
                    {drg.DrugName}
                </option>)}
            </select>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Route</span>
            <select className="form-select"
            onChange={this.changeP_Route_Of_AdminName}
            value={P_Route_Of_Admin}>
                {routes.map(rte=><option key={rte.RouteId}>
                    {rte.RouteName}
                </option>)}
            </select>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">DOJ</span>
            <input type="date" className="form-control"
            value={DateOfJoining}
            onChange={this.changeDateOfJoining}/>
        </div>

        {OrderId===0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {OrderId!==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick()}
        >Update</button>
        :null}

</div>
</div>
</div>
</div>
</div>


        )
    }
}