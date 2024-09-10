document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));

    let currentInput = '';
    let operator = '';
    let previousInput = '';

    const updateDisplay = () => {
        display.textContent = currentInput || '0';
    };

    const calculate = () => {
        if (previousInput && currentInput && operator) {
            const prev = parseFloat(previousInput);
            const current = parseFloat(currentInput);
            let result;

            switch (operator) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '*':
                    result = prev * current;
                    break;
                case '/':
                    // Handling division by zero
                    if (current === 0) {
                        alert('Cannot divide by zero');
                        result = 0;
                    } else {
                        result = prev / current;
                    }
                    break;
                default:
                    return;
            }
            currentInput = result.toString();
            operator = '';
            previousInput = '';
        }
        updateDisplay();
    };

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('operator')) {
                if (currentInput) {
                    calculate();
                }
                operator = button.getAttribute('data-value');
                previousInput = currentInput;
                currentInput = '';
            } else if (button.classList.contains('clear')) {
                currentInput = '';
                operator = '';
                previousInput = '';
                updateDisplay();
            } else if (button.classList.contains('equal')) {
                calculate();
            } else {
                // Prevent multiple decimal points
                if (button.getAttribute('data-value') === '.' && currentInput.includes('.')) return;
                currentInput += button.getAttribute('data-value');
                updateDisplay();
            }
        });
    });
});
