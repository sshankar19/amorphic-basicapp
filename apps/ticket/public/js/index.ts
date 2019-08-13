import { Controller } from './controller';
import * as RemoteObjectTemplate from '@havenlife/semotus';
import * as Bluebird from 'bluebird';

window['RemoteObjectTemplate'] = RemoteObjectTemplate;
window['Controller'] = Controller;
window['Bluebird'] = Bluebird;