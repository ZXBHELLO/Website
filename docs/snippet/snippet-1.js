// 示例代码文件 - 用于 Markdown 代码导入功能演示
const greeting = 'Hello, VuePress!'

function add(a, b) {
    return a + b
}

function multiply(a, b) {
    return a * b
}

class Calculator {
    constructor() {
        this.result = 0
    }

    add(value) {
        this.result += value
        return this
    }

    subtract(value) {
        this.result -= value
        return this
    }

    multiply(value) {
        this.result *= value
        return this
    }

    clear() {
        this.result = 0
        return this
    }

    valueOf() {
        return this.result
    }
}

export { greeting, add, multiply, Calculator }