const router = require('express').Router()
const Controller = require('../controllers/studentController')

router.get('/', Controller.list)
router.post('/', Controller.payment)
router.get('/schedule', Controller.courseSchedule)
router.get('/add/courses', Controller.addCourses)
router.post('/add/courses', Controller.addCoursesPost)

module.exports = router;