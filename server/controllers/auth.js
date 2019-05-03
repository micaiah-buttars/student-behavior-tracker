const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const {name, email, password} = req.body

        let teacherRes = await db.get_teacher(email) 
        let teacher = teacherRes[0]

        if(teacher){
            return res.status(409).send('Email address already taken.')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        let data = await db.register_teacher({name, email, password: hash})
        let newTeacher = data[0]

        req.session.teacher = newTeacher
        res.send(req.session.teacher)
    },

    login: async (req, res) => {
        let db = req.app.get('db')
        let {email, password} = req.body

        let data = await db.get_teacher(email)
        let teacher = data[0]

        if(!teacher){
            return res.status(401).send('Invalid Credentials')
        }

        const isAuthenticated = bcrypt.compareSync(password, teacher.hash)
        if(!isAuthenticated){
            return res.status(403).send('Invalid Credentials')
        }

        delete teacher.hash

        req.session.teacher = teacher
        res.send(req.session.user)

    },
    
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }

}