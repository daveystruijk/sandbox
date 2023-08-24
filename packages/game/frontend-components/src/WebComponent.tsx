/* @jsxImportSource solid-js */
import { Component } from 'solid-js';

export const WebComponent: Component<{ text: string; style: Record<string, string> }> = (props) => {
  return <p style={props.style}>{props.text}</p>;
};
