const code = [
  {
    name: 'simon',
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
              copyLinkEnabled: true
          },
          right: {
              content: this.state.editedCode,
              mode: null,
              theme: null,
              editable: true,
              copyLinkEnabled: true
          },
          classes: {
              diff: 'acediff__diffLine',
              connector: 'acediff__connector',
              newCodeConnectorLinkContent: '&#8594;',
              deletedCodeConnectorLinkContent: '&#8592;'
          }
      });`
  }, {
    name: 'newton',
    code: 'No new code'
  }, {
    name: 'monique',
    code: 'I just wanna talk to my toaster :( '
  }
]

export default code;