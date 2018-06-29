let formatATag
export default url => {
    formatATag = formatATag || document.createElement('a')
    formatATag.href = url
    return formatATag.href
}
