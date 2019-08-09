import { Supertype, supertypeClass, property, remote, amorphicStatic, Remoteable, Bindable, Persistable, IAmorphicAppController } from 'amorphic';
amorphicStatic['toClientRuleSet'] = ['ticket'];
amorphicStatic['toServerRuleSet'] = ['ticket']

import { BasicClientServerChangesController } from './BasicClientServerChangesController';
import { UnableToApplyChangesController } from './UnableToApplyChangesController'
import { PersistableCustomer } from "../../../common/js/PersistableCustomer";

declare var AmorphicRouter: any;
declare var ticketRoutes: any;

@supertypeClass
export class Controller extends Bindable(Remoteable(Persistable(Supertype))) implements IAmorphicAppController {

    // Global properties

    serverInit() {
        if (!this.unableToApplyChangesController) {
            this.unableToApplyChangesController = new UnableToApplyChangesController(this);
        }
        return amorphicStatic.syncAllTables();
    }

    @property()
    error: string = '';


    router: any;
    route: any;

    @property()
    basicClientServerChangesController: BasicClientServerChangesController;

    @property()
    unableToApplyChangesController: UnableToApplyChangesController;

    @property()
    customer: PersistableCustomer;

    @remote()
    publicInitAll() {
    };


    preServerCall(hasChanges: any, _changes: any, _context: any, forceUpdate: any) {
        console.log('controller');
        console.log('they');
        const i = arguments.length;
        for (let sup = 0; sup < i; sup++) {
            console.log(JSON.stringify(arguments[sup]));
            console.log('hey');
        }
        if (this.unableToApplyChangesController) {
            return this.unableToApplyChangesController.refreshCustomer(forceUpdate);
        }
    }

    clientInit() {
        this.router = AmorphicRouter;
        this.route = AmorphicRouter.route(this, ticketRoutes);

        if (!this.basicClientServerChangesController) {
            this.basicClientServerChangesController = new BasicClientServerChangesController();
        }

        if (!this.unableToApplyChangesController) {
            this.unableToApplyChangesController = new UnableToApplyChangesController(this);
        }

    }


    handleRemoteError(error) {
        //this.error = this.getErrorMessage(error);
    };

    pageInit(file) {
    };



}
