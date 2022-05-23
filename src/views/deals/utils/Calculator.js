class Calculator {
    static calculateFinalCount(returnRate, count) {

        if (isNaN(count) || isNaN(returnRate)) {
            return 0;
        }

        var y = count;
        var a = parseFloat(returnRate, 10) / 100;
        var r = 1;

        var n = Math.ceil(Math.log10(y));
        for (var i = 1; i <= n; i++) {
            r += Math.pow(a, i);
        }

        return Math.round(y / r)
    }

    static calculateRefineCost(returnRate, recipe, costPer100) {
        if (!recipe.count || recipe.count === 0 || !returnRate || returnRate === 0
            || recipe.resourceStacks.find((item) => !item.unitCost || item.unitCost === 0)
            || recipe.materialStacks.find((item) => !item.unitCost || item.unitCost === 0)) {
            return 0;
        }

        const initialValue = 0;
        var baseCount = Calculator.calculateFinalCount(returnRate, recipe.count);

        var resourcesAffectedByReturnRate = recipe.resourceStacks.filter((item) => item.resource.type.isAffectedByReturnRate);
        var materialsAffectedByReturnRate = recipe.materialStacks.filter((item) => item.material.type.isAffectedByReturnRate);
        var costElementsAffectedByReturnRate =
            (
                resourcesAffectedByReturnRate.reduce((previousValue, currentValue) => previousValue + currentValue.count * currentValue.unitCost, initialValue)
                + materialsAffectedByReturnRate.reduce((previousValue, currentValue) => previousValue + currentValue.count * currentValue.unitCost, initialValue)
            ) * baseCount;

        var resourcesNotAffectedByReturnRate = recipe.resourceStacks.filter((item) => !item.resource.type.isAffectedByReturnRate);
        var materialsNotAffectedByReturnRate = recipe.materialStacks.filter((item) => !item.material.type.isAffectedByReturnRate);

        var costElementsNotAffectedByReturnRate =
            (
                resourcesNotAffectedByReturnRate.reduce((previousValue, currentValue) => previousValue + currentValue.count * currentValue.unitCost, initialValue)
                + materialsNotAffectedByReturnRate.reduce((previousValue, currentValue) => previousValue + currentValue.count * currentValue.unitCost, initialValue)
            )
            * recipe.count;

        var productionCost = Calculator.getProductionCost(recipe, costPer100) * recipe.count;
        return costElementsAffectedByReturnRate + costElementsNotAffectedByReturnRate + productionCost;
    }

    static getProductionCost(recipe, costPer100) {
        if (recipe.tier <= 2
            || recipe.resourceStacks.find((item) => !item.resource.type.isAffectedByReturnRate)
            || recipe.materialStacks.find((item) => !item.material.type.isAffectedByReturnRate)) {
            return 0;
        }
        var baseCosts = [90, 180, 360, 720, 1440, 2880, 5760, 11520, 23038];
        var cost = Math.round((baseCosts[recipe.tier + recipe.enhancement - 3] * costPer100) / 9999);
        return cost;
    }

    static calculateProfit(returnRate, recipe, costPer100, tax){
        if (isNaN(returnRate)
            || isNaN(costPer100)
            || isNaN(tax)
            || isNaN(recipe.price)
            || isNaN(recipe.count)
            || recipe.resourceStacks.find((item) => !item.unitCost || item.unitCost === 0)
            || recipe.materialStacks.find((item) => !item.unitCost || item.unitCost === 0)) {
            return 0;
        }

        var allCosts = this.getAllCosts(returnRate, recipe, costPer100, tax);

        return (recipe.price * recipe.count) - allCosts;
    }

    static getAllCosts(returnRate, recipe, costPer100, tax){
        if (isNaN(returnRate)
            || isNaN(costPer100)
            || isNaN(tax)
            || isNaN(recipe.price)
            || isNaN(recipe.count)
            || recipe.resourceStacks.find((item) => !item.unitCost || item.unitCost === 0)
            || recipe.materialStacks.find((item) => !item.unitCost || item.unitCost === 0)) {
            return 0;
        }

        var cost = Calculator.calculateRefineCost(returnRate, recipe, costPer100);
        var taxCost = tax * (recipe.price * recipe.count);
        return cost + taxCost;
    }
}

export default Calculator;