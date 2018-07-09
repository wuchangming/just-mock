import EventTarget from './EventTarget'
import READY_STATE from '../constants/READY_STATE'
import isMatchMock from '../utils/isMatchMock'

// refrence
// https://github.com/nuysoft/Mock/blob/refactoring/src/mock/xhr/xhr.js
//
export default class JustMockXHR extends EventTarget {
    constructor() {
        super()
        this.realXHR = window.XMLHttpRequest
        this.customReadyState = READY_STATE.UNSENT
        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/timeout
        this.timeout = 0
        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials
        this.withCredentials = false
        this.openParams = []
        this.setRequestHeaderParams = []
    }
    static get isJustMock() {
        return true
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
    get readyState() {
        return this.customReadyState
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/response
    get response() {}
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseText
    get responseText() {}
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
    get responseType() {}
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseURL
    get responseURL() {}
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseXML
    get responseXML() {}
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/status
    get status() {}
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/statusText
    get statusText() {}
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload
    get upload() {}
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open
    open(...params) {
        this.openParams = params
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send
    // xhr.send('string');
    // xhr.send(new Blob());
    // xhr.send(new Int8Array());
    // xhr.send(document);
    send(body) {
        isMatchMock(
            {
                openParams,
                body
            },
            isMatch => {
                if (isMatch) {
                } else {
                    this.realXHR.open(...params)
                }
            }
        )

        // xhr.onload = function () {
        //   // Request finished. Do processing here.
        // };
        // xhr.onreadystatechange = function() {//Call a function when the state changes.
        //     if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        //         // Request finished. Do processing here.
        //     }
        // }
    }
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort
    abort() {}
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders
    getAllResponseHeaders() {}
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getResponseHeader
    getResponseHeader() {}
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/overrideMimeType
    overrideMimeType() {}
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader
    setRequestHeader(header, value) {
        this.setRequestHeaderParams.push({ header, value })
    }
    // --------------Events--------------
    // ontimeout
    // onreadystatechange
    // onabort
    // onerror
    // onload
    // onloadstart
    // onprogress
}
