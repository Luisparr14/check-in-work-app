import EmployeeCard from './EmployeeCard'

export default function ListEmployees ({ employees }) {
  console.log(employees)
  return (
    employees.map((employees) => (
      <EmployeeCard
        key={employees.id_empleado}
        name={employees.name}
        secName={employees.sec_name}
        lastName={employees.last_name}
        rol={employees.nombre_rol}
        rfidCard={employees.rfid_card}
      />
    ))
  )
}
