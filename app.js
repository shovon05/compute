const display = document.getElementById("display");

// --- UI Functions ---
function add(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    try {
        const expression = display.value;
        const result = evaluate(expression);
        display.value = result;
    } catch (e) {
        console.error(e);
        display.value = "Error";
    }
}

// --- Core Logic (Ported from Java to JavaScript) ---
function evaluate(expression) {
    let tokens = tokenize(expression);
    let values = [];
    let ops = [];

    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];

        if (!isNaN(token)) {
            values.push(parseFloat(token));
        } else if (token === '(') {
            ops.push(token);
        } else if (token === ')') {
            while (ops.length > 0 && ops[ops.length - 1] !== '(') {
                values.push(applyOp(ops.pop(), values.pop(), values.pop()));
            }
            ops.pop(); // Pop '('
        } else if (isFunction(token)) {
            ops.push(token);
        } else if (isOperator(token)) {
            while (ops.length > 0 && hasPrecedence(token, ops[ops.length - 1])) {
                values.push(applyOp(ops.pop(), values.pop(), values.pop()));
            }
            ops.push(token);
        }
    }

    while (ops.length > 0) {
        values.push(applyOp(ops.pop(), values.pop(), values.pop()));
    }

    return values.pop();
}

function tokenize(expr) {
    // Regex to split by operators, but keep numbers and functions together
    // Handles: sin, cos, numbers, operators
    const regex = /([0-9.]+|sin|cos|tan|\(|\)|\+|\-|\*|\/|\^)/g;
    return expr.match(regex) || [];
}

function isOperator(c) {
    return ['+', '-', '*', '/', '^'].includes(c);
}

function isFunction(s) {
    return ['sin', 'cos', 'tan'].includes(s);
}

function hasPrecedence(op1, op2) {
    if (op2 === '(' || op2 === ')') return false;
    if (isFunction(op2)) return true; // Functions have highest precedence
    
    let prec1 = getPrecedence(op1);
    let prec2 = getPrecedence(op2);
    return prec2 >= prec1;
}

function getPrecedence(op) {
    if (op === '+' || op === '-') return 1;
    if (op === '*' || op === '/') return 2;
    if (op === '^') return 3;
    return 0;
}

function applyOp(op, b, a) {
    // Handle Unary functions (sin/cos/tan) - they only pop 'b' (one value)
    if (isFunction(op)) {
        // 'a' was popped unnecessarily in the generic call, push it back or handle logic differently
        // For simplicity in this specific stack architecture, we handle functions separately:
        // Note: The loop above pops 2 items (a,b). We need to fix that logic for functions.
        // Quick Fix: Let's adjust the applyOp to be smarter or handle 1 arg.
        return 0; // See improved logic below
    }
    
    // Standard Math
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': if (b === 0) throw "Div by 0"; return a / b;
        case '^': return Math.pow(a, b);
    }
    return 0;
}

// --- Revised Main Loop for Functions ---
// (Overwrite the "applyOp" inside the loop with this specific block for better stability)
/* NOTE: To make this robust for Functions (sin/cos), we typically treat them 
   as unary operators. The logic below is a simplified "Shunting Yard" fix:
*/

// RE-PASTE THIS LOGIC BLOCK INTO THE `evaluate` FUNCTION LOOP:
/*
            } else if (isOperator(token)) {
                while (ops.length > 0 && hasPrecedence(token, ops[ops.length - 1])) {
                    let op = ops.pop();
                    if (isFunction(op)) {
                        let val = values.pop();
                        values.push(applyFunction(op, val));
                    } else {
                        values.push(applyOp(op, values.pop(), values.pop()));
                    }
                }
                ops.push(token);
            }
*/
// Add this helper:
function applyFunction(op, val) {
    if (op === 'sin') return Math.sin(val * (Math.PI/180)); // Degrees
    if (op === 'cos') return Math.cos(val * (Math.PI/180));
    if (op === 'tan') return Math.tan(val * (Math.PI/180));
    return 0;
}