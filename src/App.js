import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import {Button, Container, Row, Col, Modal, ButtonGroup} from "react-bootstrap";
import FruitCards from "./Components/FruitCards";
import CustomSpinner from "./Components/CustomSpinner";
import {useState, useEffect} from "react";
import {createClient} from "pexels";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DarkModeToggle from "react-dark-mode-toggle";
const client = createClient('563492ad6f917000010000012c46dce6244646baabf0e9d6e9f19fcfd');

function App() {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark' ? true : false);
  const [modal, showModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleClose = () => {
      showModal(false);
  }

  if(isDarkMode){
      localStorage.setItem('theme', 'dark');
      document.body.classList.add('dark');
  }
  else{
      localStorage.setItem('theme', 'light');
      document.body.classList.remove('dark');
  }

  useEffect(() => {
      fetch('https://www.fruityvice.com/api/fruit/all')
          .then(response => response.json())
          .then(data => {
              /*async function getFruitImage() {
                  for (let i=0; i<data.length; i++){
                      let query = data[i].name;
                      let src = await client.photos.search({ query, per_page: 1, orientation: 'landscape' }).then(photos => {
                          return photos.photos[0].src.medium;
                      });
                      data[i].src = src;
                  }
                  setFruits(data);
              }
              getFruitImage();*/
              setLoading(false);
              setFruits(data);
          })
          .catch((error) => {
              setLoading(false);
              setErrorMessage(error.toString());
              showModal(true);
          });
  }, [retry])



  return (
      <>
          {
              modal ?
                  <Modal show={showModal} onHide={handleClose}>
                      <Modal.Header>
                          <Modal.Title>Ooops! Something went wrong :(</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>{
                          errorMessage
                      }</Modal.Body>
                      <Modal.Footer>
                          <Button variant="outline-primary" onClick={() => {
                              setRetry(true);
                              showModal(false);
                          }}>
                              Retry?
                          </Button>
                      </Modal.Footer>
                  </Modal> :
                  <></>
          }

          <Container>
              <Row>
                  <h1 className="section-titles mt-3">
                      Our favourite fruits!
                      <DarkModeToggle
                          onChange={setIsDarkMode}
                          checked={isDarkMode}
                          size={50}
                      />
                  </h1>

              </Row>
              <Row>
                  {
                      loading ? <CustomSpinner /> :
                          fruits.map((fruit, index) =>
                              <Col xl={3} lg={4} md={6} sm={6} xs={12} key={fruit.id}>
                                  {
                                      <FruitCards
                                          src={fruit.src}
                                          name={fruit.name}
                                          nutritions={fruit.nutritions}
                                      />
                                  }
                              </Col>
                          )
                  }
              </Row>
              <Row>
                  <h1 className="section-titles mt-3">
                      Stats
                      <ButtonGroup aria-label="Basic example">
                          <Button variant="secondary">Left</Button>
                          <Button variant="secondary">Middle</Button>
                          <Button variant="secondary">Right</Button>
                      </ButtonGroup>
                  </h1>
              </Row>
              <Row>
                  <ResponsiveContainer width="100%" height={500}>
                      <BarChart margin={{ top: 30, right: 45, bottom: 5, left: -20}} data={fruits}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend wrapperStyle={{top: 0, left: 25}}/>
                          <Bar name="Calories" type="monotone" dataKey="nutritions.calories" fill="#ff0560" />
                      </BarChart>
                  </ResponsiveContainer>
              </Row>

          </Container>
      </>
  );
}

export default App;
