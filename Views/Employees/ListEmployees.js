import EmployeeCard from './EmployeeCard'

export default function ListEmployees ({ employees, deleteMode, onDelete }) {
  return (
    employees.map((employees) => (
      <EmployeeCard
        deleteMode={deleteMode}
        key={employees.id_empleado}
        id={employees.id_empleado}
        name={employees.name}
        secName={employees.sec_name}
        lastName={employees.last_name}
        rol={employees.nombre_rol}
        rfidCard={employees.rfid_card}
        onDelete={onDelete}
      />
    ))
  )
}
