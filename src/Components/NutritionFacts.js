import {Col} from "react-bootstrap";

function NutritionFacts(props){
    const {
        type,
        value
    } = props;

    const titleMap = {
        "protein" : "Proteins",
        "fat" : "Fats",
        "sugar" : "Sugars",
        "carbohydrates" : "Carbs",
    }

    return(
        <Col lg={6} md={6} sm={6} xs={6}>
            <div className="nutrition-container mt-1 text-center">
                <h3 className="nutrition-fact-header">{titleMap[type]}</h3>
                <img alt={type} src={`../img/${type}.svg`} className="nutrition-icons"/>
                <span title={titleMap[type]} className="nutrition-facts text-center">{value}gr</span>
            </div>
        </Col>
    )
}

export default NutritionFacts;