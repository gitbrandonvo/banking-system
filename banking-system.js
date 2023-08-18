class Bank {
    accountsList = [];
    constructor(accounts = []) {
        this.accountsList = accounts;
    }

    //Display accounts
    displayAccounts = () => {
        console.log("Established accounts:")
        for (const account of this.accountsList) {
            console.log(`--------------------------\n`)
            for (const property in account) {
                console.log(`${property}: ${account[property]}`);
            }
            console.log(`\n`)
        }
    }

    //Add an account to accountsList array in bank obj
    addAccount = (Account) => {
        this.accountsList.push(Account);
    }

    //Verify account number is a string, exists within accountsList and amount is a number
    //Returns index of where the account is located in the accountList array, otherwise -1.
    isAccountAndAmountIsNumber = (acctNumber, amount) => {
        if (typeof acctNumber == "string" && typeof amount == "number") {
            for (let i = 0; i < this.accountsList.length; i++) {
                const account = this.accountsList[i];
                if (account.accountNumber == acctNumber) {
                    return i;
                }
            } return -1;
        } else {
            console.log(`Invalid account number or amount.`);
            return -1;
        }
    }

    /*Deposit function
    Validates if isAccountAndAmountIsNumber() != -1 and uses index returned by the function.
    Returns boolean*/
    deposit = (acctNumber, depositAmount) => {
        const accountIndex = this.isAccountAndAmountIsNumber(acctNumber, depositAmount);
        if (accountIndex != -1) {
            const account = this.accountsList[accountIndex];
            account.balance += depositAmount
            console.log(`Deposited $${depositAmount}. Balance: $${account.balance}`)
            return true;
        } return false;
    }

    /*Withdraw function
    - Validates if isAccountAndAmountIsNumber() != -1 and uses index returned by the function.
    - If account exists, it checks the account type and withdraws only if it is a Checkings or Savings account. 
    - If it is a checkings account, the overdraft limit is added to the balance to evaluate if a withdraw is allowed. Assumption: bank allows withdrawing existing balance + overdraft limit*/
    withdraw = (acctNumber, withdrawAmount) => {
        const accountIndex = this.isAccountAndAmountIsNumber(acctNumber, withdrawAmount);
        if (accountIndex != -1) {
            const account = this.accountsList[accountIndex];
            if (account.hasOwnProperty("accountType")) {
                switch (account.accountType) {
                    case "Checking Account":
                        if ((account.balance + account.overdraftLimit) >= withdrawAmount) {
                            account.balance -= withdrawAmount;
                            console.log(`Amount withdrawn: ${withdrawAmount}. Balance remaining: $${account.balance}`)
                            return true;
                        }
                        console.log(`Withdraw for $${withdrawAmount} unsuccessful due to insufficient balance.`);
                        return false;

                    case "Savings Account":
                        if (account.balance >= withdrawAmount) {
                            account.balance -= withdrawAmount;
                            console.log(`Amount withdrawn: $${withdrawAmount}. Balance remaining: $${account.balance}`)
                            return true;
                        }
                        console.log(`Withdraw for $${withdrawAmount} unsuccessful due to insufficient balance.`);
                        return false;

                    default:
                        console.log(`Invalid account type.`);
                        return false;
                }

            }
        }
    }

    //Calculate interest
    //Given an account number and whole number interest rate, this function will return the interest amount.
    calculateInterest = (acctNumber, wholeInterestRate) => {
        const savingsAccountIndex = this.isAccountAndAmountIsNumber(acctNumber, wholeInterestRate);
        if (savingsAccountIndex != -1) {
            const account = this.accountsList[savingsAccountIndex];
            return (account.balance * (wholeInterestRate / 100));
        }
    }

    //Transfer
    //Validates if isAccountAndAmountIsNumber() != -1 and uses index returned by the function.
    //If withdraw is successful, a deposit is made to the other account.
    transfer = (fromAccountNumber, toAccountNumber, transferAmount) => {
        const fromAccountIndex = this.isAccountAndAmountIsNumber(fromAccountNumber, transferAmount);
        const toAccountIndex = this.isAccountAndAmountIsNumber(toAccountNumber, transferAmount)

        if ((fromAccountIndex != -1) && (toAccountIndex != -1)) {
            const fromAccount = this.accountsList[fromAccountIndex];
            const toAccount = this.accountsList[toAccountIndex];
            const withdrawn = this.withdraw(fromAccount.accountNumber, transferAmount);
            if (withdrawn) {
                this.deposit(toAccount.accountNumber, transferAmount);
                console.log(`Transferred: $${transferAmount}. Remaining balance: ${fromAccount.balance}`);
                return true;
            } else {
                console.log(`Transfer of $${transferAmount} unsuccessful.`);
                return false;
            }
        }
    }
}

//Classes

class Account {
    constructor(accountHolder, accountNumber, balance) {
        this.accountHolder = accountHolder;
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
}

class CheckingAccount extends Account {

    constructor(accountHolder, accountNumber, balance, overdraftLimit) {
        super(accountHolder, accountNumber, balance);
        this.accountType = "Checking Account";
        this.overdraftLimit = overdraftLimit;
    }

}
class SavingsAccount extends Account {

    constructor(accountHolder, accountNumber, balance) {
        super(accountHolder, accountNumber, balance);
        this.accountType = "Savings Account";
    }

}

//Client code:

// const bank = new Bank();
// bank.addAccount(new CheckingAccount("Brandon Vo", "A001", 1000, 300));
// bank.addAccount(new CheckingAccount("Aliah Hope", "A002", 1500, 300));
// bank.addAccount(new SavingsAccount("Jered Smith", "A003", 3000));
// console.log(bank.accountsList[0].accountType);
// bank.withdraw("A001", 200);
// bank.withdraw("A001", 10000); //expected: unsuccessful
// bank.deposit("A001", 300);
// bank.transfer("A002", "A003", 5000); //expected: unsuccessful
// bank.transfer("A002", "A003", 500);
// bank.withdraw("A003", bank.calculateInterest("A003", 5)); //withdraw based on given account number & interest rate 
// bank.displayAccounts();
