import * as me from 'melonjs';
import { Component, onCleanup, onMount } from 'solid-js';

export const World: Component = () => {
  let worldRef: HTMLDivElement | undefined;

  const onResize = () => {};

  onMount(async () => {
    // Initialize the canvas
    if (!me.video.init(100, 100, { parent: worldRef, scale: 'auto', scaleMethod: 'flex' })) {
      alert('Your browser does not support HTML5 canvas.');
      return;
    }

    // set all ressources to be loaded
    me.loader.preload(
      [
        { name: 'world', type: 'tmx', src: 'world.tmx' },
        {
          name: 'colored',
          type: 'image',
          src: 'colored.png',
        },
        {
          name: 'colored',
          type: 'tsx',
          src: 'colored.tsx',
        },
      ],
      () => {
        me.level.load('world', {
          container: me.game.world,
          onLoaded: () => {
            me.game.world.scale(2);
            me.game.world.pos = new me.Vector2d(0, -200);
            me.game.world.backgroundColor.setColor(0, 0, 0);
            me.game.repaint();
          },
        });

        window.addEventListener('resize', onResize);
      },
    );
  });

  onCleanup(() => {
    window.removeEventListener('resize', onResize);
  });

  return <div class="flex h-full w-full" ref={worldRef}></div>;
};
