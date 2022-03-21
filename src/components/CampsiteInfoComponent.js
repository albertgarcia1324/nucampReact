/* eslint-disable react/jsx-pascal-case */
import React, { Component } from "react";
import {
  Button,
  Card,
  CardImg,
  CardText,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

// const minLength = (value) => {
//   console.log(value);
//   return value && value.length >= 2;
// };

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit = (values) => {
    alert(JSON.stringify(values));
  };

  render() {
    return (
      <div>
        <React.Fragment>
          <Button outline onClick={this.toggleModal}>
            <i className="fa fa-lg fa-pencil" />
            Submit Comment
          </Button>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <Label>Rating</Label>
                  <Control.select
                    model=".rating"
                    id="rating"
                    name="rating"
                    className="form-control"
                    placeholder=""
                    defaultValue="1"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </div>
                <div className="form-group">
                  <Label htmlFor="author">Name</Label>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    className="form-control"
                    placeholder="Your Name"
                    validators={{
                      minLength: minLength(2),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    model=".author"
                    show="touched"
                    component="div"
                    className="text-danger"
                    messages={{
                      minLength: "Name must have atleast 2 characters",
                      maxLength: "Name must be less than 15 characters",
                    }}
                  />
                </div>
                <div className="form-group">
                  <Label htmlFor="text">Comment</Label>
                  <Control.textarea
                    model=".text"
                    id="text"
                    name="text"
                    rows="7"
                    className="form-control"
                    placeholder="Type your comment here..."
                  />
                </div>
                <Button type="submit" value="submit" color="primary">
                  Submit
                </Button>
              </LocalForm>
            </ModalBody>
          </Modal>
        </React.Fragment>
      </div>
    );
  }
}

function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments }) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map((comment) => {
          return (
            <div>
              <p>
                {comment.text} <br></br>
                -- {comment.author}, {""}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(Date.parse(comment.date)))}
              </p>
            </div>
          );
        })}
        <CommentForm />
      </div>
    );
  }
}

function CampsiteInfo(props) {
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/directory">Directory</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderCampsite campsite={props.campsite} />
          <RenderComments comments={props.comments} />
        </div>
      </div>
    );
  }
  return <div />;
}

export default CampsiteInfo;
