import { v4 as uuidv4 } from 'uuid'
import propTypes from 'prop-types'
import {
  Container,
  Row,
  Col,
  Alert,
} from 'react-bootstrap'

const VoteResults = ({ voteResults }) => {
  const uniqueVotes = [...new Set(Object.values(voteResults.votes))]

  return (
    <Container>
      <Row>
        <Col>
          <Alert variant={uniqueVotes.length === 1 ? 'success' : 'danger'}>
            {`Results for ${voteResults.story}`}
          </Alert>
        </Col>
      </Row>
      {uniqueVotes.length !== 1
        ? Object.keys(voteResults.votes).map((voter) => (
          <Row key={uuidv4()}>
            <Col>
              {voter}
            </Col>
            <Col>
              {voteResults.votes[voter]}
            </Col>
          </Row>
        ))
        : (
          <Row>
            <Col>
              {`Everyone voted ${uniqueVotes[0]}`}
            </Col>
          </Row>
        )}
    </Container>
  )
}

// eslint-disable-next-line immutable/no-mutation
VoteResults.propTypes = {
  voteResults: propTypes.shape({
    story: propTypes.string,
    votes: propTypes.shape({}),
  }).isRequired,
}

export default VoteResults
