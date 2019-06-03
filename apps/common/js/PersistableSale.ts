import {Supertype, supertypeClass, property, remote, Remoteable, amorphicStatic,  Persistable} from '@havenlife/amorphic';




@supertypeClass({toClient: true, toServer: true})
export class PersistableSale extends Remoteable(Persistable(Supertype)) {
   @property()
   sale: number;

   @property({getType: () => Item})
   items: Array<Item>



   constructor(sale: number) {
        super();
        this.sale = sale;
    }

}

@supertypeClass({toClien: true, toServer: true})
export class Item extends Remoteable(Persistable(Supertype)) {
    @property()
    name: string;

    @property()
    price: number;

    @property({getType: () => PersistableSale})
    sale: PersistableSale;

    constructor(name: string, price: number, sale: PersistableSale) {
        super();
        this.name = name;
        this.price = price;
        this.sale = sale;
    }

}