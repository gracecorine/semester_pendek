const { User, Student } = require('../models/index')

class HomePage {
    static home(req, res) {
        res.render('homePage')
    }

    static contactUs(req, res) {
        res.render('contactUs')
    }

    static fakultasDisplay(req, res) {
        res.render('fakultas')
    }

    static login(req, res) {
        res.render('login')
    }

    static validate(req, res) {
        let { email, password } = req.body
        User.findOne({
                where: {
                    email
                }
            })
            .then((data) => {
                if (password == data.password) {
                    if (data.role == 'student') {
                        req.session.StudentId = data.StudentId
                        req.session.role = data.role
                        res.redirect('/students')
                    } else {
                        req.session.TeacherId = data.TeacherId
                        req.session.role = data.role
                        res.redirect('/baaks')
                    }
                } else {
                    res.redirect('/login')
                }
            })
            .catch((err) => {
                res.redirect('/')
            })
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/')
    }

    static signup(req, res) {
        res.render('signup')
    }

    static signupPost(req, res) {
        let email = req.body.email
        Student.findOne({
                where: {
                    email: email
                }
            })
            .then((data) => {
                if (data) {
                    let StudentId = data.id
                    let newUser = {
                        email: req.body.email,
                        password: req.body.password,
                        role: req.body.role,
                        StudentId
                    }
                    return User.create(newUser)
                } else {
                    res.redirect('/signup')
                }
            })
            .then((data) => {
                res.redirect('/')
            })
            .catch((err) => {
                res.send(err)
            })
    }



}

module.exports = HomePage;