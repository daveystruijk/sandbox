import { Component } from 'solid-js';
import { MobileComponent } from './MobileComponent';
import { WebComponent } from './WebComponent';

// Generate number based on string hash
const hashCode = (s: string) =>
  s.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

export const SharedComponent: Component<{ native: boolean; text: string }> = (props) => {
  // Shared component style logic for both web and native
  const hue = hashCode(props.text) % 360;
  const style = {
    color: `hsl(${hue}, 80%, 50%)`,
    'background-color': `hsl(${hue}, 20%, 90%)`,
  };

  return props.native ? (
    <MobileComponent text={props.text} style={style} />
  ) : (
    <WebComponent text={props.text} style={style} />
  );
};
