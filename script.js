// Import Elements
const input1 = document.getElementById('input1')
const input2 = document.getElementById('input2')
const inputs = document.getElementById('inputs')
const buttons = document.getElementById('buttons')
const result = document.getElementById('result')

// Sanitize Inputs
const sanitizeIt = value => value.replace(/[^\d]/g, '')

inputs.addEventListener('input', e => {
  input1.value = sanitizeIt(input1.value)
  input2.value = sanitizeIt(input2.value)
})

// Perform Calculation
const calculate = method => (a, b) => {
  switch (method) {
    case 'add':
      return a + b
    case 'subtract':
      return a - b
    case 'multiply':
      return a * b
    case 'divide':
      return a / b
    case 'clear':
      input1.value = ''
      input2.value = ''
      return '0'
    default:
      return 'error'
  }
}

// Invoke Calculate With Method and Imported Numbers
buttons.addEventListener('click', e => {
  const method = e.target.id
  const a = parseFloat(input1.value)
  const b = parseFloat(input2.value)
  result.innerHTML = calculate(method)(a, b)
})
