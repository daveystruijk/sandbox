import {
  Component,
  createEffect,
  createResource,
  createSignal,
  ErrorBoundary,
  For,
  Suspense,
} from 'solid-js';
import { createWebsocket } from '@sandbox/game-frontend-api-client/src/websocket';

export const MainPage: Component = () => {
  return (
    <>
      <stacklayout>
        <label>Hi</label>
      </stacklayout>
    </>
  );
};

export const MenuButton: Component<{ index: number }> = (props) => {
  return (
    <button
      class="h1 m-0 bg-slate-300 p-0 text-center"
      text={`Tab ${props.index}`}
      textWrap={true}
    ></button>
  );
};

export const Chat: Component = () => {
  const [messages, setMessages] = createSignal<string[]>([]);

  const ws = createWebsocket();
  ws.addEventListener('message', (e) => console.log(e));
  ws.addEventListener('error', (e) => console.log(e));
  ws.addEventListener('open', (e) => console.log(e));
  ws.addEventListener('close', (e) => console.log(e));
  createEffect(() => {
    ws.send('hi');
  });

  return <For each={messages()}>{(message) => <label>{message}</label>}</For>;
};

export const App: Component = () => {
  return (
    <>
      <flexboxlayout class="flex-col justify-between">
        <scrollview class="flex-grow">
          <flexboxlayout class="flex-col">
            <Chat />
          </flexboxlayout>
        </scrollview>
        <flexboxlayout class="h-48 flex-row justify-around">
          <MenuButton index={0} />
          <MenuButton index={1} />
          <MenuButton index={2} />
          <MenuButton index={3} />
          <MenuButton index={4} />
        </flexboxlayout>
      </flexboxlayout>
    </>
  );
};
