function generateFibonacci(n) {
    const fib = [0, 1];
    for (let i = 2; i < n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib.slice(0, n);
}

function formatFibonacciToTable(fibonacciSequence, rows, columns) {
    const table = [];
    for (let i = 0; i < rows; i++) {
        const row = fibonacciSequence.slice(i * columns, (i + 1) * columns);
        table.push(row);
    }
    return table;
}

module.exports = { generateFibonacci, formatFibonacciToTable };