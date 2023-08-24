import { Component } from 'solid-js';

export const MobileComponent: Component<{ text: string }> = (props) => {
  return <label class="text-blue-700">{props.text}</label>;
};
