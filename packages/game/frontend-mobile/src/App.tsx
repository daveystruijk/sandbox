import { ScrollView, TextField } from '@nativescript/core';
import { Component, For } from 'solid-js';
import { createStore } from 'solid-js/store';
import { createWebsocketConnection } from '@sandbox/game-frontend-api-client/src/websocket';
import { SharedComponent } from '@sandbox/game-frontend-components/src/SharedComponent';

type Message = {
  type: string;
  data: string;
};

export const ChatPage: Component = () => {
  let scrollViewRef: ScrollView | undefined;
  let inputRef: TextField | undefined;

  const [messages, setMessages] = createStore<Message[]>([]);
  const ws = createWebsocketConnection();

  // Receive messages
  ws.addEventListener('message', (m: Message) => {
    setMessages(messages.length, m);
    setTimeout(
      () => scrollViewRef!.scrollToVerticalOffset(scrollViewRef!.scrollableHeight + 256, true),
      0,
    );
  });

  // Send message
  const sendMessage = () => {
    const message = inputRef!.text;
    ws.send(message);
    inputRef!.text = '';
  };

  return (
    <flexboxlayout class="flex-col justify-between">
      <scrollview class="flex flex-grow" ref={scrollViewRef}>
        <flexboxlayout class="flex-col justify-end">
          <For each={messages}>
            {(message) => <SharedComponent native={true} text={message.data} />}
          </For>
          ;
        </flexboxlayout>
      </scrollview>
      <flexboxlayout class="flex-none flex-row">
        <textfield class="flex-grow" on:returnPress={sendMessage} ref={inputRef} />
        <button on:tap={sendMessage}>Send</button>
      </flexboxlayout>
    </flexboxlayout>
  );
};

export const App: Component = () => {
  return (
    <>
      <ChatPage />
    </>
  );
};
