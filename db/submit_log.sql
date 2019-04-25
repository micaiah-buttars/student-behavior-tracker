insert into student_log (
    student_id,
    behavior_id,
    behavior_type_id,
    time_slot_id,
    log_comment
) values (
    $1,
    $2,
    $3,
    $4,
    $5
)