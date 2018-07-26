import isMatchMock from '../utils/isMatchMock'
import { fakeXhr, fakeServer } from 'nise'
import { createNativeXHR } from '../utils/backupXHR'

const { FakeXMLHttpRequest } = fakeXhr
const DEFAULT_STATE = 0
// largest arity in XHR is 5 - XHR#open
function apply(obj, method, args) {
    switch (args.length) {
        case 0:
            return obj[method]()
        case 1:
            return obj[method](args[0])
        case 2:
            return obj[method](args[0], args[1])
        case 3:
            return obj[method](args[0], args[1], args[2])
        case 4:
            return obj[method](args[0], args[1], args[2], args[3])
        case 5:
            return obj[method](args[0], args[1], args[2], args[3], args[4])
        default:
            throw new Error('Unhandled case')
    }
}

// refrence
// https://github.com/sinonjs/nise
//
// 不兼容重复使用的 XHR objects，另一方面重复使用容易导致出错。https://stackoverflow.com/a/11079569
export default class JustMockXHR extends FakeXMLHttpRequest {
    isMock = true
    hasUsed = false
    send = data => {
        if (this.hasUsed) {
            throw new Error('JustMockXHR do not support invoke `xhr.send()` multi time !')
        }
        this.hasUsed = true
        const { method, url, async, username, password } = this
        const openParams = { method, url, async, username, password }
        isMatchMock(openParams, mockRes => {
            const { isMatch, respondInfo } = mockRes
            const { method, url, async, username, password } = openParams
            this.isMock = isMatch
            if (isMatch) {
                // console.log(`isMatch: ${isMatch}`)
                const { status, header, body } = respondInfo
                this.respond(status, header, body)
            } else {
                var xhr = createNativeXHR()
                xhr.open(method, url, async, username, password)
                // setRequestHeader
                Object.keys(this.requestHeaders || {}).forEach(header => {
                    xhr.setRequestHeader(header, this.requestHeaders[header])
                })
                ;[
                    'open',
                    'setRequestHeader',
                    'abort',
                    'getResponseHeader',
                    'getAllResponseHeaders',
                    'addEventListener',
                    'overrideMimeType',
                    'removeEventListener'
                ].forEach(method => {
                    this[method] = (...args) => {
                        return apply(xhr, method, args)
                    }
                })

                var copyAttrs = args => {
                    args.forEach(attr => {
                        this[attr] = xhr[attr]
                    })
                }

                var stateChange = () => {
                    this.readyState = xhr.readyState
                    if (xhr.readyState >= FakeXMLHttpRequest.HEADERS_RECEIVED) {
                        copyAttrs(['status', 'statusText'])
                    }
                    if (xhr.readyState >= FakeXMLHttpRequest.LOADING) {
                        copyAttrs(['response'])
                        if (xhr.responseType === '' || xhr.responseType === 'text') {
                            copyAttrs(['responseText'])
                        }
                    }
                    if (
                        xhr.readyState === FakeXMLHttpRequest.DONE &&
                        (xhr.responseType === '' || xhr.responseType === 'document')
                    ) {
                        copyAttrs(['responseXML'])
                    }
                    if (this.onreadystatechange) {
                        this.onreadystatechange.call(this, {
                            target: this,
                            currentTarget: this
                        })
                    }
                }

                if (xhr.addEventListener) {
                    Object.keys(this.eventListeners).forEach(event => {
                        this.eventListeners[event].forEach(handler => {
                            xhr.addEventListener(event, handler.listener, {
                                capture: handler.capture,
                                once: handler.once
                            })
                        })
                    })

                    xhr.addEventListener('readystatechange', stateChange)
                } else {
                    xhr.onreadystatechange = stateChange
                }
                if (async) {
                    xhr.responseType = this.responseType
                }
                xhr.send(data)
            }
        })
    }
}
