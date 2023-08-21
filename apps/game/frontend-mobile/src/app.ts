import { render } from '@nativescript-community/solid-js';
import { Application } from '@nativescript/core';

import { Root } from './Root';

render(Root, document.body);

const create = () => document;

Application.run({ create });
