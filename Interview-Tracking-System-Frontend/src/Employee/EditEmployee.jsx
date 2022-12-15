import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import AdminHeader from '../Component/AdminHeader';
import EmployeeService from '../Service/EmployeeService';

function EditEmployee(){

    const history = useNavigate();

    const{id}=useParams();

    const [employee, setEmployee] = useState({ 
        employeeId: '', 
        employeeName: '', 
       
     })

     useEffect(() => {
        if (id) {
            getEmployeeById(id)
        }
     })

      const getEmployeeById = async (id) => {
      let employee= await (await EmployeeService.getEmployeeById(id)).data;
      setEmployee(employee)
   }

   const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.placeholder]: e.target.value });
 }
  
 
    const {register, handleSubmit} = useForm();
 
    const editEmployee =employee => {
        EmployeeService.updateEmployee(id,employee).then(response =>{
            alert("Updated successfully");
            history('/ShowEmployees')
        })
        
    }
 
    return (
        <div><AdminHeader/>
       <div className="addCandidate">
            <div className="addCandidate-form">

               <form onSubmit={handleSubmit(editEmployee)}>

               <input type="text" name="employeeId" placeholder="Employee Id" value={employee.employeeId} onChange={handleChange} className="form-control"
                {...register("employeeId")}/>

               <input type="text" name="employeeName" placeholder="Employee Name" defaultValue={employee.employeeName} onChange={(e) => handleChange(e)}  className="form-control"
                 {...register("employeeName")}/>
               
                <br></br><button type="submit" className="btn btn-primary">Update</button>
            </form>
            </div>
        </div>
        </div>
 
    )
    }
 
export default EditEmployee;