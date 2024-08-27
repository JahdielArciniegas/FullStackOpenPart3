/* eslint-disable @stylistic/js/linebreak-style */
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = String(process.argv[4])

const mongoUri = `mongodb+srv://JahdielArciniegas:${password}@cluster0.ualcr.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)


if(name && number){
  mongoose.connect(mongoUri)

  const personSchema =  new mongoose.Schema({
    name: String,
    number: String
  })

  const Person = mongoose.model('Person', personSchema)

  const person =  new Person({
    name: `${name}`,
    number: `${number}`
  })

  person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}else{
  mongoose.connect(mongoUri)

  const personSchema =  new mongoose.Schema({
    name: String,
    number: String
  })

  const Person = mongoose.model('Person', personSchema)




  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

