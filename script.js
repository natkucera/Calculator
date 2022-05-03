const numbersBtn = document.querySelectorAll('[data-number]')
const operatorsBtn = document.querySelectorAll('[data-operator]')
const equalsBtn = document.querySelectorAll('[data-equals]')
const deleteBtn = document.querySelectorAll('[data-delete]')
const allClearBtn = document.querySelectorAll('[data-allClear')
const previousOperandTxt = document.querySelectorAll('[data-previousOperand]')
const currentOperandTxt = document.querySelectorAll('[data-currentOperand]')

class Calculator {
    constructor(previousOperandTxt, currentOperandTxt) {
        this.previousOperandTxt = previousOperandTxt;
        this.currentOperandTxt = currentOperandTxt;
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0 , -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand ==='') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let calculate
        const previous = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
            if (isNaN(previous) || isNaN(current)) return
            if (this.operation = '+') {
                calculate = previous + current
            } if (this.operation = '-') {
                calculate = previous - current
            } if (this.operation = '*') {
                calculate = previous * current
            } if (this.operation = '÷') {
                calculate = previous / current
            } else {
                return
            }
      
        this.currentOperand = calculate
        this.operation = undefined
        this.previousOperand =''
    }

    updateDisplay() {
        this.currentOperandTxt.innerText = this.currentOperand
        this.previousOperandTxt.innerText = this.previousOperand
        if (this.operation != null) {
            previousOperandTxt.innerText = `${this.previousOperand} ${this.operation}`
        }
    }
}

const calculator = new Calculator(previousOperandTxt, currentOperandTxt)

numbersBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operatorsBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsBtn.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearBtn.addEventListener('click', button=> {
    calculator.clear()
    calculator.updateDisplay()
})

deleteBtn.addEventListener('click', button=> {
    calculator.delete()
    calculator.updateDisplay()
})