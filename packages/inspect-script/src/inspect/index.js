import 'babel-polyfill'
import JustMockXHR from './wrapper/JustMockXHR'
import { backupXHR } from './utils/backupXHR'

// backuo XMLHttpRequest
backupXHR()

window.XMLHttpRequest = JustMockXHR
