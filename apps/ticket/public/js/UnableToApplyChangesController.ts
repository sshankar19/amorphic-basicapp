import { Supertype, supertypeClass, property, remote, amorphicStatic, Remoteable, Bindable, Persistable } from 'amorphic';
import { PersistableCustomer } from "../../../common/js/PersistableCustomer";
import * as Bluebird from 'bluebird';
import { PersistableSale, Item } from "../../../common/js/PersistableSale";
import { Controller } from "./controller";

@supertypeClass({ toClient: true, toServer: true })
export class UnableToApplyChangesController extends Bindable(Remoteable(Persistable(Supertype))) {

    constructor(controller: Controller) {
        super();
        this.controller = controller;
    }

    @property()
    customer: PersistableCustomer;

    @property()
    directProperty: number = 1;

    @property({ toClient: false })
    txn: any;

    @property({ getType: () => Controller })
    controller: Controller;


    serverInit() {
        console.log('serverInit ... UnableToApplyChangesController');
    }

    initialCreate() {
        console.log('on client');
        this.customer = new PersistableCustomer();
        this.customer.name = 'ravi client';
        this.customer.onlyClient = 'client-side initialized';
        let sale = new PersistableSale(20);
        this.customer.sale = sale;

        let book = new Item('book', 10, sale);
        let dvd = new Item('dvd', 15, sale);

        sale.items = [book, dvd];
        this.onInitialSave();
    }

    makeChangeAndSave() {
        this.customer.sale.sale = this.customer.sale.sale + 2;
        this.customer.name = 'ravi client';
        this.customer.onlyClient = 'Changing on client'
        this.onInitialSave();
    }

    refreshCustomer(forceUpdate) {
        this.txn = this.amorphic.begin();
        return Bluebird.resolve()
            .then(() => forceUpdate ? true : this.customer ? this.customer.isStale() : false)
            .then(isStale => isStale ? this.customer.refresh() : null);
    }

    @remote()
    refreshPersistorFetch() {
        return PersistableCustomer.persistorFetchById(this.customer._id, { session: this.amorphic });
    }

    @remote()
    refreshPersistorFetchNoSession() {
        return PersistableCustomer.persistorFetchById(this.customer._id);
    }

    @remote()
    refreshgetPersistor() {
        return PersistableCustomer.getFromPersistWithId(this.customer._id);
    }

    @remote()
    refreshgetPersistorTransient() {
        return PersistableCustomer.getFromPersistWithId(this.customer._id, true);
    }

    @remote()
    refreshPersistorFetchTransient() {
        return PersistableCustomer.persistorFetchById(this.customer._id, { session: this.amorphic, transient: true });
    }

    @remote()
    getFromPersistWithQuery() {
        return PersistableCustomer.getFromPersistWithQuery({ name: 'ravi client' });
    }

    @remote()
    async loadCustomerSaleUsingFetch() {
        let customers = await PersistableCustomer.persistorFetchByQuery({ name: 'ravi client' }, { session: this.amorphic });
        this.customer = customers[0];
        this.controller.customer = this.customer;
        //customers[0].sessionData = this.amorphic.currentSession;

        let test = this.amorphic as any;
        customers[0].sessionData = test.currentSession;
        await this.customer.sale.fetch({ items: true });
        this.directProperty += 1;
        console.log(this.customer.name);
    }

    @remote()
    async onInitialSave() {
        if (!this.txn) {
            this.txn = this.amorphic.begin();
        };

        this.customer.cascadeSave(this.txn);
        await this.amorphic.end(this.txn)
        this.txn = null;
    }

    preServerCall(...args) {
        console.log('utacc');
        args.forEach(arg => {
            console.log(JSON.stringify(arg));
        });
    }

}