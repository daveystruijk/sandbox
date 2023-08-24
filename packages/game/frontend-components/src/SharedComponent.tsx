import { Component } from 'solid-js';
import { MobileComponent } from './MobileComponent';
import { WebComponent } from './WebComponent';

export const SharedComponent: Component<{ native: boolean; text: string }> = (props) => {
  return props.native ? <MobileComponent text={props.text} /> : <WebComponent text={props.text} />;
};
