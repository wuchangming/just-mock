import isMatchMock from '../utils/isMatchMock'
import { fakeXhr, fakeServer } from 'nise'

const DEFAULT_STATE = 0

// refrence
// https://github.com/sinonjs/nise
//
export default class JustMockXHR extends fakeXhr.FakeXMLHttpRequest {
    constructor() {
        super()
    }
    send(data) {
        super.send(data)
        const { method, url, async, username, password } = this
        const openParams = { method, url, async, username, password }
        isMatchMock(openParams, isMatch => {
            console.log(`isMatch: ${isMatch}`);
            if (isMatch) {
                // console.log(`isMatch: ${isMatch}`);
            } else {

            }
        })
    }
}
