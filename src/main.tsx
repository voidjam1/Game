window.onerror = function(msg, url, line) {
  alert("错误信息: " + msg + "\n文件: " + url + "\n行号: " + line);
};
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './styles/index.css'
import './styles/theme.css'
import './styles/tailwind.css'
import './styles/fonts.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
