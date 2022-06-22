const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {validationResult} = require('express-validator')
const News = require('../models/news')
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

        const {typeNews, header, subtitle, content, author, typeImportant} = req.body 
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName)) 

        const data = new News({typeNews, typeImportant, header, subtitle, content, author, likes: 0, img: fileName})

        await data.save()

        res.status(201).json({message: 'The news is created'})

    } catch (e) {
        res.status(500).json({message: 'Something is going wrong...'})
    }
})

router.post('/like/:id', [
], async (req, res) => {
    try {
        const news = await News.findById(req.params.id)

        news.set({
          likes: news.likes + 1
        })

        await news.save();

        res.status(201).json({message: 'Like!'})

    } catch (e) {
        res.status(500).json({message: 'Something is going wrong...'})
    }
})

router.post('/dontlike/:id', [
], async (req, res) => {
    try {
        const news = await News.findById(req.params.id)

        news.set({
          likes: news.likes - 1
        })

        await news.save();

        res.status(201).json({message: 'Like!'})

    } catch (e) {
        res.status(500).json({message: 'Something is going wrong...'})
    }
})

router.post('/setimportant/:id', [
], async (req, res) => {
    try {
      const news = await News.findById(req.params.id)

      news.set({
        typeImportant: 1
      })

      await news.save();

      res.json(news)
    } catch (e) {
      res.status(500).json({ message: `Что-то пошло не так, попробуйте снова` })
    }
})

router.post('/setunimportant/:id', [
], async (req, res) => {
    try {
      const news = await News.findById(req.params.id)

      news.set({
        typeImportant: 0
      })

      await news.save();

      res.json(news)
    } catch (e) {
      res.status(500).json({ message: `Что-то пошло не так, попробуйте снова` })
    }
})

router.get('/', [
], async (req, res) => {
    try {
      const news = await News.find()
      res.json(news)
    } catch (e) {
      res.status(500).json({ message: `Что-то пошло не так, попробуйте снова` })
    }
})

router.get('/getpage/:id', [
], async (req, res) => {
  try {
      const news = await News.findById(req.params.id)
      res.json(news)
  } catch (e) {
    res.status(500).json({ message: `Что-то пошло не так, попробуйте снова` })
  }
})

router.get('/russia', [
], async (req, res) => {
    try {
      const news = await News.find({typeNews: 1})
      res.json(news)
    } catch (e) {
      res.status(500).json({ message: `Что-то пошло не так, попробуйте снова` })
    }
})

router.get('/importantnews', [
], async (req, res) => {
    try {
      const news = await News.find({typeImportant: 1})
      res.json(news)
    } catch (e) {
      res.status(500).json({ message: `Что-то пошло не так, попробуйте снова` })
    }
})

router.get('/world', [
], async (req, res) => {
    try {
      const news = await News.find({typeNews: 2})
      res.json(news)
    } catch (e) {
      res.status(500).json({ message: `Что-то пошло не так, попробуйте снова` })
    }
})

router.delete('/:id', [
], async (req, res) => {
  try {
      const news = await News.deleteOne({_id: req.params.id})
      const commentd = await Comment.deleteMany({newsId: req.params.id})
      res.json(news)
  } catch (e) {
    res.status(500).json({ message: `Что-то пошло не так, попробуйте снова` })
  }
})

module.exports = router