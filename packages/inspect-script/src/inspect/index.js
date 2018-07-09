import './wrapper/fetchWrapper'
import DEFAULT_MOCK_SERVER_URL from './constants/DEFAULT_MOCK_SERVER_URL'
import XMLHttpRequestWrapper from './wrapper/XMLHttpRequestWrapper'
import JustMockXHR from './wrapper/JustMockXHR.js'

/*
    PhantomJS
    TypeError: '[object EventConstructor]' is not a constructor (evaluating 'new Event("readystatechange")')
    https://github.com/bluerail/twitter-bootstrap-rails-confirm/issues/18
    https://github.com/ariya/phantomjs/issues/11289
*/
try {
    new window.Event('custom')
} catch (exception) {
    window.Event = function(type, bubbles, cancelable, detail) {
        var event = document.createEvent('CustomEvent') // MUST be 'CustomEvent'
        event.initCustomEvent(type, bubbles, cancelable, detail)
        return event
    }
}
// 备份原生 XMLHttpRequest
window.justMockBackup = {
    XMLHttpRequest: window.XMLHttpRequest,
    ActiveXObject: window.ActiveXObject
}

window.JustMockXHR = JustMockXHR
