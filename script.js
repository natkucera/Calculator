const numbersBtn = document.querySelectorAll('[data-number]')
const operatorsBtn = document.querySelectorAll('[data-operator]')
const equalsBtn = document.querySelector('[data-equals]')
const deleteBtn = document.querySelector('[data-delete]')
const allClearBtn = document.querySelector('[data-allClear]')
const previousOperandTxt = document.querySelector('[data-previousOperand]')
const currentOperandTxt = document.querySelector('[data-currentOperand]')

class Calculator {
    constructor(previousOperandTxt, currentOperandTxt) {
        this.previousOperandTxt = previousOperandTxt
        this.currentOperandTxt = currentOperandTxt
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
            switch (this.operation) {
                case '+':
                    calculate = previous + current
                    break
                case '-':
                    calculate = previous - current
                    break
                case '÷':
                    calculate = previous / current
                    break
                case '*':
                    calculate = previous * current
                    break
                default: 
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
        } else {
            this.previousOperandTxt.innerText = ''
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

equalsBtn.addEventListener('click', button=> {
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
