Object.defineProperty(exports, "__esModule", { value: true });
class SimpleChange {
    constructor(previousValue, currentValue, firstChange) {
        this.previousValue = previousValue;
        this.currentValue = currentValue;
        this.firstChange = firstChange;
    }
    isFirstChange() { return this.firstChange; }
}
exports.SimpleChange = SimpleChange;
