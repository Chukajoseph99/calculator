const display = document.querySelector("#display");
let equal = document.querySelector("#btn-equal");
let clear = document.querySelector("#btn-clear");
let dotButton = document.querySelector("#btn-dot");
let numbers = document.querySelectorAll("#number");
let operators = document.querySelectorAll("#operator");

let displayValue = "0";
let firstNumber = "";
let operator = "";
let secondNumber = "";

function add(a,b){
    return a + b;
}
function subtract(a,b){
    return a - b;
}
function multiply(a,b){
    return a * b;
}
function divide(a,b){
    if(b !== 0){
        return a / b;
    }else{
        return "Cannot divide by zero!";
    }
}

function operate(operator, num1, num2){
let result;

if(operator === "+"){
    result = add(num1, num2);
}else if(operator === "-"){
    result = subtract(num1, num2)
}else if(operator === "*"){
    result = multiply(num1, num2)
}else if(operator === "/"){
    result = divide(num1, num2)
}else{
    result = "Invalid operator";
}

return result;
}

function updateDisplay(){
    display.innerText = displayValue;
}

function appendNumber(number){
    if(displayValue === "0"){
        displayValue = number;
    }else{
        displayValue += number;
    }
    updateDisplay();
}

numbers.forEach(button => {
    button.addEventListener('click', () => {
      appendNumber(button.innerText);
    });
  });

function appendDecimal(){
    if(!displayValue.includes(".")){
        displayValue += ".";
        updateDisplay();
    }
}

dotButton.addEventListener("click", appendDecimal);

function setOperator(opr) {
    if (firstNumber !== "") {
        secondNumber = displayValue;
        calculate();
    }
    operator = opr;
    firstNumber = displayValue;
    displayValue = '0';
    updateDisplay();
}

operators.forEach(operatorButton => {
    operatorButton.addEventListener("click", () => setOperator(operatorButton.innerText));
});


function clearDisplay(){
    displayValue = "0";
    operator = "";
    firstNumber = "";
    secondNumber = "";
    updateDisplay();
}

clear.addEventListener("click", clearDisplay);

function calculate() {
    console.log("Before calculation:", { firstNumber, operator, secondNumber });

    if (operator && firstNumber) {
        if (!secondNumber) {
            secondNumber = displayValue;
        }
        const result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
        displayValue = result.toString();
        operator = "";
        firstNumber = displayValue;
        secondNumber = "";
        updateDisplay();
    }

    console.log("After calculation:", { firstNumber, operator, secondNumber });
}


equal.addEventListener("click", calculate);