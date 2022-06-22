const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {validationResult} = require('express-validator')
const Comment = require('../models/comments')
const router = Router()
const path = require('path')
const uuid = require('uuid')

router.post('/create', [
], async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(),
            message: 'Incorrect data'})
        }

        const {id, userName, userText, newsId} = req.body 

        const data = new Comment({newsId, userId: id, name: userName, text: userText})

        await data.save()

        res.status(201).json({message: 'The comment is created'})

    } catch (e) {
        res.status(500).json({message: 'Something is going wrong...'})
    }
})

router.get('/find/:id', [
], async (req, res) => {
  try {
      const comment = await Comment.find({newsId: req.params.id})
      res.json(comment)
  } catch (e) {
    res.status(500).json({ message: `Что-то пошло не так, попробуйте снова` })
  }
})

router.delete('/:id', [
], async (req, res) => {
  try {
      const comment = await Comment.deleteOne({_id: req.params.id})
      res.json(comment)
  } catch (e) {
    res.status(500).json({ message: `Что-то пошло не так, попробуйте снова` })
  }
})


module.exports = router