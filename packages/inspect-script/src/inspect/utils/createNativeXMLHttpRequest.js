export default function createNativeXMLHttpRequest() {
    var isLocal = (function() {
        var rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
        var rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/
        var ajaxLocation = location.href
        var ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || []
        return rlocalProtocol.test(ajaxLocParts[1])
    })()

    return window.ActiveXObject
        ? (!isLocal && createStandardXHR()) || createActiveXHR()
        : createStandardXHR()

    function createStandardXHR() {
        try {
            return new window.justMockBackup.XMLHttpRequest()
        } catch (e) {}
    }

    function createActiveXHR() {
        try {
            return new window.justMockBackup.ActiveXObject('Microsoft.XMLHTTP')
        } catch (e) {}
    }
}
