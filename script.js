let firstValue = '';
let secondValue = '';
let operator = '';
let shouldResetDisplay = false;

const display = document.getElementById('display');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const decimal = document.querySelector('.decimal');
const backspace = document.querySelector('.backspace');
const percentage = document.getElementById(`percent`);

digits.forEach(button =>
  button.addEventListener('click', () => appendNumber(button.textContent))
);


operators.forEach(button =>
  button.addEventListener('click', () => setOperator(button.textContent))
);

equals.addEventListener('click', evaluate);
clear.addEventListener('click', clearCalculator);
decimal.addEventListener('click', appendDecimal);
backspace.addEventListener('click', deleteNumber);
percentage.addEventListener(`click`, percent);

function percent(){
  display.textContent /= 100;
  
}

function appendNumber(number) {
  if (display.textContent === '0' || shouldResetDisplay) {
    resetDisplay();
  }
  display.textContent += number;
  
}

function resetDisplay() {
  display.textContent = '';
  shouldResetDisplay = false;
}

function clearCalculator() {
  display.textContent = '0';
  firstValue = '';
  secondValue = '';
  operator = '';
  shouldResetDisplay = false;
}

function setOperator(op) {
  if (operator !== '') evaluate();
  firstValue = display.textContent;
  operator = op;
  shouldResetDisplay = true;
}

function evaluate() {
  if (operator === '' || shouldResetDisplay) return;
  secondValue = display.textContent;
  display.textContent = roundResult(
    operate(operator, Number(firstValue), Number(secondValue))
  );
  operator = '';
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function appendDecimal() {
  if (shouldResetDisplay) resetDisplay();
  if (!display.textContent.includes('.')) {
    display.textContent += '.';
  }
}

function deleteNumber() {
  if (shouldResetDisplay) return;
  display.textContent = display.textContent.slice(0, -1) || '0';
}

function operate(operator, a, b) {
  switch (operator) {
    
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      if (b === 0) return 'ERROR';
      return a / b;
    default:
      return null;
  }
}
