import Card from './Card'

export default function ListCards ({ cards }) {
  return (
    cards.map((cards) => (
      <Card
        key={cards.id_card}
        id={cards.id_card}
        enUso={cards.en_uso}
      />
    ))
  )
}
