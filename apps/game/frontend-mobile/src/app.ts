import { render } from '@nativescript-community/solid-js';
import { Application } from '@nativescript/core';
import { createSignal } from 'solid-js';

import { Root } from './Root';

const create = () => {
  render(Frame, document.body);
  return document;
};

Application.run({ create });
