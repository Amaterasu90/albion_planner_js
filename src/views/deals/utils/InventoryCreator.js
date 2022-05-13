import Calculator from "./Calculator";

class TransportCreator {
    getAllStacks = (returnRate, recipe) => {
        var inventoryStacks = [];

        this.getStacks(returnRate, recipe, () => recipe.resourceStacks, (stack) => stack.resource).forEach((item) => inventoryStacks.push(item));
        this.getStacks(returnRate, recipe, () => recipe.materialStacks, (stack) => stack.material).forEach((item) => inventoryStacks.push(item));

        return inventoryStacks;
    }

    createStacks = (returnRate, recipe) => {
        var inventoryStacks = this.getAllStacks(returnRate, recipe);
        var tabsContent = this.getTabsContent(inventoryStacks);
        var buttons = this.getTabButtons(inventoryStacks);

        return { tabsContent: tabsContent, buttons: buttons };
    }

    getLine = (columns, count) => {
        for (var i = 0; i < count; i++) {
            columns.push(null);
        }
        return columns
    }

    tabsIsOverLimit = () => {
        return this.tabsCount() > 27;
    }

    tabsCount = (returnRate, recipe) => {
        var inventoryStacks = this.getAllStacks(returnRate, recipe);
        return this.getTabButtons(inventoryStacks).length;
    }

    getGrid = (items) => {
        var inventoryStacksCount = items.length;
        var rows = inventoryStacksCount / 4;
        var rest = inventoryStacksCount % 4;

        var result = [];

        if (rows >= 1) {
            for (var i = 0; i < Math.floor(rows); i++) {
                result.push(this.getLine(items.slice(i * 4, (i + 1) * 4)));
            }
        }

        if (rest !== 0) {
            result.push(this.getLine(items.slice(items.length - rest, items.length), 4 - rest));
        }

        return result;
    }

    getTabButtons = (inventoryStacks) => {
        var fullStacksCount = 48;

        var pages = Math.ceil(inventoryStacks.length / fullStacksCount);
        var tabButtons = []

        if (pages >= 1) {
            for (var i = 0; i < pages; i++) {
                tabButtons.push({
                    item: { className: "tabButton" },
                    link: {
                        eventKey: `inventory-${i + 1}`,
                        className: "text-nowrap text-left tabLink",
                        active: i === 0,
                        name: `Transport ${i + 1}`
                    }
                });
            }
        }

        return tabButtons;
    }

    getTabsContent = (inventoryStacks) => {
        var componentsCount = inventoryStacks.length;
        var fullStacksCount = 48;
        var fullPages = componentsCount / fullStacksCount;
        var rest = componentsCount % 48;

        var panes = [];
        if (fullPages >= 1) {
            for (var i = 0; i < Math.floor(fullPages); i++) {
                panes.push({
                    active: false,
                    eventKey: `inventory-${i + 1}`,
                    key: `inventory-tab-${i + 1}`,
                    className: "p-0 m-0 tabPanel",
                    grid: this.getGrid(inventoryStacks.slice(i * fullStacksCount, (i + 1) * fullStacksCount))
                });
            }
        }

        if (rest !== 0) {
            panes.push({
                active: false,
                eventKey: `inventory-${Math.ceil(fullPages)}`,
                key: `inventory-tab-${Math.ceil(fullPages)}`,
                className: "p-0 m-0 tabPanel",
                grid: this.getGrid(inventoryStacks.slice(inventoryStacks.length - rest, inventoryStacks.length))
            });
        }

        panes[0].active = true;

        return panes;
    }

    getStacks = (returnRate, recipe, entityStackSelector, entitySelector) => {
        if (!returnRate || !recipe) {
            return [];
        }

        var baseCount = Calculator.calculateFinalCount(returnRate, recipe.count);
        var stacks = [];

        var entityStack = entityStackSelector();
        entityStack.forEach((stack, stackIndex) => {
            var entity = entitySelector(stack);
            var count = (entity.type.isAffectedByReturnRate ? baseCount : recipe.count) * stack.count;
            const maxStackCount = 999;
            count = isNaN(count) ? 0 : count;

            for (var i = 0; i < Math.floor(count / maxStackCount); i++) {
                stacks.push(
                    {
                        index: stackIndex,
                        imageIdentifier: entity.itemImageIdentifier,
                        name: entity.name,
                        count: maxStackCount
                    });
            }

            if (count % maxStackCount !== 0) {
                stacks.push(
                    {
                        index: stackIndex,
                        imageIdentifier: entity.itemImageIdentifier,
                        name: entity.name,
                        count: count % maxStackCount
                    });
            }
        });

        return stacks;
    }
}

export default TransportCreator;