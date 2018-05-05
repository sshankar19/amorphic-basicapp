import {Controller} from './controller';
import * as RemoteObjectTemplate from 'semotus';
import * as Q from 'q';
import * as Bluebird from 'bluebird';

window['Q'] = Q;
window['RemoteObjectTemplate'] = RemoteObjectTemplate;
window['Controller'] = Controller;
window['Bluebird'] = Bluebird;