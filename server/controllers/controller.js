module.exports = {
    requestAllStudents: (req, res) => {
        const db = req.app.get('db')

        db.request_all()
        .then(students => {
            res.status(200).send(students)
        })

    },
    requestStudent: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params

        const studentData = await db.request_student(id)
        const behaviorData = await db.request_behaviors(id)
        
        const behaviors = behaviorData.map(behavior => {
            let {behavior_id, behavior_name, behavior_desc, assoc_student_id, behavior_type_id} = behavior
            return {
                behavior_id,
                behavior_name,
                behavior_desc,
                assoc_student_id,
                behavior_type_id
            }
        })
        const {student_id, student_name, reminder_interval} = studentData[0]

        const student = {
            student_id,
            student_name,
            reminder_interval,
            behaviors
        }
        res.status(200).send([student])
    
    },
    saveChanges: async (req,res) => {
        const db = req.app.get('db')
        const {student_id, student_name, reminder_interval, behaviors} = req.body

        db.update_student([student_name, reminder_interval, student_id])

        behaviors.forEach(function(behavior){
            const {behavior_name, behavior_desc, behavior_id} = behavior

            db.update_behavior([behavior_name, behavior_desc, behavior_id])
        })
    },

    submitLog: async (req, res) => {
        const db = req.app.get('db')
        console.log(req.body)
        const {student_id, behavior_id, behavior_type_id, time, log_comment} = req.body

        let time_id = await db.check_time([time])
        console.log(time_id[0].time_slot_id)

        const time_slot_id = time_id[0].time_slot_id

        db.submit_log([student_id, behavior_id, behavior_type_id, time_slot_id, log_comment])
        .then(log => {
            res.status(200).send(log)
        })

    },

    requestLogs: async (req, res) => {
        const db = req.app.get('db')
        const {id, date} = req.params
        console.log('PARAMS', req.params)

        let dbDate = `${date}T06:00:00.000Z`

        const logs = await db.request_logs([id, dbDate])

        res.status(200).send(logs)
    
    },
    addStudent: async (req, res) => {
        const {student_id, behavior_id, behavior_type_id, time, log_comment} = req.body
            let id = await db.add_student([student_name, reminder_interval])

            behaviors.forEach(function(behavior){
                const {behavior_name, behavior_desc} = behavior
    
                db.add_behavior([behavior_name, behavior_desc])
            })

    }
}