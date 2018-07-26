// import EventTarget from './EventTarget'
// import READY_STATE from '../constants/READY_STATE'
// import isMatchMock from '../utils/isMatchMock'
// import { createNativeXHR } from '../utils/backupXHR'
//
// const DEFAULT_STATE = 0
//
// // refrence
// // https://github.com/nuysoft/Mock/blob/refactoring/src/mock/xhr/xhr.js
// // https://github.com/chromium/chromium/tree/master/third_party/WebKit/LayoutTests/http/tests/xmlhttprequest
// //
// export default class JustMockXHR extends EventTarget {
//     constructor() {
//         super()
//         this.realServerXHR = createNativeXHR()
//         this.customReadyState = READY_STATE.UNSENT
//         this.customState = DEFAULT_STATE
//         // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/timeout
//         this.timeout = 0
//         // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials
//         this.withCredentials = false
//         this.openParams = []
//         this.setRequestHeaderParamList = []
//         this.overrideMimeTypeValue = null
//         // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload
//         this.upload = {
//             onabort: null,
//             onerror: null,
//             onload: null,
//             onloadend: null,
//             onloadstart: null,
//             onprogress: null,
//             ontimeout: null
//         }
//     }
//     static get isJustMock() {
//         return true
//     }
//     // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
//     get readyState() {
//         return this.customReadyState
//     }
//     // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/response
//     get response() {}
//     // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseText
//     get responseText() {}
//     // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
//     get responseType() {}
//     // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseURL
//     get responseURL() {}
//     // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseXML
//     get responseXML() {}
//     // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/status
//     get status() {
//         return this.customState
//     }
//     // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/statusText
//     get statusText() {}
//     // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open
//     open(...params) {
//         if (params.length === 0) {
//             throw new Error(
//                 "Failed to execute 'open' on 'XMLHttpRequest': 2 arguments required, but only 0 present."
//             )
//         }
//         if (params.length === 1) {
//             throw new Error(
//                 "Failed to execute 'open' on 'XMLHttpRequest': 2 arguments required, but only 1 present."
//             )
//         }
//         this.openParams = params
//     }
//     // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send
//     // xhr.send('string');
//     // xhr.send(new Blob());
//     // xhr.send(new Int8Array());
//     // xhr.send(document);
//     send(body) {
//         if (this.customReadyState !== READY_STATE.OPENED) {
//             throw new Error(
//                 "Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED."
//             )
//         }
//         isMatchMock(
//             {
//                 openParams
//             },
//             isMatch => {
//                 if (isMatch) {
//                 } else {
//                     this.realXHR.open(...params)
//                 }
//             }
//         )
//
//         // xhr.onload = function () {
//         //   // Request finished. Do processing here.
//         // };
//         // xhr.onreadystatechange = function() {//Call a function when the state changes.
//         //     if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
//         //         // Request finished. Do processing here.
//         //     }
//         // }
//     }
//     // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/abort
//     abort() {
//         // TODO:
//         this.customState = DEFAULT_STATE
//         this.customReadyState = READY_STATE.UNSENT
//     }
//     // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders
//     getAllResponseHeaders() {}
//     // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getResponseHeader
//     getResponseHeader(key) {
//         if (arguments.length === 0) {
//             throw new Error(
//                 "Failed to execute 'getResponseHeader' on 'XMLHttpRequest': 1 argument required, but only 0 present."
//             )
//         }
//     }
//     // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/overrideMimeType
//     overrideMimeType(mimeType) {
//         if (
//             this.customReadyState === READY_STATE.LOADING ||
//             this.customReadyState === READY_STATE.DONE
//         ) {
//             throw new Error(
//                 "Failed to execute 'overrideMimeType' on 'XMLHttpRequest': MimeType cannot be overridden when the state is LOADING or DONE."
//             )
//         }
//         this.overrideMimeTypeValue = mimeType
//     }
//     // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader
//     setRequestHeader(header, value) {
//         if (arguments.length === 0) {
//             throw new Error(
//                 "Failed to execute 'setRequestHeader' on 'XMLHttpRequest': 2 arguments required, but only 0 present."
//             )
//         }
//         if (arguments.length === 1) {
//             throw new Error(
//                 "Failed to execute 'setRequestHeader' on 'XMLHttpRequest': 2 arguments required, but only 1 present."
//             )
//         }
//         if (this.customReadyState !== READY_STATE.OPENED) {
//             throw new Error(
//                 "Failed to execute 'setRequestHeader' on 'XMLHttpRequest': The object's state must be OPENED."
//             )
//         }
//         this.setRequestHeaderParamList.push({ header, value })
//     }
//     // --------------Events--------------
//     // ontimeout
//     // onreadystatechange
//     // onabort
//     // onerror
//     // onload
//     // onloadstart
//     // onprogress
// }
