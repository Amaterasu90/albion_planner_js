class Calculator {
    static calculateFinalCount(retrunRate, count) {

        if (isNaN(count) || isNaN(retrunRate)) {
            return 0;
        }

        var y = count;
        var a = parseFloat(retrunRate, 10) / 100;
        var r = 1;

        var n = Math.ceil(Math.log10(y));
        for (var i = 1; i <= n; i++) {
            r += Math.pow(a, i);
        }

        return Math.round(y / r)
    }
}

export default Calculator;