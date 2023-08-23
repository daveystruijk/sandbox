import { Component, createEffect, createSignal } from 'solid-js';
import { getIndex } from '@sandbox/game-frontend-api-client/src/index';

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
  const [index, setIndex] = createSignal('?');

  createEffect(async () => {
    const newIndex = await getIndex();
    setIndex(JSON.parse(newIndex.url));
  });

  return (
    <label>
      {'parse'} {index()}
    </label>
  );
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
