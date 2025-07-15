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

  loginUser: async (req, res) => {
    try {
      const user = await serviceUser.login(req.body);
      const token = serviceUser.jwt(user);
      res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60,
      })
      .status(200)
      .json({user,token});
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  logoutUser: (req, res) => {
    res.send("logout User");
  },
};

export default userController;
