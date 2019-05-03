insert into teacher (
    teacher_name,
    teacher_email,
    hash
) values (
    $1,
    $2,
    $3
)
returning teacher_id, teacher_name