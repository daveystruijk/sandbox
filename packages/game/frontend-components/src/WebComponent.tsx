/* @jsxImportSource solid-js */
import { Component } from 'solid-js';

export const WebComponent: Component<{ text: string }> = (props) => {
  return <p class="text-blue-700">{props.text}</p>;
};
