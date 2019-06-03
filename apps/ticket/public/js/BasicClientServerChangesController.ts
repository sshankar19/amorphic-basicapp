import {Supertype, supertypeClass, property, remote, amorphicStatic, Remoteable} from '@havenlife/amorphic';
import {Customer} from "../../../common/js/Customer";

@supertypeClass({toClient: true, toServer: true})
export class BasicClientServerChangesController extends Remoteable(Supertype)  {

    constructor() {
        super();
    }

    @property()
    customer: Customer

    @property({type: Array, getType: () => Customer}) 
    customer2: Customer[];

    changeName() {
        console.log('hey whats up dude');
        console.log(this.customer.name);
    }

    onClickClient() {
        console.log('on client');
        this.customer = new Customer();
        this.customer.name = 'ravi client';
        this.customer.onlyClient = 'client-side initialized'
        this.onClickServer([new Customer('name')]);
    }

    @remote()
    onClickServer(customer: Customer[]) {
        debugger;
        this.customer = new Customer();
        this.customer.name = 'ravi server';
        console.log(this.customer.name);

        this.customer.onlyServer = 'server-side initialized'
        console.log(this.customer.name);
    }

}