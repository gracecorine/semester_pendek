
function formatUang(value){
    let data = value.toLocaleString().split(',').join('.')
    let result = `Rp ${data},00`
    return result
}

module.exports= formatUang;