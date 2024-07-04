const User = require("../models/user");


const getUser = async (req, res) => {
  try {
    const data = await User.find();
    res.json({ success: true, data });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

// const updateUser=async(req,res)={
//     await User.findByIdAndUpdate(req.params.id,{});
// }

const createNewUser = async (req, res) => {
  const body = req.body;

  if (!body || !body.name || !body.email || !body.mobile) {
    return res.status(400).json({ msg: "All fields are required!" });
  }

  try {
    const result = await User.create({
      name: body.name,
      email: body.email,
      mobile: body.mobile,
    });
    return res.status(201).json({ msg: "Success", id: result.id });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const updateUser = async (req, res) => {
    const {mobile,name,email}=req.body;
    const userId=req.params.id;
    console.log("dfghj",userId);
    if(!userId){
        return res.status(400).json({msg:"User Id required!!"});
    }
    try{
        const update= await User.findByIdAndUpdate(
            {_id:userId},
            {$set:{mobile:mobile,name:name,email:email}},
            {new:true});
        if(!update){
            return res.status(404).json({msg:"User not found"});
        }
        return res.json({ success: true, data: update });
    }
    catch(error){
        return res.status(500).json({ success: false, error: error.message });
    }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(401).json({ msg: "User not Found!" });
    }
    return res.status(201).json({ msg: "Success" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
module.exports = {
  getUser,
  createNewUser,
  updateUser,
  deleteUser,
};
