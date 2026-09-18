require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const Person = require("./models/person");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "dist")));

morgan.token("body", (req) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/info", (request, response) => {
  Person.countDocuments({}).then((count) => {
    const date = new Date();
    response.send(`
        <p>Phone book has info for ${count} people</p>
        <p>${date}</p>
    `);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findById(id).then((person) => {
    response.json(person);
  });
});

// app.delete('/api/persons/:id', (request, response) => {
//     const id = request.params.id
//     persons = persons.filter((person) => person.id !== id)

//     response.status(204).end()
// })

// const generateId = () => {
//     return String(Math.floor(Math.random() * 10000))
// }

// app.post('/api/persons', (request, response) => {
//     const body = request.body
//     console.log(body)

//     if(!body.name || !body.number) {
//         return response.status(400).json({
//             error: 'name or number missing'
//         })
//     }

//     if(persons.some((person) => person.name === body.name)) {
//         return response.status(400).json({
//             error: 'name already in phonebook'
//         })
//     }

//     const newPerson = {
//         id: generateId(),
//         name: body.name,
//         number: body.number,
//     }

//     persons = persons.concat(newPerson)

//     response.json(newPerson)
// })

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
