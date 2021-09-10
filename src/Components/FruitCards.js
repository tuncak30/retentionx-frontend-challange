import {Row, Col, Button} from "react-bootstrap";
import NutritionFacts from "./NutritionFacts";
import {useState} from "react";

function FruitCards(props){
    const [randomFact, setRandomFact] = useState('');
    const{
        name,
        src,
        nutritions
    } = props;

    function getRandomFact(fruitName){
        fetch(`http://api.fungenerators.com/fact/search?query=${fruitName}`)
            .then(response => response.json())
            .then(data => {


            });
    }

    return(
        <div className="fruit-cards">
            <Row>
                <Col>
                    <div className="fruit-photo">
                        <img alt={name} src={src} />
                    </div>
                    <div className="fruit-card-body">
                        <div className="fruit-name mt-2 text-center">{name} ({nutritions.calories} KCal / 100gr)</div>
                        <Row>
                            <NutritionFacts
                                type="protein"
                                value={nutritions.protein}
                            />
                            <NutritionFacts
                                type="fat"
                                value={nutritions.fat}
                            />
                            <NutritionFacts
                                type="sugar"
                                value={nutritions.sugar}
                            />
                            <NutritionFacts
                                type="carbohydrates"
                                value={nutritions.carbohydrates}
                            />
                        </Row>
                        <Row>
                            <Button onClick={() => getRandomFact(name)} className="custom-btn mt-3" variant="outline-primary">Surprise Me!</Button>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default FruitCards;