import WRAPPED_FLAG from '../constants/WRAPPED_FLAG'
import nomalizeUrl from '../utils/nomalizeUrl'

// Inspired by:
// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
// https://github.com/nuysoft/Mock/blob/refactoring/src/mock/xhr/xhr.js

export default mockServerUrl => {
    const xhr = window.XMLHttpRequest

    // if (xhr && !xhr[WRAPPED_FLAG]) {
    //     window.justMockBackup = {
    //         realXHR: xhr
    //     }
    //     const open = xhr.prototype.open
    //     // XMLHttpRequest.open(method, url, async, user, password)
    //     xhr.prototype.open = function() {
    //         const originUrl = arguments[1]
    //         arguments[1] = `${mockServerUrl}/mock?originUrl=${encodeURIComponent(
    //             nomalizeUrl(originUrl)
    //         )}`
    //         open.apply(this, arguments)
    //     }
    //     xhr[WRAPPED_FLAG] = true
    // }
}
