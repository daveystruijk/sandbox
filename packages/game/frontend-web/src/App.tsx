import { Component } from 'solid-js';
import { Chat } from './Chat';
import { World } from './World';

const App: Component = () => {
  return (
    <div class="flex h-screen flex-col items-stretch bg-slate-900">
      <div class="flex h-12 shrink-0 flex-row">
        <div class="flex w-48">Logo</div>
        <div class="flex grow"></div>
        <div class="flex w-48"></div>
      </div>
      <div class="flex w-screen grow flex-row items-stretch">
        <div class="flex w-48 shrink-0 flex-col">
          <div class="px-3 py-1 text-center text-xs font-semibold uppercase text-slate-600">
            Left
          </div>
        </div>
        <div class="flex grow flex-col">
          <World />
        </div>
        <div class="flex w-48 shrink-0 flex-col">
          <div class="px-3 py-1 text-center text-xs font-semibold uppercase text-slate-600">
            Right
          </div>
        </div>
      </div>
      <div class="flex h-48 shrink-0 flex-row">
        <div class="flex w-48"></div>
        <div class="flex grow">
          <Chat />
        </div>
        <div class="flex w-48"></div>
      </div>
    </div>
  );
};

export default App;
