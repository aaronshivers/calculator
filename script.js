const calculator = document.querySelector('.calculator')
const display = document.querySelector('.calculator__display')
const keys = document.querySelector('.calculator__keys')

const getKeyType = key => {
  const { action } = key.dataset
  if (!action) return 'number'
  if (
    action === 'add' ||
    action === 'subtract' ||
    action === 'multiply' ||
    action === 'divide'
  ) return 'operator'
  return action
}

const createResultString = (key, displayedNum, state) => {
  const keyContent = key.textContent
  const { firstValue, modValue, operator, previousKeyType } = state
  const keyType = getKeyType(key)

  if (keyType === 'number') {
    return displayedNum === '0' ||
      previousKeyType === 'operator' ||
      previousKeyType === 'calculate'
      ? keyContent
      : displayedNum + keyContent
  }

  if (keyType === 'decimal') {
    if (!displayedNum.includes('.')) return displayedNum + '.'
    if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.'
    return displayedNum
  }

  if (keyType === 'operator') {
    return firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate'
      ? calculate(firstValue, operator, displayedNum)
      : displayedNum
  }

  if (keyType === 'clear') return 0

  if (keyType === 'calculate') {
    return firstValue
      ? previousKeyType === 'calculate'
        ? calculate(displayedNum, operator, modValue)
        : calculate(firstValue, operator, displayedNum)
      : displayedNum
  }
}

const updateVisualState = (key, calculator) => {
  const keyType = getKeyType(key)

  Array
    .from(key.parentNode.children)
    .forEach(k => k.classList.remove('is-depressed'))

  if (keyType === 'operator') key.classList.add('is-depressed')

  if (keyType === 'clear' && key.textContent !== 'AC') {
    key.textContent = 'AC'
  }

  if (keyType !== 'clear') {
    const clearButton = calculator.querySelector('[data-action=clear]')
    clearButton.textContent = 'CE'
  }
}

const updateCalculatorState = (key, calculator, calculatedValue, displayedNum) => {
  // const { action } = key.dataset

  const keyType = getKeyType(key)
  const { firstValue, previousKeyType, modValue, operator } = calculator.dataset

  calculator.dataset.previousKeyType = keyType

  // if (keyType === 'number') {}

  // if (keyType === 'decimal') {
  //   calculator.dataset.previousKeyType = 'decimal'
  // }

  if (keyType === 'operator') {
    calculator.dataset.operator = key.dataset.action
    calculator.dataset.firstValue = firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate'
      ? calculatedValue
      : displayedNum
  }

  if (keyType === 'clear' && key.textContent === 'AC') {
    calculator.dataset.firstValue = ''
    calculator.dataset.modValue = ''
    calculator.dataset.operator = ''
    calculator.dataset.previousKeyType = ''
  }

  if (keyType === 'calculate') {
    calculator.dataset.modValue = firstValue &&
      previousKeyType === 'calculate'
      ? modValue
      : displayedNum
  }
}

const calculate = (n1, operator, n2) => {
  const a = parseFloat(n1)
  const b = parseFloat(n2)

  switch (operator) {
    case 'add':
      return a + b
    case 'subtract':
      return a - b
    case 'multiply':
      return a * b
    case 'divide':
      return a / b
  }
}

keys.addEventListener('click', e => {
  if (!e.target.matches('button')) return
  const key = e.target
  const displayedNum = display.textContent
  const resultString = createResultString(key, displayedNum, calculator.dataset)

  display.textContent = resultString
  updateCalculatorState(key, calculator, resultString, displayedNum)
  updateVisualState(key, calculator)
})
