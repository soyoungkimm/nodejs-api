const { User } = require('../models');

exports.createUser = async (req, res, next) => {
    const { email, name, password } = req.body;
    try {
      const exUser = await User.findOne({ where: { email } });
      if (exUser) {
        return res.status(400).json({
          message: "user exist"
        });
      }
      const hash = await bcrypt.hash(password, 12);
      await User.create({
        email,
        name,
        password: hash,
      });
      return res.status(200).json({
        message: "join success"
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "server error"
      });
    }
};


exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id }
    });
    res.status(200).json({
      payload: user
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
        message: "server error"
    });
  }
};

exports.getUserAll = async (req, res, next) => {
  try {
    const users = await User.findAll({
      order: [['id', 'ASC']],
    });
    res.status(200).json({
      payload: users
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
        message: "server error"
    });
  }
};


exports.editUser = async (req, res, next) => {
    const { email, name } = req.body;
    try {
      const user = await User.findOne({
        where: { id: req.params.id }
      });
      user.update({
        email: email,
        name: name
      });
      res.status(200).json({
        message: "user edit success" 
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "server error"
      });
    }
  };

  exports.deleteUser = async (req, res, next) => {
    try {
      await User.destroy({
        where: { id: req.params.id }
      });
      res.status(200).json({
        message: "user delete success" 
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "server error"
      });
    }
  };


