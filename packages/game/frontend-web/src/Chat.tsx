import { Component, For } from 'solid-js';
import { createStore } from 'solid-js/store';
import {
  createWebsocketConnection,
  Message,
} from '@sandbox/game-frontend-api-client/src/websocket';
import { SharedComponent } from '@sandbox/game-frontend-components/src/SharedComponent';

export const Chat: Component = () => {
  let scrollViewRef: HTMLDivElement | undefined;
  let inputRef: HTMLTextAreaElement | undefined;

  const [messages, setMessages] = createStore<Message[]>([]);
  const ws = createWebsocketConnection();

  // Receive messages
  ws.addEventListener('message', (m: Message) => {
    setMessages(messages.length, m);
    setTimeout(() => scrollViewRef!.scrollTo({ top: scrollViewRef!.scrollHeight + 256 }), 0);
  });

  // Send message
  const sendMessage = () => {
    const message = inputRef!.value;
    ws.send(message);
    inputRef!.value = '';
  };

  return (
    <div class="flex h-full w-full flex-col justify-between">
      <div class="flex flex-grow overflow-y-scroll" ref={scrollViewRef}>
        <div class="flex w-full flex-col justify-end">
          <For each={messages}>
            {(message) => <SharedComponent native={false} text={message.data} />}
          </For>
        </div>
      </div>
      <div class="flex flex-none flex-row">
        <textarea
          class="flex-grow border-2 border-slate-300"
          onkeypress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              sendMessage();
            }
          }}
          ref={inputRef}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};
