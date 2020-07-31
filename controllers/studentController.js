const { Student, Teacher, Course, StudentCourse } = require('../models/')
const currency = require('../helpers/currency')
const nominalSks = require('../helpers/amountsks')
const mail = require('../helpers/mail')

class StudentController {
    static list(req, res) {
        let dataSession = req.session.StudentId
        StudentCourse.findAll({
                include: [Course],
                where: {
                    StudentId: dataSession,
                    status: false
                }
            })
            .then((data) => {
                let total = 0
                if (data.length === 1) {
                    total = nominalSks(data[0].Course.sks_amount)
                } else {
                    data.forEach(el => {
                        total += nominalSks(el.Course.sks_amount)
                    });
                }
                res.render('./students/list.ejs', { data, currency, nominalSks, total })
            })
            .catch((err) => {
                res.send(err)
            })
    }


    static payment(req, res) {
        let id = req.session.StudentId
        Student.findByPk(id)
            .then((data) => {
                mail(data.email, currency(+req.body.total))
                res.send(`<p>Berhasil mengirimkan email, silahkan cek email anda. Untuk kembali tekan <a href="/students">disini</a></p>`)
            })
            .catch((err) => {
                res.send(err)
            })
    }

    static courseSchedule(req, res) {
        let dataSession = req.session.StudentId
        StudentCourse.findAll({
                include: [Course],
                where: {
                    StudentId: dataSession
                }
            })
            .then((data) => {
                if (data.length === 0) {
                    res.send(`<p>Belum ada jadwal yang bisa anda ikuti. Silahkan pilih terlebih dahulu kemudian payment.</> <p><a href="/students">Back</a></p>`)
                } else {
                    res.render('./students/schedule.ejs', { data })
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addCourses(req, res) {
        Course.findAll({
                include: [Teacher],
                order: [
                    ['id', 'ASC']
                ]
            })
            .then((data) => {
                res.render('./students/form.ejs', { data, currency, nominalSks })
            })
            .catch((err) => {
                res.send(err)
            })

    }

    static addCoursesPost(req, res) {

        let dataSession = req.session.StudentId
        let courses = req.body.courses
        let newRegir = []
        courses.forEach(el => {
            newRegir.push({ StudentId: dataSession, CourseId: +el, status: false })
        });
        StudentCourse.bulkCreate(newRegir)
            .then((data) => {
                res.redirect('/students')
            })
            .catch((err) => {
                res.send(err)
            })
    }
}

module.exports = StudentController;