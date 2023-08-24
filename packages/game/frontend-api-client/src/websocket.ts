import { createReconnectingWS } from '@solid-primitives/websocket';
import config from './config';

export const createWebsocketConnection = () => createReconnectingWS(config.WEBSOCKET_URL);
