const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const schedule = require('node-schedule')
const puppeteer = require('puppeteer')
const Board = require('./board')
const mongoose = require('mongoose')
const router = express.Router()

const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  mongoose.set('useCreateIndex', true)
  mongoose.connect(
    'mongodb://admin:asdasd12@ds151753.mlab.com:51753/crwal',
    { useNewUrlParser: true }
  )

  const db = mongoose.connection

  db.on('error', console.error.bind(console, 'connection error'))

  db.once('open', callbak => {
    console.log('db connection success')
  })

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)

  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })

  // schedule.scheduleJob('*/1 * * * *', () => {
  //   const opts = {
  //     url: 'https://media.daum.net/economic',
  //     link: '.list_mainnews a.link_txt',
  //     title: '.tit_view',
  //     content: '.news_view'
  //   }

  //   crwal(opts)
  // })

  // const crwal = async opts => {
  //   const browser = await puppeteer.launch()
  //   const page = await browser.newPage()

  //   let tempArr = []
  //   let tempObj = {}
  //   await page.goto(opts.url)
  //   await page.waitForSelector(opts.link)
  //   const stories = await page.$$eval(opts.link, anchors => {
  //     return anchors.map(anchor => anchor.href).slice(0, 10)
  //   })

  //   for (let storyLink of stories) {
  //     await page.goto(storyLink)
  //     const tit = await page.$eval(opts.title, element => {
  //       return element.innerHTML
  //     })

  //     const cont = await page.$eval(opts.content, element => {
  //       return element.innerHTML
  //     })
  //     tempObj.tit = tit
  //     tempObj.cont = cont
  //     tempArr.push(tempObj)

  //     writeBoard(tit, cont)
  //   }

  //   await browser.close()
  // }

  // const writeBoard = (tit, cont) => {
  //   Board.find({ tit: tit }, (err, board, result) => {
  //     const new_contents = new Board({ tit, cont })
  //     new_contents.save(err => {
  //       err ? console.log(err) : console.log('success')
  //     })
  //   })
  // }
}
app.get('/list', (req, res) => {
  Board.find((err, boards) => {
    if (err) console.log(err)
    res.send(boards)
  }).sort('-createdAt')
})

app.get('/view/:_id', (req, res) => {
  const id = req.params
  Board.findOne({ _id: id }, (err, boards) => {
    if (err) console.log(err)
    res.send(boards)
  })
})

app.post('/writeReply/:_id', (req, res) => {
  console.dir(req.body)
  const date = new Date()
  // const replyCont = {
  //   name: req.body.name,
  //   password: req.body.password,
  //   content: req.body.content,
  //   regdate: date
  // }
  // Board.findOneAndUpdate(
  //   {
  //     _id: req.params.id
  //   },
  //   {
  //     $push: {
  //       reply: replyCont
  //     }
  //   },
  //   success => {
  //     res.redirect(req.get('referer'))
  //   }
  // )
})

start()
