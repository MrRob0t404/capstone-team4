const code = [
  {
    name: 'index.js',
    code: `var aceDiffer = new AceDiff({
        mode: null,
        theme: null,
        element: ".acediff",
        diffGranularity: 'broad',
        showDiffs: true,
        showConnectors: true,
        maxDiffs: 5000,
        left: {
          content: this.state.originalCode,
          mode: 'null',
          theme: null,
          editable: false,
          copyLinkEnabled: true,
        },
        right: {
          content: this.state.editedCode,
          mode: null,
          theme: null,
          editable: true,
          copyLinkEnabled: true,
        },
        classes: {
          diff: 'acediff__diffLine',
          connector: 'acediff__connector',
          newCodeConnectorLinkContent: '&#8594;',
          deletedCodeConnectorLinkContent: '&#8592;',
        },
      });`
  },
  {
    name: 'index.html',
    code: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">

          manifest.json provides metadata used when your web app is added to the
          homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/

        <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
        <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
        <link href="https://fonts.googleapis.com/css?family=Roboto:100" rel="stylesheet">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/solid.css" integrity="sha384-v2Tw72dyUXeU3y4aM2Y0tBJQkGfplr39mxZqlTBDUZAb9BGoC40+rdFCG0m10lXk" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/fontawesome.css" integrity="sha384-q3jl8XQu1OpdLgGFvNRnPdj5VIlCvgsDQTQB6owSOHWlAurxul7f+JpUOVdAiJ5P" crossorigin="anonymous">
        <link rel="stylesheet" href="node_modules/github-embed/npm/css/github-embed.css"><link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

        <title>React App</title>
      </head>
      <body>
        <noscript>
          You need to enable JavaScript to run this app.
        </noscript>
        <div id="root"></div>
      </body>
    </html>`
  },
  {
    name: 'style.css',
    code: `body {
    height: 100vh;
    font-family: 'Roboto', sans-serif;
    margin: 0;
    color: #272633;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    a:hover {
      opacity: .6;
    }

    button, input {
      outline: none;
      font-family: inherit;
      font-size: inherit;
      border: none;
    }

    input {
      padding: 10px 20px;
    }

    li {
      list-style: none;
    }

    ul {
      padding: 0;
      text-align: center;
    }

    .dull {
      color: #555;
    }

    .fa-code {
      font-size: 2em;
      color: #00C1AB;
    }

    .fullWidth {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    #footer {
      width: 90vw;
      height: 15vh;
      padding: 0 5%;
      border-top: 1px solid #ddd;
      display: flex;
      align-self: center;
      align-items: center;
      justify-content: space-between;
    }

    #footer > .fa-github {
      font-size: 2.5em;
      color: #00C1AB;
      margin-left: 47.5%;
    }

    #global-nav {
      display: flex;
      background-color: #272633;
      justify-content: space-around;
      box-shadow: 0 2px 10px #ccc;
      padding: 15px;
      font-size: 1.5em;
      color: white;
      z-index: 1;
    }

    #global-nav > a{
      padding-top: 5px;
      font-weight: 300;
    }

    #global-nav > a:first-of-type{
      padding-top: 0;
    }

    #search {
      height: 25px;
      font-size: .75em;
    }

    #search-bar {
      width: 45vw;
    }

    #search-button {
      width: 3em;
      font-size: inherit;
      padding: 10px 0;
      border: none;
      background-color: #8AD42C;
      color: white;
    }

    #search-button:hover {
      background-color: #8AD42C;
      color: white;
    }`
  }
]

export default code
