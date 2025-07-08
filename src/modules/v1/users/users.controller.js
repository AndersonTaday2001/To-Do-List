import serviceUser from "./users.service.js";

const userController = {
  registerUser: async (req, res) => {
    try {
      const user = await serviceUser.register(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  loginUser: (req, res) => {
    res.send("Login User");
  },

  logoutUser: (req, res) => {
    res.send("logout User");
  },
  
  deleteUser: (req, res) => {
    res.send("Delete User");
  },
};

export default userController;
