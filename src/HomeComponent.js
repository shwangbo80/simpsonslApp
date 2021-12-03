import React, {useState} from "react"
import {Button, Container, Row, Col, Image, Form} from "react-bootstrap"

export default function HomeComponent() {
  const [apiData, setApiData] = useState()
  const [apiCount, setApiCount] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const url = `https://thesimpsonsquoteapi.glitch.me/quotes?count=${apiCount}`

  function handleChange(event) {
    setApiCount(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
  }

  function getApi() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setApiData(data)
      })
      .then(() => {
        setIsLoading(true)
      })
  }

  function RenderData() {
    if (!isLoading) {
      return <div></div>
    } else if (isLoading) {
      return apiData.map((item, key) => {
        return (
          <Container className="my-5 py-5">
            <Row key={key}>
              <Col md={6}>
                <h4 className="charName">{item.character}</h4>
                <Image src={item.image} alt={item.character} className="my-3" />
              </Col>
              <Col className="quoteContainer">
                <p className="quoteText">{item.quote}</p>
              </Col>
            </Row>
          </Container>
        )
      })
    }
  }

  return (
    <div>
      <Container fluid className="headerContainer">
        <Row>
          <Col></Col>
          <Col md={4}>
            <img
              alt="simpsons logo"
              src="./The_logo_simpsons_yellow.svg"
              className="logoImg"
            />
          </Col>
          <Col></Col>
        </Row>
        <h4>Random Quote Generator</h4>
      </Container>
      <h4 className="mt-5">Number of quotes</h4>
      <form className="formContainer" onSubmit={handleSubmit}>
        <Form.Select
          className="formSelect"
          aria-label="Default select example"
          onChange={handleChange}>
          <option value="1">One</option>
          <option value="5">Five</option>
          <option value="10">Ten</option>
        </Form.Select>
        <Button onClick={getApi} className="btn-warning btn-lg">
          Generate
        </Button>
      </form>
      <RenderData />
      <hr />
      <footer>
        <p>
          Copyright Soo Hwawngbo. ALl quotes generated from{" "}
          <a href="https://thesimpsonsquoteapi.glitch.me/" target="_blank">
            Simpons Quote API
          </a>
        </p>
      </footer>
    </div>
  )
}
