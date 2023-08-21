import { Component, createSignal } from 'solid-js';

export const App: Component = () => {
  const [count, setCount] = createSignal(0);
  const increment = () => {
    setCount((c) => c + 1);
  };

  return (
    <>
      <actionbar title="Hello, SolidJS!"></actionbar>
      <stacklayout>
        <listview></listview>
        <label>
          You have tapped {count()} time{count() === 1 ? '' : 's'}
        </label>
        {
          // use 'on:___' instead of 'on___' for event handlers
          // See https://github.com/SudoMaker/dominative-solid#event-handling for detail
        }
        <button class="-primary" on:tap={increment}>
          Tap me!
        </button>
        <button
          style={{
            color: 'green',
          }}
          text={`You have tapped ${count()} time${count() === 1 ? '' : 's'}`}
          on:tap={() => {
            alert(`You have tapped ${count()} time${count() === 1 ? '' : 's'}`);
          }}
        />
      </stacklayout>
    </>
  );
};
