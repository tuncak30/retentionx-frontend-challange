import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import {Button, Container, Row, Col, Modal, Form} from "react-bootstrap";
import FruitCards from "./Components/FruitCards";
import CustomSpinner from "./Components/CustomSpinner";
import SkeletonPlaceholder from "./Components/SkeletonPlaceholder";
import {useState, useEffect} from "react";
import {createClient} from "pexels";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DarkModeToggle from "react-dark-mode-toggle";
import {upperCaseFirstLetter} from "./Helpers/Helpers";

function App() {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterKeys, setFilterKeys] = useState([]);
  const [sortKey, setSortKey] = useState('carbohydrates');
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark' ? true : false);
  const [modal, showModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const client = createClient('563492ad6f917000010000012c46dce6244646baabf0e9d6e9f19fcfd');
  const handleClose = () => {
      showModal(false);
  }

    function sortArrayForChart( a, b ) {
        if ( a.nutritions[sortKey] < b.nutritions[sortKey] ){
            return -1;
        }
        if ( a.nutritions[sortKey] > b.nutritions[sortKey] ){
            return 1;
        }
        return 0;
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
      //fetch('https://cors-anywhere.herokuapp.com/https://www.fruityvice.com/api/fruit/all')
      fetch('https://www.fruityvice.com/api/fruit/all')
          .then(response => response.json())
          .then(data => {
              async function getFruitImage() {
                  for (let i=0; i<data.length; i++){
                      let query = data[i].name;
                      let src = await client.photos.search({ query, per_page: 1, orientation: 'landscape' }).then(photos => {
                          return photos.photos[0].src.medium;
                      }).catch(error => {
                          setLoading(false);
                          setErrorMessage(error.toString());
                          showModal(true);
                      });
                      data[i].src = src;
                  }
                  setLoading(false);
                  setFilterKeys(Object.keys(data[0].nutritions));
                  setFruits(data);
              }
              getFruitImage();
          })
          .catch((error) => {
              setErrorMessage(error.toString());
              showModal(true);
          });
  }, [])

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
                          <Button className="custom-btn" variant="outline-primary" onClick={() => {
                              showModal(false);
                          }}>
                              Close
                          </Button>
                      </Modal.Footer>
                  </Modal>
                  :
                  <></>
          }
          {
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
                          loading ?
                              <>
                                  <CustomSpinner />
                                  <Col xl={3} lg={4} md={6} sm={6} xs={12}>
                                      <SkeletonPlaceholder />
                                  </Col>
                                  <Col xl={3} lg={4} md={6} sm={6} xs={12}>
                                      <SkeletonPlaceholder />
                                  </Col>
                                  <Col xl={3} lg={4} md={6} sm={6} xs={12}>
                                      <SkeletonPlaceholder />
                                  </Col>
                                  <Col xl={3} lg={4} md={6} sm={6} xs={12}>
                                      <SkeletonPlaceholder />
                                  </Col>
                                  <Col xl={3} lg={4} md={6} sm={6} xs={12}>
                                      <SkeletonPlaceholder />
                                  </Col>
                                  <Col xl={3} lg={4} md={6} sm={6} xs={12}>
                                      <SkeletonPlaceholder />
                                  </Col>
                              </>
                              :
                              fruits.map((fruit) =>
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
                          <Form.Select onChange={(event) => {
                              setSortKey(event.target.value)
                              setTimeout(function (){
                                  window.scrollTo(0,document.body.scrollHeight);
                              }, 100)
                          }}>
                              {
                                  filterKeys.map((key) => <option key={key} value={key}>{upperCaseFirstLetter(key)}</option>)
                              }
                          </Form.Select>
                      </h1>
                  </Row>
                  <Row>
                      <ResponsiveContainer width="100%" height={500}>
                          <BarChart margin={{ top: 30, right: 45, bottom: 5, left: -20}} data={fruits.sort(sortArrayForChart)}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Legend wrapperStyle={{top: 0, left: 25}}/>
                              <Bar name={`${upperCaseFirstLetter(sortKey)} (per 100gr)`} type="monotone" dataKey={`nutritions.${sortKey}`} fill="#ff0560" />
                          </BarChart>
                      </ResponsiveContainer>
                  </Row>

              </Container>
          }
      </>
  );
}

export default App;
