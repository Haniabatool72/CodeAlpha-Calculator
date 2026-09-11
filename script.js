let current = '0';
let previous = '';
let operator = null;

const curEl = document.getElementById('current');
const prevEl = document.getElementById('previous');

function render() {
  curEl.textContent = current;
  prevEl.textContent = previous ? previous + ' ' + (operator || '') : '';
}

function appendNum(n) {
  if (n === '.' && current.includes('.')) return;
  if (current === '0' && n !== '.') current = n;
  else current += n;
  render();
}

function doCalc() {
  if (operator === null || previous === '') return;
  const a = parseFloat(previous);
  const b = parseFloat(current);
  let result;
  if (operator === '+') result = a + b;
  else if (operator === '-') result = a - b;
  else if (operator === '*') result = a * b;
  else if (operator === '/') result = b === 0 ? 'Error' : a / b;
  else if (operator === '%') result = a % b;
  current = String(result);
  operator = null;
  previous = '';
  render();
}

function chooseOp(op) {
  if (operator !== null) doCalc();
  previous = current;
  operator = op;
  current = '0';
  render();
}

document.querySelectorAll('[data-num]').forEach(function(btn) {
  btn.addEventListener('click', function() { appendNum(btn.getAttribute('data-num')); });
});
document.querySelectorAll('[data-op]').forEach(function(btn) {
  btn.addEventListener('click', function() { chooseOp(btn.getAttribute('data-op')); });
});
document.querySelector('[data-act="eq"]').addEventListener('click', doCalc);
document.querySelector('[data-act="clear"]').addEventListener('click', function() {
  current = '0'; previous = ''; operator = null; render();
});
document.querySelector('[data-act="del"]').addEventListener('click', function() {
  current = current.length > 1 ? current.slice(0, -1) : '0';
  render();
});

document.addEventListener('keydown', function(e) {
  if (e.key >= '0' && e.key <= '9') appendNum(e.key);
  if (e.key === '.') appendNum('.');
  if (['+', '-', '*', '/'].includes(e.key)) chooseOp(e.key);
  if (e.key === 'Enter' || e.key === '=') doCalc();
  if (e.key === 'Backspace') {
    current = current.length > 1 ? current.slice(0, -1) : '0';
    render();
  }
  if (e.key.toLowerCase() === 'c') {
    current = '0'; previous = ''; operator = null; render();
  }
});