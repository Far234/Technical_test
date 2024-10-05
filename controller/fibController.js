const { generateFibonacci, formatFibonacciToTable } = require("../helpers/create");


class fibbonachiController {
    static async getindexpage(req, res) {
        res.render('index')
    }

    static async getFibbonachi(req, res) {

        const { rows, columns } = req.body;
        const fibonacciSequence = generateFibonacci(rows * columns);
        const formattedTable = formatFibonacciToTable(fibonacciSequence, rows, columns);
        res.render('fibonacci', { table: formattedTable });
    }
}

module.exports = fibbonachiController;