import 'babel-polyfill'
import JustMockXHR from './wrapper/JustMockXHR'
import { backupXHR } from './utils/backupXHR'
import './wrapper/justMockFetch'

// backuo XMLHttpRequest
backupXHR()

window.XMLHttpRequest = JustMockXHR
