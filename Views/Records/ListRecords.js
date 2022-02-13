import RecordCard from './RecordCard'

export default function ListRecords ({ records }) {
  return (
    records.map((records) => (
      <RecordCard
        key={records.id_registro}
        number={records.id_registro}
        card={records.card}
        fechaHora={records.dateandtime}
        empleado={records.name !== null ? `${records.name} ${records.last_name}` : null}
      />
    ))
  )
}
