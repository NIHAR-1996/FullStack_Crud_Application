import React,{useState,useEffect} from "react";
import { Tabledata } from "./Components/TableData/TableData";
import { Modalform } from "./Components/ModalForm/Modal";
import Button from "@mui/material/Button";
import "./App.css";
import axios from "axios";
import { fetchApi } from "./redux/ApiSlice";
import { useDispatch,useSelector } from "react-redux";


function App() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [currentUserId,setCurrentUserId]=React.useState("");
 

  const data = useSelector((state) => state.Api.data);
  const [fetchData, setFetchData] = useState([]);



  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
    if (!data || data.length === 0) {
      dispatch(fetchApi());
    }
    setFetchData(data);
  }, [dispatch, data]);


  const createUser = async () => {
    const data = {
      mobile: mobile,
      email: email,
      name: name,
    };

   await axios
      .post("http://localhost:8080/api/v1/user", data)
      .then((response) => {
        if (response.status === 201) {
          handleClose();
          dispatch(fetchApi());
        }
      })
      .catch((error) => {
        console.log(error);
        handleClose();
      });
  };


  const handleUpdate = (userId) => {
    const data = fetchData.find((item) => item._id === userId);
    setName(data.name);
    setEmail(data.email);
    setMobile(data.mobile);
    setCurrentUserId(data._id)
    handleOpen();
  };

  const updateUser= async (userId) =>{
    console.log("Clicked Row ID for Update:", userId);
    const updatedData={
      name:name,
      email:email,
      mobile:mobile
      
    };
    

    await axios
    .patch(`http://localhost:8080/api/v1/user/${userId}`,updatedData)
    .then((response)=>{
      if(response.status===200){
        handleClose();
        dispatch(fetchApi());
      }
    })
    .catch((error) => {
      console.log(error);
      handleClose();
    });
  }

  const handleSubmit=()=>{
    if(currentUserId){
      updateUser(currentUserId);
    }
    else{
      createUser();
    }
  }

  const handleDelete= async (userId)=>{
    console.log("Clicked Row ID for Delete:", userId);
    await axios.delete(`http://localhost:8080/api/v1/user/${userId}`)
   
    .then((response)=>{
      if(response.status===201){
        dispatch(fetchApi());
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  }


  return (
    <div className="App">
      <div>
        <Button variant="contained" color="success" onClick={handleOpen}>
          Create
        </Button>
      </div>

      <div className="table-div">
        <Tabledata 
        fetchData={fetchData}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        />
      </div>

      <Modalform
        handleClose={handleClose}
        open={open}
        createUser={createUser}
        setName={setName}
        setEmail={setEmail}
        setMobile={setMobile}
        name={name}
        email={email}
        mobile={mobile}
        currentUserId={currentUserId}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default App;
