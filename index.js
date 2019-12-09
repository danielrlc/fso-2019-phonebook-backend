const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
]

app.get('/api/persons', (request, response) => {
  response.send(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.get('/info', (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`,
  )
})

const generateId = () => {
  return Math.floor(Math.random() * 1000000000)
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  const nameIsNotUnique = Boolean(
    persons.find(person => person.name === body.name),
  )

  if (!body.name && !body.number) {
    return response.status(400).json({
      error: 'name and number are missing',
    })
  } else if (!body.name) {
    return response.status(400).json({
      error: 'name is missing',
    })
  } else if (!body.number) {
    return response.status(400).json({
      error: 'number is missing',
    })
  } else if (nameIsNotUnique) {
    return response.status(400).json({
      error: 'name must be unique',
    })
  }

  const person = {
    ...request.body,
    id: generateId(),
  }
  persons = persons.concat(person)
  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
