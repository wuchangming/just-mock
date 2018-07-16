import { createNativeXHR } from '../utils/backupXHR'
import DEFAULT_MOCK_SERVER_HOST from '../constants/DEFAULT_MOCK_SERVER_HOST'
import nomalizeUrl from './nomalizeUrl'

const createFormBody = body => {
    let str = ''
    let first = true
    for (let key of Object.keys(body)) {
        let value = body[key]
        str += `${first ? '' : '&'}${key}=${value === null || value === undefined ? '' : value}`
        first = false
    }
    return str
}

export default function isMatchMock(openParams, done) {
    const url = nomalizeUrl(openParams.url)
    const { async = true, method } = openParams
    const realXHR = createNativeXHR()
    let protocol = location.protocol
    if (protocol !== 'https:') {
        protocol = 'http:'
    }
    let isDone = false
    const doneOnce = (flag = true) => {
        if (!isDone) {
            isDone = true
            done(flag)
        }
    }
    realXHR.open('get', `${protocol}//${DEFAULT_MOCK_SERVER_HOST}/is-match-mock`, async)
    realXHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    // sync
    if (async === false) {
        try {
            realXHR.send(
                createFormBody({
                    url: encodeURIComponent(url),
                    method
                })
            )
            try {
                const res = JSON.parse(realXHR.response)
                doneOnce(!!res.isMatch)
            } catch (e) {
                console.error(`cannot connect to just-mock server!`)
                doneOnce(false)
            }
        } catch (e) {
            // handle sync
            console.error('cannot connect to just-mock server!')
            doneOnce(false)
        }
    } else {
        realXHR.onreadystatechange = function(oEvent) {
            if (realXHR.readyState === 4) {
                if (realXHR.status >= 200 && realXHR.status < 300) {
                    try {
                        const res = JSON.parse(realXHR.response)
                        doneOnce(!!res.isMatch)
                    } catch (e) {
                        console.error(`cannot connect to just-mock server!`)
                        doneOnce(false)
                    }
                } else {
                    console.error(`cannot connect to just-mock server!`)
                    doneOnce(false)
                }
            }
        }
        realXHR.send(
            createFormBody({
                url: encodeURIComponent(url),
                method: method.toLocaleUpperCase()
            })
        )
    }
}
