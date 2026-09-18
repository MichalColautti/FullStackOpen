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

app.get("/api/persons", (request, response, next) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  })
  .catch((error) => next(error));
});

app.get("/info", (request, response, next) => {
  Person.countDocuments({})
    .then((count) => {
      const date = new Date();
      response.send(`
        <p>Phone book has info for ${count} people</p>
        <p>${date}</p>
    `);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
    .then((result) => {
      console.log(result);
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;
  console.log(body);
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  newPerson
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
    const { name, number } = request.body;

    Person.findByIdAndUpdate(
        request.params.id,
        { name, number },
        { new: true, runValidators: true }
    )
    .then((updatedPerson) => {
        if(updatedPerson) {
            response.json(updatedPerson)
        }
        else {
            response.status(204).end()
        }
    })
    .catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
