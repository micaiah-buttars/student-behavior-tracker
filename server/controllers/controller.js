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
    saveChanges: (req,res) => {
        const db = req.app.get('db')
        const {student_id, student_name, reminder_interval, behaviors} = req.body

        db.update_student([student_name, reminder_interval, student_id])

        behaviors.forEach(function(behavior){
            const {behavior_name, behavior_desc, behavior_id} = behavior

            db.update_behavior([behavior_name, behavior_desc, behavior_id])
        })

        
    }


}