const express = require("express")
const app = express()
const morgan = require("morgan")
app.use(express.json())
app.use(morgan('tiny'))


const generatorId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(n=> n.id)):0
  
  return maxId +1;
}

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get("/api/persons",(request,response) => {
  response.json(persons)
} )

app.get("/info", (request, response) => {
  const message = `Phonebook has info for ${persons.length} people`
  const now = new Date()
  response.send(message + "<br/>" +now)
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if(person) {
    response.json(person)
  }else {
    response.status(404).end()
  }
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
  
  
  
  const person = {
    name : body.name,
    number: body.number,
    id: generatorId(),
  }
  persons = persons.concat(person)

  response.json(person)
})

const PORT = 1234

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})