import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import "./Modal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

export const Modalform = ({
  open,
  handleClose,
  setName,
  setEmail,
  setMobile,
  name,
  email,
  mobile,
  currentUserId,
  handleSubmit
}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="addData">
            <input
              placeholder="Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <br />
            <input
              placeholder="Email"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <br />
            <input
              placeholder="Mobile"
              type="number"
              onChange={(e) => setMobile(e.target.value)}
               value={mobile}
            />
            <br />
          </form>
          <Button onClick={handleSubmit}>{currentUserId ? "Update" : "Create"}</Button>
        </Box>
      </Modal>
    </div>
  );
};
