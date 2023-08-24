import { Component } from 'solid-js';

export const MobileComponent: Component<{ text: string; style: Record<string, string> }> = (
  props,
) => {
  return <label style={props.style}>{props.text}</label>;
};
