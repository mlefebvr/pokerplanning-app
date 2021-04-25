import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import propTypes from 'prop-types'
import {
  Col,
} from 'react-bootstrap'
import Card from './Card'

const Deck = ({ socket }) => {
  const cards = [0, '½', 1, 2, 3, 5, 8, 13, 20, 40, 100]
  const [activeCard, setActiveCard] = useState(false)

  const toggleCard = (card) => {
    socket.emit('story-poke', card)
    setActiveCard(card)
  }

  return (
    <>
      {cards.map((card) => (
        <Col className="mb-3" key={uuidv4()}>
          <Card
            key={uuidv4()}
            value={card}
            active={card === activeCard}
            onClick={() => toggleCard(card)}
          />
        </Col>
      ))}
    </>
  )
}

// eslint-disable-next-line immutable/no-mutation
Deck.propTypes = {
  socket: propTypes.shape({
    emit: propTypes.func,
  }).isRequired,
}

export default Deck
