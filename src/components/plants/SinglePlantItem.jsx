import React from "react";
import {GiZigzagLeaf} from "react-icons/gi";
import {GiCottonFlower} from "react-icons/gi";
import {difficulties, exposure, humidity, temp} from "constants/PlantsParameters";
import {Button, Container, ListGroup, ListGroupItem, Table} from "reactstrap";
import './SinglePlantItem.scss';
import{BiEdit,BiTrash} from 'react-icons/bi';

const getCategoryName = (categories, plantCategoryId) => {
    const index = categories.findIndex((category) => category.id === plantCategoryId);
    if (index < 0) {
        return 'no cat';
    }
    return categories[index].name;
}


class SinglePlantItem extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {index, plant, categories, category} = this.props;

        console.log(plant);
        const name = plant.map(a => a.name);
        const blooming = plant.map(a => a.blooming);
        const fertilizing = plant.map(a => a.fertilizing_interval);
        const watering = plant.map(a => a.watering_interval);
        const difficulty = plant.map(a => a.difficulty);
        const required_temp = plant.map(a => a.required_temperature);
        const required_humid = plant.map(a => a.required_humidity);
        const required_exposure = plant.map(a => a.required_exposure);
        const lastWatered = plant.map(a => a.last_watered);
        const lastFertilized = plant.map(a => a.last_fertilized);
        const plantCategoryId = parseInt(plant.map(a => a.category));
        const plantCategoryName = getCategoryName(categories, plantCategoryId);

        return (


            <Container>




                <div className='single-plant-wrapper'>

                    <div className='plant-data'>


                        <div className="plant-requirements">
                            <span>- {plantCategoryName} -</span>
                            <h3>{name} {blooming ? <GiCottonFlower style={{color:"red", fontSize:"2em"}}  /> : <GiZigzagLeaf style={{color:"green", fontSize:"2em"}} />}</h3>
                            <ListGroup>
                                <ListGroupItem><span>Difficulty level:</span><span>{difficulties[difficulty]}</span></ListGroupItem>
                                <ListGroupItem><span>Required Sun exposure: </span><span>{exposure[required_exposure]}</span></ListGroupItem>
                                <ListGroupItem><span>Required room humidity:</span><span> {humidity[required_humid]}</span></ListGroupItem>
                                <ListGroupItem><span>Required room temperature: </span><span>{temp[required_temp]}</span></ListGroupItem>
                                <ListGroupItem><span>Watering interval:</span><span> {watering}</span></ListGroupItem>
                                <ListGroupItem><span>Fertilizing interval:</span><span> {fertilizing}</span></ListGroupItem>
                                <ListGroupItem className='edition-icons'><BiEdit className='edit'/><BiTrash/></ListGroupItem>

                            </ListGroup>

                        </div>
                        <div className='plant-actions'>
                            <div className="plant-watering">
                                <h4>Watering</h4>
                                <div className='info-table'>
                                    <Table bordered>
                                        <thead>
                                        <tr>

                                            <th>Last Watered</th>
                                            <th>Next Watering</th>

                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>{lastWatered}</td>
                                            <td>info</td>

                                        </tr>
                                        </tbody>
                                    </Table>
                                    <Button> I watered plant today</Button>

                                </div>
                            </div>

                            <div className="plant-fertilizing">
                                <h4>Fertilizing</h4>

                                <div className='info-table'>
                                    <Table bordered>
                                        <thead>
                                        <tr>

                                            <th>Last Fertilized</th>
                                            <th>Next Fertilizing</th>

                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>{lastFertilized}</td>
                                            <td>info</td>

                                        </tr>
                                        </tbody>
                                    </Table>
                                    <Button> I Fertilized plant today</Button>

                                </div>


                            </div>

                        </div>

                    </div>


                </div>

            </Container>


        )
    }
}

export default SinglePlantItem;