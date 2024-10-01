class Calculator {
    constructor(topText, bottomText) {
        this.topText = topText
        this.bottomText = bottomText
        this.isOff = false
        this.clear()
    }
    
    clear() {
        if (this.isOff) {
            this.isOff = false
        }
        this.top = ""
        this.bottom = ""
        this.operator = undefined
    }

    off() {
        this.isOff = true
        this.top = ""
        this.bottom = "Goodbye"
        this.update()
        setTimeout(() => {
            this.bottom = ""
            this.update()
        }, 3000)
    }

    delete() {
        this.bottom = this.bottom.toString().slice(0, -1)
    }

    addNumber(number) {
        if (number === '.' && this.bottom.includes('.')) return
        this.bottom = this.bottom.toString() + number.toString()
    }

    selectOperator(operator) {
        if (this.bottom === "") return
        if (this.bottom !== "") {
            this.compute()
        }
        this.operator = operator
        this.top = this.bottom
        this.bottom = ""
    }

    compute() {
        let computation
        const topValue = parseFloat(this.top)
        const bottomValue = parseFloat(this.bottom)
        if (isNaN(topValue) || isNaN(bottomValue)) return
        switch (this.operator) {
            case "÷":
                computation = topValue / bottomValue
                break
            case "+":
                computation = topValue + bottomValue
                break
            case "-":
                computation = topValue - bottomValue
                break
            case "x":
                computation = topValue * bottomValue
                break
            default:
                return
        }
        this.bottom = computation
        this.operator = undefined
        this.top = ""
    }

    update() {
        this.bottomText.innerText = this.bottom
        this.topText.innerText = this.top
    }

    greet() {
        const greeting = ["Hola!", "Kumusta", "안녕"]
        const randomGreeting = greeting[Math.floor(Math.random() * greeting.length)]
        this.bottom = randomGreeting
        this.top = ""
    }
}


const numButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operators]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const equalsButton = document.querySelector('[data-equals]')
const greetButton = document.querySelector('[data-start]')
const endButton = document.querySelector('[data-end]')
const topText = document.querySelector('[data-top]')
const bottomText = document.querySelector('[data-bottom]')

const calc = new Calculator(topText, bottomText)

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (calc.isOff) return
        calc.addNumber(button.innerText)
        calc.update()
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (calc.isOff) return
        calc.selectOperator(button.innerText)
        calc.update()
    })
})

equalsButton.addEventListener('click', button => {
    if (calc.isOff) return
    calc.compute()
    calc.update()
})

clearButton.addEventListener('click', button => {
    calc.clear()
    calc.update()
})

deleteButton.addEventListener('click', button => {
    if (calc.isOff) return
    calc.delete()
    calc.update()
})

greetButton.addEventListener('click', button =>{
    if (calc.isOff) return
    calc.greet()
    calc.update()
})

endButton.addEventListener('click', button => {
    calc.off()
})