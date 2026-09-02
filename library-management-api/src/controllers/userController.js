const userModel = require("../models/userModel");

async function getUsers(req, res, next) {
  try {
    const users = await userModel.all();
    res.json(users.map(({ password, ...user }) => user));
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { password, ...safeUser } = user;
    res.json(safeUser);
  } catch (error) {
    next(error);
  }
}

async function updateRole(req, res, next) {
  try {
    const { role } = req.body;

    if (!["student", "librarian"].includes(role)) {
      return res.status(400).json({ message: "Role must be student or librarian" });
    }

    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const updated = await userModel.update(req.params.id, {
      role,
      updatedAt: new Date()
    });

    const { password, ...safeUser } = updated;
    res.json({ message: "Role updated", user: safeUser });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.params.id === req.user.userId) {
      return res.status(400).json({ message: "You cannot delete your own account" });
    }

    await userModel.remove(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
}

module.exports = { getUsers, getUser, updateRole, deleteUser };