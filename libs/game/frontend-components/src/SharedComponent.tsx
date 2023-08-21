import { Component } from 'solid-js';
import { MobileComponent } from './MobileComponent';
import { WebComponent } from './WebComponent';

export const SharedComponent: Component<{ native: boolean }> = (props) => {
  return props.native ? <MobileComponent /> : <WebComponent />;
};
