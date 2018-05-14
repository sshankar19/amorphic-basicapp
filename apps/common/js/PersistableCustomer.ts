import {Supertype, supertypeClass, property, remote, Remoteable, amorphicStatic,  Persistable} from 'amorphic';
import { PersistableSale } from "./PersistableSale";

@supertypeClass({toClient: true, toServer: true})
export class PersistableCustomer extends Remoteable(Persistable(Supertype)) {
    @property()
    name: string;

    @property()
    onlyServer: number = 1;

    @property()
    onlyClient: string;

    @property({})
    sale: PersistableSale;

    @property()
    changeTest: string;

    @property()
    sessionData: string;

    constructor() {
        super();
    }

}