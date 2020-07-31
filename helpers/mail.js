let nodemailer = require('nodemailer');


function mail(email, total) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'lutzrine@gmail.com',
            pass: 'c0r1n3lutz'
        }
    });

    const mailOptions = {
        from: 'lutzrine@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'Pembayaran Semester Pendek Arnoldi University', // Subject line
        html: `<h1>Arnoldi University</h1> <p>Silahkan melakukan pembayaran lalu mengajukan ke Baak ya supaya kamu bisa join kelas semester pendek kamu!
                  Total pembayaran : ${total}</p>` // plain text body
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}

module.exports = mail