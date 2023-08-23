import { createReconnectingWS } from '@solid-primitives/websocket';
import config from './config';

export const createWebsocket = () => createReconnectingWS(config.WEBSOCKET_URL);
