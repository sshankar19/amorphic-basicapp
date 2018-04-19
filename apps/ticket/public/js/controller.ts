import {Supertype, supertypeClass, property, remote, amorphicStatic} from 'amorphic';
amorphicStatic['toClientRuleSet'] = ['ticket']
import {Customer} from "../../../common/js/Customer";

declare var AmorphicRouter : any;
declare var ticketRoutes : any;

@supertypeClass
export class Controller  {

     // Global properties

    serverInit () {
        return amorphicStatic.syncAllTables();
    }

    preServerCall (changeCount) {
        console.log("preServerCall objects changed: " + changeCount );
    }

    @property()
    error: string = '';


    router: any;
    route: any;

    @property()
    customer: Customer



    @remote()
    publicInitAll ()
    {
    };



    clientInit ()
    {

        this.router = AmorphicRouter;
        this.route = AmorphicRouter.route(this, ticketRoutes);
    }


    handleRemoteError (error) {
        //this.error = this.getErrorMessage(error);
    };

    pageInit (file) {
    };


    onClickClient() {
        console.log('on client');
        this.onClickServer();
    }

    @remote()
    onClickServer() {
        this.customer = new Customer();
        this.customer.name = 'ravi client';
        this.customer.onlyServer = 'server-side initialized'
        console.log(this.customer.name);
    }
}

