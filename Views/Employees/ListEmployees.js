import EmployeeCard from './EmployeeCard'

export default function ListEmployees ({ employees }) {
  return (
    employees.map((employees) => (
      <EmployeeCard
        key={employees.id_empleado}
        name={employees.name}
        secName={employees.sec_name}
        lastName={employees.last_name}
        occupation={employees.occupation}
        rfidCard={employees.rfid_card}
      />
    ))
  )
}
