var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '𝓟&𝓨 𝓒𝓸𝓻𝓹' });
});


router.post('/register', function(req, res) {
  sess = req.session;
  var db = req.db;
  var collection = db.get('user');
  console.log(collection);

  collection.insert(req.body, function(err, result){
    res.send((err === null) ? { msg: 'Success' } : { msg:'error: ' + err });
    
  });
 
});

router.post('/login', function(req, res) {
  sess = req.session;
  console.log(sess)
  var db = req.db;
  let { email, password } = req.body;
sess.email = req.body.email;
  db.collection('user').findOne({ email }, (err, result) => {
    if (err) throw err;
if(result){
console.log(result.password)
if(result.password == password)
{
  res.redirect('/home')

}else{
  console.log("Invalid password")
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/error');
    }


  });

}
}else{
console.log("Invalid user id ")
req.session.destroy(function (err) {
  if (err) {
    console.log(err);
  } else {
    res.redirect('/error');
  }
})
}
});
  
});


router.get('/logout', function (req, res) {
  console.log("logout")
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }


  });

});



module.exports = router;