import React from "react";
import ReactDom from 'react-dom/client'
import App from './app.md'

const appRoot = ReactDom.createRoot(document.querySelector('#app'))
appRoot.render(<App/>)
