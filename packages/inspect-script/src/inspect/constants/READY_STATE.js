// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
export default {
    UNSENT: 0, // Client has been created. open() not called yet.
    OPENED: 1, // open() has been called.
    HEADERS_RECEIVED: 2, // send() has been called, and headers and status are available.
    LOADING: 3, // Downloading; responseText holds partial data.
    DONE: 4 // The operation is complete.
}
