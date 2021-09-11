import {Row, Col, Button, Modal} from "react-bootstrap";
import NutritionFacts from "./NutritionFacts";
import {useState} from "react";

function FruitCards(props){
    const [recipe, setRecipe] = useState({});
    const [show, setShow] = useState(false);
    const [recipeTitle, setRecipeTitle] = useState('');
    const [recipeImg, setRecipeImg] = useState('');
    const handleClose = () => setShow(false);
    const apiKey = '1724262f4c8f4433aedcd78fa5f4c6ac';
    const{
        name,
        src,
        nutritions
    } = props;

    function getRandomFact(fruitName){
        const result = fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${fruitName}&number=1&apiKey=${apiKey}`)
            .then(response => response.json())
            .then(data => {

                return fetch(`https://api.spoonacular.com/recipes/${data[0].id}/information?apiKey=${apiKey}`);
            })
            .then(response => response.json())
            .then(recipeData=> {
                setRecipeTitle(recipeData.title);
                setRecipeImg(recipeData.image);
                setRecipe(recipeData.instructions)
                setShow(true);
            })
            .catch(err => {
                console.error('Request failed', err)
            })
    }

    return(
        <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{recipeTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img className="mt-1 mb-3 img-fluid recipe-image" src={recipeImg} alt={recipeTitle}/>
                <p dangerouslySetInnerHTML={{ __html: recipe }}></p>
            </Modal.Body>
            <Modal.Footer>
                <Button className="custom-btn" variant="outline-primary" onClick={handleClose}>
                    Close Recipe
                </Button>
            </Modal.Footer>
        </Modal>
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
        </>
    )
}
export default FruitCards;