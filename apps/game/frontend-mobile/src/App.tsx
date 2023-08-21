import { Component, createSignal } from 'solid-js';
import { SharedComponent } from '@sandbox/game-frontend-components/src/SharedComponent';

export const MainPage: Component = () => {
  return (
    <>
      <stacklayout>
        <label>Hi</label>
      </stacklayout>
    </>
  );
};

export const TappyRow: Component = () => {
  const [count, setCount] = createSignal(0);
  const increment = () => {
    setCount((c) => c + 1);
  };

  return (
    <flexboxlayout class="flex-row">
      <label>
        You have tapped {count()} time{count() === 1 ? '' : 's'}
      </label>
      <SharedComponent native={true} />
      <button on:tap={increment}>Tap me!</button>
      <button
        class="text-green-500"
        text={`You have tapped ${count()} time${count() === 1 ? '' : 's'}`}
        on:tap={() => {
          alert(`You have tapped ${count()} time${count() === 1 ? '' : 's'}`);
        }}
      />
    </flexboxlayout>
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

export const App: Component = () => {
  return (
    <>
      <flexboxlayout class="flex-col justify-between">
        <scrollview class="flex-grow">
          <flexboxlayout class="flex-col">
            <TappyRow />
            <TappyRow />
            <TappyRow />
            <TappyRow />
            <TappyRow />
            <TappyRow />
            <TappyRow />
            <TappyRow />
            <TappyRow />
            <TappyRow />
            <TappyRow />
            <TappyRow />
            <TappyRow />
            <TappyRow />
            <TappyRow />
            <TappyRow />
            <TappyRow />
            <TappyRow />
            <TappyRow />
            <TappyRow />
            <TappyRow />
            <TappyRow />
            <TappyRow />
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
