var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    sess = req.session;
    var db = req.db;
var email = sess.email;

    
//     info = {
// name
// : "Yasmeen",
// email
// : "yaso1829@gmail.com",
// phonenumber
// : "9008545424",
// address
// : "134 - wse/wre , velcahery",
// account
// : "1500"
// }
    if(sess.email){

    db.collection('user').findOne({ email }, (err, result) => {
        if (err) throw err;
        if(result){
    res.render('home', { title: '𝓟&𝓨 𝓒𝓸𝓻𝓹' , Info : result});
}
})
    } else{
        res.redirect('/')
    }
});





  
module.exports = router;
