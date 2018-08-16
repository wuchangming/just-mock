const DevTools = {
    instrument: () => (window.devToolsExtension ? window.devToolsExtension() : f => f)
}
export default DevTools
