import propTypes from 'prop-types'

const Card = ({ value, onClick, active }) => (
  <button
    type="button"
    className="planningCard"
    onClick={onClick}
    style={{ backgroundColor: active ? 'lightblue' : 'white' }}
  >
    {value}
  </button>
)

// eslint-disable-next-line immutable/no-mutation
Card.propTypes = {
  value: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
  ]).isRequired,
  onClick: propTypes.func.isRequired,
  active: propTypes.bool.isRequired,
}

export default Card
