import { render } from '@nativescript-community/solid-js';
import { Application } from '@nativescript/core';
import { document, Node } from 'dominative';
import { Root } from './Root';

document.body.actionBarHidden = false;
render(() => <Root />, document.body as unknown as Node);
const create = () => document;
Application.run({ create });
