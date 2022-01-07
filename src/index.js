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

//Middleware - a function to be executed after the request is made and before the repsonse is processed

function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers;

  const customer = customers.find((customer) => customer.cpf === cpf); // find return data

  if (!customer) {
    return response.status(400).json({ error: "Customer not found." });
  }

  request.customer = customer;

  return next();
}

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === "credit") acc + operation.amount;
    else acc - operation.amount;
  }, 0);

  return balance;
}

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

app.get("/statement ", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request; // make it possible to access the validated customer

  return response.json(customer.statement);
});

app.post("/deposit", verifyIfExistsAccountCPF, (request, response) => {
  const { description, amount } = request.body;

  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit",
  };

  customer.statement.push(statementOperation);

  return response.status(201).send();
});

app.post("/widthdraw", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  const { amount } = request.body;
  const { balance } = getBalance(customer.statement);

  const insufficientBalance = balance < amount;

  if (insufficientBalance)
    return response.status(400).json({ error: "Insufficient funds." });

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: "debit",
  };

  customer.statement.push(statementOperation);

  return response.status(201).send();
});

app.get("/statement/date ", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;
  const { date } = request.query;

  const dateFormat = new Date(date + " 00:00");

  const statement = customer.statement.filter((statement) => {
    statement.created_at.toDateString() === new Date(dateFormat).toDateString();
  });

  return response.status(200).json(statement);
});

app.listen(3333);
