insert into student (
    student_name,
    reminder_interval
) values (
    $1,
    $2
)
returning student_id