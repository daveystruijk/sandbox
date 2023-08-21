import { Component } from 'solid-js';
import { SharedComponent } from '@sandbox/game-frontend-components/src/SharedComponent';

const App: Component = () => {
  return (
    <div>
      <SharedComponent native={false} />
    </div>
  );
};

export default App;
