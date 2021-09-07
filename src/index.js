import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import axios from 'axios';

import { router } from './routers';
import { RouterContext } from "@happysanta/router";
import { ConfigProvider } from "@vkontakte/vkui";

import App from "./App";

// Init VK  Mini App
bridge.send("VKWebAppInit");
bridge.send("VKWebAppJoinGroup", {"group_id": 204782028});

axios.defaults.baseURL = 'https://all-shop.localhostov.ru:444';
axios.defaults.headers.common['auth'] = window.location.search.substring(1);

bridge.subscribe(({ detail: { type, data }}) => {
  if (type === 'VKWebAppUpdateConfig') {
    const schemeAttribute = document.createAttribute('scheme');
    schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
    document.body.attributes.setNamedItem(schemeAttribute);
  }
});

ReactDOM.render(<RouterContext.Provider value={router}>
  <ConfigProvider isWebView={true}>
    <App />
  </ConfigProvider>
</RouterContext.Provider>, document.getElementById("root"));