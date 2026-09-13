const express = require('express')
const app = express()

const persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const numberOfPeople = persons.length
    const date = new Date()

    response.send(`
        <p>Phone book has info for ${numberOfPeople} people</p>
        <p>${date}</p>
    `)
})
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find((person) => person.id === id)
    
    if(person === undefined) {
        return response.status(404).json({
            error: 'person not found'
        })
    }

    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})