const express = require("express")
const app = express()
const morgan = require("morgan")
require('dotenv').config()

const Person = require('./models/person')

let persons = [
]

app.use(express.static('dist'))
const cors = require("cors")
app.use(cors())
app.use(express.json())

app.use(morgan('tiny'))


const unknownEndpoint = (request, response)=> {
  response.status(404).send({error: 'unknown wndpoint'})
}

app.get("/api/persons",(request,response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
} )

app.get("/info", (request, response) => {
  const message = `Phonebook has info for ${persons.length} people`
  const now = new Date()
  response.send(message + "<br/>" +now)
})

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post("/api/persons", (request, response)=> {
  
  const body = request.body

  if(!body.name){
    return response.status(400).json({error : "name missing"})
  }
  if(!body.number){
    return response.status(400).json({error : "number missing"})
  }
  
  const truePerson = (persons.find(person => {
    if(person.name.toLowerCase() === body.name.toLowerCase()){
      return true
    }
    return
  } ))

  if(truePerson){
    {
    return response.status(400).json({error : "name must be unique"})
  }
  }
  
  
  
  const person = new Person({
    name : body.name,
    number: body.number,
  }) 

  person.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.use(unknownEndpoint)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})