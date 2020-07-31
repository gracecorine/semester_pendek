const router = require('express').Router()
const Controller = require('../controllers/baakController')

router.get('/', Controller.welcome)

// Router Students
router.get('/students', Controller.listStudent)
router.get('/students/status', Controller.status)

router.get('/add/students', Controller.createStudent)
router.post('/add/students', Controller.createStudentPost)
router.get('/students/status/true', Controller.getStatus)
router.get('/students/status/true/:id/delete', Controller.statusDelete)
router.get('/:id/edit/students', Controller.editStudent)
router.post('/:id/edit/students', Controller.editStudentPost)
router.get('/:id/status', Controller.changeStatus)
router.get('/:id/delete/students', Controller.deleteStudent)


// Router Teachers
router.get('/teachers', Controller.listTeacher)
router.get('/add/teachers', Controller.createTeacher)
router.post('/add/teachers', Controller.createTeacherPost)
router.get('/:id/edit/teachers', Controller.editTeacher)
router.post('/:id/edit/teachers', Controller.editTeacherPost)
router.get('/:id/delete/teachers', Controller.deleteTeacher)

// Router Courses
router.get('/courses', Controller.listCourses)
router.get('/add/courses', Controller.createCourses)
router.post('/add/courses', Controller.createCoursesPost)
router.get('/:id/edit/courses', Controller.editCourses)
router.post('/:id/edit/courses', Controller.editCoursesPost)
router.get('/:id/delete/courses', Controller.deleteCourses)


module.exports = router;