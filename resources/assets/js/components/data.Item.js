export class Item {
    constructor(data) {

        this.name = '';

        this.number = 0;

        this.price = 0;

        if (data) {

            for (let field in data) {

                this[field] = data[field];

                if(this[field].type){

                    this[field].type = data[field].type;
                }
            }
        }

    }
}