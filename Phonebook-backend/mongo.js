const mongoose = require('mongoose')
//const password = process.argv[2]
var uniqueValidator = require('mongoose-unique-validator')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const url =
  'mongodb+srv://fullstack:admin@cluster0.0ur8t.mongodb.net/phonebook?retryWrites=true&w=majority'


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const name = process.argv[3]
const number = process.argv[4]

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, unique: true },
  number: { type: String, required: true, minlength: 8 },
})

personSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' })

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3 ){
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    }).
      mongoose.connection.close()
  })
}

if (process.argv.length > 3 ){
  const person = new Person({
    name: name,
    number: number
  })

  person.save(function (err) {
    console.log(err)
  }).then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
