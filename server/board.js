const mongoose = require('mongoose')
const Schema = mongoose.Schema
const dateFormat = require('dateformat')
const now = new Date()

const BoardSchema = new Schema(
  {
    author: {
      type: String,
      default: '관리자'
    },
    tit: {
      type: String,
      unique: true,
      index: true
    },
    cont: {
      type: String
    },
    createdAt: {
      type: String,
      default: getDate(now)
    },
    reply: []
  },
  { virtuals: true }
)

BoardSchema.virtual('createdDate')
  .get(() => {
    return getDate(this.createdAt)
  })
  .set(createdDate => {
    console.log('createdDate:', createdDate)
  })

function a () {
  return getDate(now)
}

console.log('gg', getDate(now))
console.log(a())
function getDate (dateObj) {
  if (dateObj instanceof Date) {
    return (
      dateObj.getFullYear() +
      '-' +
      get2digits(dateObj.getMonth() + 1) +
      '-' +
      get2digits(dateObj.getDate())
    )
  }
}

function get2digits (num) {
  return ('0' + num).slice(-2)
}

const Board = mongoose.model('board', BoardSchema)
module.exports = Board
