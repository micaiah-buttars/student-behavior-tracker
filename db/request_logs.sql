select *
from student_log sl
join time_slot ts on sl.time_slot_id = ts.time_slot_id
where student_id = $1 and
log_date = $2
