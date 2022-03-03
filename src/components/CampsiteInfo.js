import React, { Component } from 'react'
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';


class CampsiteInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCampsite: {}
        };
    }

    renderCampsite(campsite) {
        return (
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }

    render() {
        if (this.selectedCampsite === 0) {
            return (
                <div className="row">
                    {this.renderCampsite(this.selectedCampsite)}
                </div>
            )
        } else {
            return (
                <div>

                </div>
            )
        }
    }
}

export default CampsiteInfo;