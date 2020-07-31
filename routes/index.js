const router = require('express').Router()
const Controller = require('../controllers/indexController')
const Student = require('./student')
const Baak = require('./baak')
const BaakController = require('../controllers/baakController')

function checkSession(req, res, next) {

    if (req.session.StudentId || req.session.TeacherId) {
        next()
    } else {
        res.send('can not access')
    }
}

function checkRole(req, res, next) {
    if (req.session.role === "student") {
        res.send('can not access ')
    } else if (req.session.role === 'admin') {
        next()
    } else {
        res.send(`<p>Can not access this web, please log in or sign up first. Click <a href="/baaks/login">here</a></p>.`)
    }
}


router.get('/', Controller.home)
router.get('/contact-us', Controller.contactUs)
router.get('/fakultas', Controller.fakultasDisplay)
router.get('/login', Controller.login)
router.post('/login', Controller.validate)
router.get('/signup', Controller.signup)
router.post('/signup', Controller.signupPost)

router.get('/baaks/signup', BaakController.signup)
router.post('/baaks/signup', BaakController.signupPost)
router.get('/baaks/login', Controller.login)

router.get('/logout', Controller.logout)
router.use('/students', checkSession, Student)



router.use(checkRole)
router.post('/baaks/login', Controller.validate)

router.use('/baaks', Baak)

module.exports = router;