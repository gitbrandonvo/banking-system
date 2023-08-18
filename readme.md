# Banking System Exercise

Welcome! This was practice creating a Banking System in Javascript! This project simulates a basic banking system that handles different types of accounts, transactions, and interest calculations. The end of this readme contains my reflections.

### Requirements
Create a banking system that handles different types of accounts, transactions, and interest calculations. Implement the following features:
   - Create a base class `Account` with properties: `accountNumber`, `accountHolder`, and `balance`.
   - Create subclasses `CheckingAccount` and `SavingsAccount` that inherit from `Account`.
   - `CheckingAccount` should have an additional property `overdraftLimit`.
   - Implement methods for depositing and withdrawing money from accounts. Consider overdraft limits for `CheckingAccount`.
   - Implement a method to calculate the interest for an account with a given interest rate.
   - Create a class `Bank` that maintains a collection of accounts.
   - Implement methods to add accounts to the bank, perform transactions, and display account details.
   - Client code demonstrating use.
   - Challenges & Considerations:
   - Handling cases like insufficient balance and invalid account numbers
   - Potential enhancements like fund transfers between accounts.

### Implemented Overview

### Account Classes

- The `Account` class serves as the base class with properties like `accountNumber`, `accountHolder`, and `balance`.
- Derived classes include `CheckingAccount` and `SavingsAccount`, each inheriting from `Account`.
- `CheckingAccount` introduces an additional property, `overdraftLimit`.

### Operations

- Methods have been implemented for depositing and withdrawing money from accounts. Special consideration is given to the overdraft limit for `CheckingAccount`.
- A method calculates interest for an account based on a given interest rate.

### Bank Class

- The `Bank` class maintains a collection of accounts.
- It provides methods to add accounts, perform transactions, and display account details.

### Client Code

- The client code demos on creation of account instances and executes transactions using the `Bank` class.
- After transactions, transaction/error message and balances are displayed.

## Challenges and Considerations

- Handles cases like insufficient balance and invalid account numbers
- Fund transfers between accounts

## Usage Methods

1. Open file directly in Github, copy contents, and paste into developer tools console (Shortcut: F12 on most browsers)
2. Clone this repository, open in a supported development environment, and run the code.

### Basic Usage

```javascript
// Create instances of different types of accounts
const bank = new Bank();
const checkingAccount = new CheckingAccount("Brandon Vo", "A001", 1000, 300));
const savingsAccount = new SavingsAccount("Jered Smith", "A003", 3000);

// Add accounts to the bank
bank.addAccount(checkingAccount);
bank.addAccount(savingsAccount);

// Perform transactions
bank.deposit("A001", 300);
bank.withdraw("A001", 200);
bank.transfer("A002", "A003", 500);

//Calculate interest
bank.calculateInterest("A003", 5);

// Display account details
bank.displayAccounts();
```

### Client Code

```javascript
// Create a bank instance
const bank = new Bank();

// Create account instances
const checkingAccount = new CheckingAccount("Aliah Hope", "A002", 1500, 300));
const savingsAccount = new SavingsAccount("Jered Smith", "A003", 3000);

// Add accounts to the bank
bank.addAccount(new CheckingAccount("Brandon Vo", "A001", 1000, 300));
bank.addAccount(checkingAccount);
bank.addAccount(savingsAccount);

// Perform transactions using the bank
bank.deposit("A001", 300);
bank.withdraw("A001", 200);
bank.withdraw("A003", 
bank.transfer("A002", "A003", 500);

//withdraw based on given account number & interest rate 
bank.withdraw("A003", bank.calculateInterest("A003", 5));

// Display account details after transactions
bank.displayAccounts();
```

## My Reflections

The banking system meets requirements and works as expected. While requirements were the focus, post review, I see that there are definite improvements can be made.
- This project mainly focused on backend logic.. a natural progression could involve creating a user interface to interact with the system.
- Refining conditional logic: refining logic and adding validation for acceptable deposits, withdraws, overdraft limits, transfers, edge cases, etc.
- Data persistence could be implemented through something like a database or file system. 
- Address data integrity: can be addressed using a RDMS (ex. transactions).
- With RDMS: Prevent duplicate account numbers and unique account holders
- Utilizing more robust error handling starting with methods like try-catch(-finally) blocks
- Encapsulate fields (#)
- Implement account history?? A possible thought on implementation: add another account property assigned to an array that will store future transactions. Create a class representing a transaction. Implement into the existing methods with details of each transaction and adding transaction objects to that array
- Using constants for the account types
