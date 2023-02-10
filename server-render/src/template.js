export function template(content = '') {
  return `
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
        <title>Document</title>
      </head>
      <body margin="0">
        <div id="ssr-container">${content}</div>
        <script src="client.js"></script>
      </body>
    </html>
  `
}
