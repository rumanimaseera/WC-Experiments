// Simple Calculator using Node.js

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question("Enter first number: ", (num1) => {
  readline.question("Enter operator (+, -, *, /): ", (op) => {
    readline.question("Enter second number: ", (num2) => {
      let result;
      num1 = parseFloat(num1);
      num2 = parseFloat(num2);

      switch (op) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/': 
          result = num2 !== 0 ? num1 / num2 : "Error! Division by zero"; 
          break;
        default: 
          result = "Invalid Operator";
      }

      console.log(`Result: ${result}`);
      readline.close();
    });
  });
});
