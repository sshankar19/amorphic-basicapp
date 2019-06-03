import {Supertype, supertypeClass, property, remote, amorphicStatic, Remoteable} from '@havenlife/amorphic';
import {Customer} from "../../../common/js/Customer";

@supertypeClass({toClient: true, toServer: true})
export class BasicClientServerChangesController extends Remoteable(Supertype)  {

    constructor() {
        super();
    }

    @property()
    customer: Customer

    onClickClient() {
        console.log('on client');
        this.customer = new Customer();
        this.customer.name = 'ravi client';
        this.customer.onlyClient = 'client-side initialized'
        this.onClickServer();
    }

    @remote()
    onClickServer() {
        this.customer = new Customer();
        this.customer.name = 'ravi server';
        this.customer.onlyServer = 'server-side initialized'
        console.log(this.customer.name);
    }

}