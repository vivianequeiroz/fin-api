# FinApi - A Financial API 

## Application goal 

Build an API for a financial system in order to practice the main concepts of Node.js 
## Requirements

- [x] It must be possible to create an account 
- [x] It must be possible to search a customer bank statement
- [ ] It must be possible to make a bank deposit
- [ ] It must be possible to make a bank withdrawal
- [ ] It must be possible to search for a customer bank statement by date
- [ ] It must be possible to update customer account data
- [ ] It must be possible to get customer account data
- [ ] It must be possible to dele an account 

## Business Rules 
- [x] It must not be possible to register an account with an existing CPF (an ID for brazilians like SIN or SSN number)
- [ ] It must not be possible to ake a bank deposit in a non-existing account
- [ ] It must not be possible to search for a a bank withdrawal in a non-existing account
- [ ] It must not be possible to make a bank withdrawal in a non-existing account
- [ ] It must not be possible to delete a non-existing account
- [ ] It must not be possible to make a bank withdrawal when the balance is insufficient

## Tecnologies used

- Node.js 
- Express
- Nodemon
- Insomnia

## To test in your machine 

  - Clone this repository
  - To install the necessary dependencies, use one of the commands:
    - **$ yarn install** 
    - **$ npm install** or a shortcut **npm i** 
  - To start the server, use one of the commands:
    - **$ yarn dev**  
    - **$ npm run dev** 