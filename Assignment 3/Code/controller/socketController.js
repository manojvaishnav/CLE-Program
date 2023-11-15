module.exports.testSocket=async(req,res)=>{
try {
    res.send('ok')
} catch (error) {
    res.send(error)
}
}