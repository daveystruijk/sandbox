import { render } from '@nativescript-community/solid-js';
import {
  BottomNavigationBar,
  BottomNavigationTab,
} from '@nativescript-community/ui-material-bottomnavigationbar';
import { Application } from '@nativescript/core';
import { document, Node, registerElement } from 'dominative';
import { App } from './App';

registerElement('bottomnavigationbar', BottomNavigationBar);
registerElement('bottomnavigationtab', BottomNavigationTab);

document.body.actionBarHidden = false;
render(() => <App />, document.body as unknown as Node);
const create = () => document;
Application.run({ create });
