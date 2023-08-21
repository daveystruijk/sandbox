import { ActionBar, StackLayout } from 'dominative';
import { Component, createSignal } from 'solid-js';

export const Root: Component = () => {
  const [count, setCount] = createSignal(0);
  const increment = () => {
    setCount((c) => c + 1);
  };
  return (
    <>
      <ActionBar title="Hello, SolidJS!"></ActionBar>
      <StackLayout>
        <label>You have taapped {count()} time(s)</label>
      </StackLayout>
    </>
  );
};
