import React from "react";
import {Container, Button} from "reactstrap";
import MyPlantItem from "components/myPlant/MyPlantItem";
import "./MyPlant.scss";
import {Link} from "react-router-dom";
import {ROUTE_MYPLANT_CREATE,} from "constants/Routes";
import {BiSortZA, BiSortAZ} from "react-icons/bi"
import ScrollToTop from "react-scroll-to-top";
import InProgress from "components/sharedElements/InProgress";

class MyPlant extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            sortDirection: undefined,
        }
    }

    handlePlantsSortAsc = (event) => {
        const selectedValue = event.target.id;
        console.log(selectedValue);
        this.setState({
            sortDirection: true,
        });

    };
    handlePlantsSortDesc = (event) => {
        const selectedValue = event.target.id;
        console.log(selectedValue);
        this.setState({
            sortDirection: false,
        });

    };
    handleResetSearch = () => {
        this.setState({
            sortDirection: undefined,
        })
    }

    render() {
        const {
            myPlants, onMyPlantDelete, plants, rooms, categories, hello, myPlantsSuccess, myPlantsInProgress,
            onCreateMyPlant, getSingleMyPlantId, onEdit
        } = this.props;
        const {sortDirection} = this.state;
        const multiplier = sortDirection ? 1 : -1;

        const myPlantsSorted = myPlants.sort((item1, item2) => {
            const sortBy = "name";
            const a = item1[sortBy].toLowerCase();
            const b = item2[sortBy].toLowerCase();
            if (a > b) {
                return 1 * multiplier;
            }
            if (b > a) {
                return -1 * multiplier;
            }
            return 0;
        });

        const myPlantsList = sortDirection === undefined ? myPlants : myPlantsSorted;

        return (
            <Container>
                <ScrollToTop smooth color="#387f34"/>
                <div className='create-search-tab'>
                    <div className='search'>
                        {hello}
                        <label htmlFor="name">Sort Plants</label>
                        <BiSortAZ id="name" onClick={this.handlePlantsSortAsc}
                                  style={{fontSize: "2rem", marginRight: "15px"}}/>
                        <BiSortZA id="name" onClick={this.handlePlantsSortDesc}
                                  style={{fontSize: "2rem", marginRight: "15px"}}/>

                        <Button
                            onClick={this.handleResetSearch}
                            color="secondary" size="md">Reset Search</Button>
                    </div>
                    <Button tag={Link} to={ROUTE_MYPLANT_CREATE}
                            onClick={onCreateMyPlant}
                    >Create New Plant</Button>
                </div>
                <InProgress inProgress={myPlantsInProgress}/>
                {
                    myPlantsSuccess === false &&
                    <p>Unable to fetch plants.</p>
                }
                {
                    myPlantsSuccess && (
                        <div className="my-plant-card">
                            {
                                myPlantsList.map((myPlant, index) => (
                                    <MyPlantItem
                                        myPlant={myPlant}
                                        key={index}
                                        plants={plants}
                                        categories={categories}
                                        rooms={rooms}
                                        getSinglePlantMyId={getSingleMyPlantId}
                                        onMyPlantDelete={onMyPlantDelete}
                                        onEdit={onEdit}

                                    />
                                ))
                            }
                        </div>

                    )
                }
            </Container>
        )
    }
}

export default MyPlant;