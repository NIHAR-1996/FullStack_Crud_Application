import React from "react";
import "./tabledata.css";
import Button from "@mui/material/Button";

export const Tabledata = ({
  fetchData, handleUpdate,handleDelete
}) => {
 
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th> Email</th>
            <th>Mobile No</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {fetchData &&
            fetchData.length > 0 &&
            fetchData.map((item) => (
              <tr key={item._id}>
                <td> {item.name}</td>
                <td>{item.email}</td>
                <td>{item.mobile}</td>
                
                <td>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ margin: "5px" }}
                    onClick={() => handleUpdate(item._id)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ margin: "5px" }}
                    onClick={()=>handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
