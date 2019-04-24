update student
set student_name = $1, reminder_interval = $2
where student_id = $3