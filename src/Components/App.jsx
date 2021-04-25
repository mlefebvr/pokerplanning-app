import { useState, useRef } from 'react'
import {
  Alert,
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
} from 'react-bootstrap'
import socketIOClient from 'socket.io-client'
import Deck from './Deck'
import VoteResults from './VoteResults'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const ENDPOINT = process.env.REACT_APP_ENDPOINT
const socket = socketIOClient(ENDPOINT)

const App = () => {
  const [name, setName] = useState('')
  const [story, setStory] = useState(false)
  const [voteResults, setVoteResults] = useState({})
  const nameRef = useRef()
  const storyRef = useRef()

  const identifyUser = (event) => {
    event.preventDefault()
    const username = nameRef.current.value
    if (!username) return false
    socket.emit('user-connected', username)

    socket.on('story-submitted', (submittedStory) => {
      setVoteResults({})
      setStory(submittedStory)
    })

    socket.on('vote-results', (results) => {
      if (!Object.values(results.votes).includes('Waiting...')) {
        setStory(false)
      }
      setVoteResults(results)
    })

    setName(username)
    return true
  }

  const submitStory = (event) => {
    event.preventDefault()
    const submittedStory = storyRef.current.value
    if (!submittedStory) return false
    socket.emit('submit-story', submittedStory)
    setStory(submittedStory)
    return true
  }

  if (!ENDPOINT) {
    return <Alert variant="danger">Error: you must specify the REACT_APP_ENDPOINT environment variable</Alert>
  }

  return !name
    ? (
      <div className="App">
        <Container>
          <Row>
            <Col><h1>Poker Planning</h1></Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={identifyUser}>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text>Who are you?</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    ref={nameRef}
                    placeholder="Name"
                  />
                  <Button type="submit">
                    Set Name
                  </Button>
                </InputGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    )
    : (
      <div className="App">
        <Container>
          <Row>
            <Col><h1>Poker Planning</h1></Col>
          </Row>
          <Row>
            <Col>
              <h2>
                Hello
                {' '}
                {name}
              </h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3>
                {story ? (
                  <>
                    Story:
                    {' '}
                    {story}
                  </>
                ) : (
                  <Form onSubmit={submitStory}>
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text>Story</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="text"
                        ref={storyRef}
                      />
                      <Button type="submit">Submit</Button>
                    </InputGroup>
                  </Form>
                )}
              </h3>
            </Col>
          </Row>
          <Row>
            {story ? <Deck socket={socket} story={story} /> : '' }
          </Row>
          <Row>
            <Col>
              {voteResults && voteResults.story
                ? <VoteResults voteResults={voteResults} /> : ''}
            </Col>
          </Row>
        </Container>
      </div>
    )
}

export default App
