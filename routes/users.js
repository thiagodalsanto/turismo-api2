var express = require('express');
var router = express.Router();
const User = require("../models/User");
const { default: mongoose } = require('mongoose');

/**
 * Obter pelo ID
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    new mongoose.Types.ObjectId(id);
  } catch (err) {
    return res.status(400).json({ message: "Tu é mt burro menó!" });
  }

  const user = await User.findById(id);

  return user
    ? res.json(user)
    : res.status(400).json({ mesage: "ID Inexistente" });
}); 

/**
 * Obter todos os usuários da API
 */
router.get('/', async (request, response) => {
  return response.json( await User.find() );
});

/**
 * Cadastrar um usuário na collection
 */
router.post("/", async (req, res) => {
  const user = req.body;
  const result =  await User.create(user);
  return res.json(result);
});

/**
 * Atualizar um usuário na collection
 */
router.put("/:id", async (req, res) => {
  const user = req.body;
  const { id } = req.params;

  user.updatedAt = Date.now();
  
  try {
    new mongoose.Types.ObjectId(id);
    await User.findByIdAndUpdate(id, user);

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ message: "Tu é mt burro menó!" });
  }  
});

/**
 * Deletar um usuário na collection
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    new mongoose.Types.ObjectId(id);
  } catch (err) {
    return res.status(400).json({ message: "Tu é mt burro menó!" });
  }

  const user = await User.findByIdAndDelete(id);

  return user
    ? res.json(user)
    : res.status(404).json({ mesage: "ID Inexistente" });
});

module.exports = router;
