export class Item {
    constructor(data) {
        this.name = null;
        this.number = null;
        this.price = 10;
        this.checked = null;
        this.type = null;
        this.id = null;
        this.itemId = null;

        if (data) {
            for (let field in data) {
                this[field] = data[field];
            }
        }
    }
}
