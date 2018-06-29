import { WRAPPED_FLAG } from '../constants'
import nomalizeUrl from '../utils/nomalizeUrl'

export default mockServerUrl => {
    var xhr = window.XMLHttpRequest
    if (xhr && !xhr[WRAPPED_FLAG]) {
        var open = xhr.prototype.open
        xhr.prototype.open = function() {
            const originUrl = arguments[1]
            arguments[1] = `${mockServerUrl}/mock?originUrl=${encodeURIComponent(
                nomalizeUrl(originUrl)
            )}`
            open.apply(this, arguments)
        }
        window.XMLHttpRequest = xhr
        window.XMLHttpRequest[WRAPPED_FLAG] = true
    }
}
