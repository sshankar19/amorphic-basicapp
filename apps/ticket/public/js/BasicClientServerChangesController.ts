import { Supertype, supertypeClass, property, remote, amorphicStatic, Remoteable } from 'amorphic';
import { Customer } from '../../../common/js/Customer';
import { SomeClass } from './SomeClass';
import { AbstractController } from './AbstractController';

@supertypeClass({ toClient: true, toServer: true })
export class BasicClientServerChangesController extends AbstractController {
	constructor() {
		super();
	}

	@property()
	customer: Customer;

	onClickClient() {
		console.log('on client');
		this.customer = new Customer();
		this.customer.name = 'ravi client';
		this.customer.onlyClient = 'client-side initialized';
		this.onClickServer();
		console.log('\n\n\n\nsup\n\n');
		console.log(this.hasOwnProperty('customer'));
		this.onClickServer2();
	}

	@remote()
	onClickServer() {
		console.log('on this remote function');
		super.onClickServer();
		this.customer = new Customer();
		this.customer.name = 'ravi server';
		this.customer.onlyServer = 'server-side initialized';
		console.log(this.customer.name);
	}

	@remote({ on: 'server' })
	async returnData() {
		console.log('\n\n\n\nsup\n\n');
		console.log(this.amorphicToJSON());
		return await SomeClass.createStuff();
	}

	@remote({ on: 'server' })
	async expireSessionStuff() {
		return await this.amorphic.expireSession();
	}
}
