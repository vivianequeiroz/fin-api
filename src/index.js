const express = require("express");
const { v4: uuidv4 } = require("uuid"); //
const app = express();

app.use(express.json());

/**
 * CPF - string => necessary to open an account
 * name - string => necessary to open an account
 * id - uuid (universal unique identifier)=> generated at the account creation
 * statement - []
 */

const customers = [];

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf // some => return boolean
  );

  if (customerAlreadyExists) {
    return response.status(400).json({ error: "Customer already exists" });
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: [],
  });

  return response.status(201).send();
});

app.get("/statement", (request, response) => {
  const { cpf } = request.headers;

  const customer = customers.find((customer) => customer.cpf === cpf); // find return data

  if (!customer) {
    return response.status(400).json({ error: "Customer not found." });
  }

  return response.json(customer.statement);
});

app.listen(3333);
