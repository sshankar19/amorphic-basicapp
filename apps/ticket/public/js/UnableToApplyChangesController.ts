import {Supertype, supertypeClass, property, remote, amorphicStatic, Remoteable, Bindable, Persistable} from 'amorphic';
import {PersistableCustomer} from "../../../common/js/PersistableCustomer";
import * as Bluebird from 'bluebird';
import {PersistableSale, Item} from "../../../common/js/PersistableSale";

@supertypeClass({toClient: true, toServer: true})
export class UnableToApplyChangesController extends Bindable(Remoteable(Persistable(Supertype)))  {

    constructor() {
        super();
    }

    @property()
    customer: PersistableCustomer;

    @property({ toClient: false })
    txn: any;

    initialCreate() {
        console.log('on client');
        this.customer = new PersistableCustomer();
        this.customer.name = 'ravi client';
        this.customer.onlyClient = 'client-side initialized';
        let sale = new PersistableSale(20);
        this.customer.sale  = sale;

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
            .then(()=> forceUpdate ? true : this.customer ? this.customer.isStale() : false)
            .then(isStale => isStale ? this.customer.refresh() : null);
    }

    @remote()
    refreshPersistorFetch() {
        return PersistableCustomer.persistorFetchById(this.customer._id, {session: this.amorphic});
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
        return PersistableCustomer.persistorFetchById(this.customer._id, {session: this.amorphic, transient: true});
    }

    @remote()
    async loadCustomerSaleUsingFetch() {
        if (!this.customer) {
            let customers = await PersistableCustomer.persistorFetchByQuery({name: 'ravi client'}, {session: this.amorphic});
            this.customer  = customers[0];
        }

        await this.customer.sale.fetch({items: true});

        console.log(this.customer.name);
    }

    @remote()
    onInitialSave() {
        if (!this.txn) {
            this.txn = this.amorphic.begin();
        };

        this.customer.cascadeSave(this.txn);

        return this.amorphic.end(this.txn)
            .finally(() => {
                this.txn = null;
            });
    }

}