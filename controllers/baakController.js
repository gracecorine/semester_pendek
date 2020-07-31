const { Teacher, Student, Course, StudentCourse, User } = require('../models')

class BaakController {
    static welcome(req, res) {
        res.render('./baaks/home')
    }

    // CRUD STUDENT
    static listStudent(req, res) {
        Student.findAll()
            .then((data) => {
                res.render('./baaks/listStudent.ejs', { data })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static status(req, res) {
        StudentCourse.findAll({
                include: [Student],
                where: {
                    status: false
                }
            })
            .then((data) => {
                res.render('./baaks/status', { data })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static createStudent(req, res) {
        res.render('./baaks/formStudent.ejs')
    }

    static createStudentPost(req, res) {
        let newStudent = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            npm: +req.body.npm,
            email: req.body.email,
            major: req.body.major,
            class: req.body.class
        }
        Student.create(newStudent)
            .then((data) => {
                res.redirect('/baaks/students')
            })
            .catch((err) => {
                let errors = []
                err.errors.forEach(el => {
                    errors.push(el.message)
                });
                res.send(errors)
            })
    }

    static editStudent(req, res) {
        let id = req.params.id
        Student.findByPk(id)
            .then((data) => {
                res.render('./baaks/editStudent', { data })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static editStudentPost(req, res) {
        let id = +req.params.id
        let editStudent = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            npm: +req.body.npm,
            email: req.body.email,
            major: req.body.major,
            class: req.body.class
        }
        Student.update(editStudent, {
                where: {
                    id: id
                }
            })
            .then((data) => {
                res.redirect('/baaks/students')
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static deleteStudent(req, res) {
        let id = +req.params.id
        Student.destroy({
                where: {
                    id: id
                }
            })
            .then((data) => {
                res.redirect('/baaks/students')
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static changeStatus(req, res) {
        let id = +req.params.id
        StudentCourse.update({ status: true }, {
                where: {
                    StudentId: id
                },
                returning: true
            })
            .then((data) => {
                res.redirect('/baaks/students/status')
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static getStatus(req, res) {
        StudentCourse.findAll({
                include: [Student],
                where: {
                    status: true
                }
            })
            .then((data) => {
                res.render('./baaks/deleteStatus.ejs', { data })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static statusDelete(req, res) {
        let id = +req.params.id
        StudentCourse.destroy({
                where: {
                    id: id
                }
            })
            .then((data) => {
                res.redirect('/baaks/students/status/true')
            })
            .catch((err) => {
                res.send(err)
            })
    }



    // CRUD COURSE
    static listCourses(req, res) {
        Course.findAll({
                include: [Teacher],
            })
            .then((data) => {
                res.render('./baaks/listCourse.ejs', { data })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static createCourses(req, res) {
        Teacher.findAll({
                order: [
                    ['first_name', 'ASC']
                ]
            })
            .then((data) => {
                res.render('./baaks/formCourse.ejs', { data })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static createCoursesPost(req, res) {
        let newCourse = {
            name: req.body.name,
            sks_amount: +req.body.sks_amount,
            classroom: req.body.classroom,
            course_schedule: req.body.course_schedule,
            TeacherId: req.body.TeacherId
        }
        Course.create(newCourse)
            .then((data) => {
                res.redirect('/baaks/courses')
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static editCourses(req, res) {
        let id = +req.params.id
        let course = null
        Course.findByPk(id)
            .then((data) => {
                course = data
                return Teacher.findAll({
                    order: [
                        ['first_name', 'ASC']
                    ]
                })
            })
            .then((data) => {
                res.render('./baaks/editCourse', { course, data })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static editCoursesPost(req, res) {
        let id = +req.params.id
        let editCourse = {
            name: req.body.name,
            sks_amount: +req.body.sks_amount,
            classroom: req.body.classroom,
            course_schedule: req.body.course_schedule,
            TeacherId: req.body.TeacherId
        }
        Course.update(editCourse, {
                where: {
                    id: id
                }
            })
            .then((data) => {
                res.redirect('/baaks/courses')
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static deleteCourses(req, res) {
        let id = +req.params.id
        Course.destroy({
                where: {
                    id: id
                }
            })
            .then((data) => {
                res.redirect('/baaks/courses')
            })
            .catch((err) => {
                res.send(err)
            })
    }



    // CRUD TEACHER
    static listTeacher(req, res) {
        Teacher.findAll()
            .then((data) => {
                res.render('./baaks/listTeacher.ejs', { data })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static createTeacher(req, res) {
        res.render('./baaks/formTeacher.ejs')
    }

    static createTeacherPost(req, res) {
        let newTeacher = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            nik: +req.body.nik,
            room_location: req.body.room_location,
            email: req.body.email
        }
        Teacher.create(newTeacher)
            .then((data) => {
                res.redirect('/baaks/teachers')
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static editTeacher(req, res) {
        let id = +req.params.id
        Teacher.findByPk(id)
            .then((data) => {
                res.render('./baaks/editTeacher', { data })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static editTeacherPost(req, res) {
        let id = +req.params.id
        let editTeacher = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            nik: +req.body.nik,
            room_location: req.body.room_location,
            email: req.body.email
        }
        Teacher.update(editTeacher, {
                where: {
                    id: id
                }
            })
            .then((data) => {
                res.redirect('/baaks/teachers')
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static deleteTeacher(req, res) {
        let id = +req.params.id
        Teacher.destroy({
                where: {
                    id: id
                }
            })
            .then((data) => {
                res.redirect('/baaks/teachers')
            })
            .catch((err) => {
                res.send(err)
            })
    }


    /// sign up baak jalur belakang
    static signup(req, res) {
        res.render('./baaks/signup')
    }

    static signupPost(req, res) {

        let newUser = {
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            TeacherId: 1
        }

        User.create(newUser)

        .then((data) => {
                res.redirect('/baaks/login')
            })
            .catch((err) => {
                res.send(err)
            })
    }
}

module.exports = BaakController;