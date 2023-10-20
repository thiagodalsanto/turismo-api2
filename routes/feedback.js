var express = require('express');
var router = express.Router();
const Feedback = require("../models/Feedback");
const { default: mongoose } = require('mongoose');

router.get("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      new mongoose.Types.ObjectId(id);
    } catch (err) {
      return res.status(400).json({ message: "Formato de ID incorreto!" });
    }
  
    const feedback = await Feedback.findById(id);
  
    return feedback
      ? res.json(feedback)
      : res.status(400).json({ mesage: "ID Inexistente" });
  }); 

  /**
   * Obter as avaliações da API por userId
   */
  router.get("/:userId", async (req, res) => {
    const { userId } = req.params;
  
    try {
      new mongoose.Types.ObjectId(userId);
    } catch (err) {
      return res.status(400).json({ message: "Formato de ID incorreto!" });
    }
  
    const feedbacks = await Feedback.find({ userId });
    
    return feedbacks.lenght > 0
      ? res.json(feedbacks)
      : res.status(400).json({ mesage: "Nenhuma avaliação encontrada para este Usuário." });
  }); 
  /**
   * Obter todos as avaliações da API
   */
  router.get('/', async (request, response) => {
    return response.json( await Feedback.find() );
  });
  
  /**
   * Cadastrar uma avaliação na collection
   */
  router.post("/", async (req, res) => {
    const feedback = req.body;
    const tourId = req.body.tourId; 
    if(Feedback.findOne({tourId})){
        return res.status(400).json({message: "O usuário ja avaliou este passeio"});
    }
    const result =  await Feedback.create(feedback);
    return res.json(result);
  });
  
  /**
   * Atualizar uma avaliação na collection
   */
//   router.put("/:id", async (req, res) => {
//     const feedback = req.body;
//     const { id } = req.params;
  
    
//     new mongoose.Types.ObjectId(id).catch(()=> {
//       return res.status(400).json({message: "Formato de ID incorreto!"})
//       });
  
//     await Feedback.findByIdAndUpdate(id, feedback).catch(()=>{ 
//       return res.status(404).json({message: "Avaliação não encontrada"})
//       });
  
//     return res.json(feedback);
    
//   });
  
  /**
   * Deletar uma avaliação na collection
   */
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    new mongoose.Types.ObjectId(id).catch(()=> {
      return res.status(400).json({message: "Formato de ID incorreto!"})
      });
  
    const feedback = await Feedback.findByIdAndDelete(id).catch(()=>{ 
      return res.status(404).json({message: "Avaliação não encontrada"})
      });;
  
    return feedback
      ? res.json(feedback)
      : res.status(404).json({ mesage: "ID Inexistente" });
  });
  
  module.exports = router;
  