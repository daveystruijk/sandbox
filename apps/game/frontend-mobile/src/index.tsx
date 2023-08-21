import { render } from '@nativescript-community/solid-js';
import { Application } from '@nativescript/core';
import { document, Node } from 'dominative';
import { App } from './App';

document.body.actionBarHidden = false;
render(() => <App />, document.body as unknown as Node);
const create = () => document;
Application.run({ create });
