const express = require("express")
const app = express()
const morgan = require("morgan")
require('dotenv').config()

const Person = require('./models/person')

app.use(express.static('dist'))
const cors = require("cors")
const person = require("./models/person")
app.use(cors())
app.use(express.json())

app.use(morgan('tiny'))


const unknownEndpoint = (request, response)=> {
  response.status(404).send({error: 'unknown endpoint'})
}

app.get("/api/persons",(request,response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
} )

app.get("/info", (request, response) => {
  Person.countDocuments({}).then(count => {
    const message = `Phonebook has info for ${count} people`;
    const now = new Date();
    response.send(message + "<br/>" + now);
  });
})

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id).then(res => {
    res.status(204).end
  })
  Person.deleteOne({name : person.name})
})

app.put("/api/persons/:id", (request, response) => {
  const body = request.body
  const person ={
    name : body.name,
    number : body.number
  }

  Person.findByIdAndUpdate(request.params.id,person ,{new : true}).then(updatePerson => {
    response.json(updatePerson)
    console.log(updatePerson)
  })
  .catch(error => {
    console.error(error);
    response.status(400).send({ error: "malformatted id" });
  });

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