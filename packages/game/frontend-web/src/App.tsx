import { Component, createEffect, createResource } from 'solid-js';
import { getIndex } from '@sandbox/game-frontend-api-client/src/index';
import { createWebsocket } from '@sandbox/game-frontend-api-client/src/websocket';
import { SharedComponent } from '@sandbox/game-frontend-components/src/SharedComponent';

const App: Component = () => {
  const [users] = createResource(getIndex);
  const ws = createWebsocket();

  createEffect(() => {
    console.log(users());
  });

  return (
    <div>
      <SharedComponent native={false} />
    </div>
  );
};

export default App;
