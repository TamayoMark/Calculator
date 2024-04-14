const calculator = document.getElementById('calculator');
const displayCurrent = document.getElementById('current-operand');
const displayPrevious = document.getElementById('previous-operand');

const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const specialOperationButtons = document.querySelectorAll('.special-operation');

const equalButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const dotButton = document.getElementById('dot');

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    appendNumber(button.textContent);
    updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    chooseOperation(button.textContent);
    updateDisplay();
  });
});

specialOperationButtons.forEach(button => {
    button.addEventListener('click', () => {
      specialOperation(button.textContent);
      updateDisplay();
    });
  });

clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);
equalButton.addEventListener('click', compute);
dotButton.addEventListener('click', appendDot);

function clear() { 
    // Function to clear the calculator's state    
}

function deleteNumber() {
    // Function to delete the last digit entered or decimal    
}

function compute() {
    // Function to compute the expression    
} 

function appendDot() {
    // Function to handle decimal point input
}


let currentOperand = '';
let previousOperand = '';
let operation = null;

function appendNumber(number) {   
    if (number === '.' && currentOperand.includes('.')) 
        return; // prevent multiple decimal points
    if (number == 0 && currentOperand.length == 1 && currentOperand == 0)
        return;
    if (number > 0 && number <= 9 && currentOperand == "0")
        currentOperand = "";

    currentOperand = currentOperand.toString() + number.toString();
}

function chooseOperation(operator) {
    if (currentOperand === '') 
    return;

    if (previousOperand !== '') {
        compute();
    }

    operation = operator;
    previousOperand = currentOperand;
    currentOperand = '';
}

function specialOperation(specialOperator) {
    switch (specialOperator) {
        case 'x!':
            currentOperand = factorial(currentOperand);
            break;
        case '√x':
            currentOperand = squareRoot(currentOperand);
            break;
        case 'x²':
            currentOperand = square(currentOperand);
            break;
        default:
            return;
    }

    updateDisplay();
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    if (isNaN(prev) || isNaN(current)) 
    return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        case '%':
            computation = prev % current;
            break;
        default:
            return;
    }

    currentOperand = computation;
    operation = undefined;
    previousOperand = '';
    updateDisplay();    // Refresh the display with the new state
}

function square(num) {
    return num * num;
}

function factorial(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * factorial(num - 1);
    }
}

function squareRoot(num) {
    return Math.sqrt(num);
}

function updateDisplay() {
    displayCurrent.textContent = currentOperand;
    displayPrevious.textContent = previousOperand + ' ' + (operation || '');
}

function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
    updateDisplay();    
}

function deleteNumber() {
    currentOperand = currentOperand.toString().slice(0, -1);
    updateDisplay();
}

function appendDot() {
    if (currentOperand.includes('.')) 
    return; // prevent multiple decimal points

    if (currentOperand === '') {
        currentOperand = '0'; // if empty, start with '0.'
    }

    currentOperand += '.';
    updateDisplay();
}

document.addEventListener('keydown', (event) => {
    if (event.key >= 0 && event.key <= 9) {
        appendNumber(event.key);
    } else if (event.key === '.') {
        appendDot();
    } else if (event.key === 'Backspace') {
        deleteNumber();
    } else if (event.key === 'Enter' || event.key === '=') {
        compute();
    } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        chooseOperation(event.key);
    } else if (event.key === 'Escape') {
        clear();
    }
    updateDisplay();
});