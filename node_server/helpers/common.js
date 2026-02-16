const isBlank = (item) => {
    if(item === '' || item === undefined || item === 0 || item === NaN){
        return true
    }
    return false
}

export default {
    isBlank
}