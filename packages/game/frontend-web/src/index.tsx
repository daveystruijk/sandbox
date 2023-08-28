/* @refresh reload */
import { TiledInflatePlugin } from '@melonjs/tiled-inflate-plugin';
import * as me from 'melonjs';
import { render } from 'solid-js/web';
import App from './App';
import './index.css';

const root = document.getElementById('root');

if (!root) {
  throw Error('#root not found');
}

// Initialize graphics
me.boot();
me.plugin.register(TiledInflatePlugin);

render(() => <App />, root);
