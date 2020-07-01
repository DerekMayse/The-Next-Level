import React, { Component } from "react"
import NewsManager from "../../modules/NewsManager"
import { Form, Button } from 'react-bootstrap'


class NewsEditForm extends Component {
    
    state = {
      title: "",
      synopsis: "",
      url: "",
      
      loadingStatus: true,
    };

    handleFieldChange = evt => {
      const stateToChange = {}
      stateToChange[evt.target.id] = evt.target.value
      this.setState(stateToChange)
    }

    updateExistingArticle = evt => {

      evt.preventDefault()
      this.setState({ loadingStatus: true });
      const editedArticle = {
        id: this.props.match.params.newsId,
        title: this.state.title,
        synopsis: this.state.synopsis,
        url: this.state.url,
        date:this.state.date
      };

      NewsManager.update(editedArticle)
      .then(() => this.props.history.push("/news"))
    }

    componentDidMount() {
      console.log(this.props.match.params.newsId)
      NewsManager.get(this.props.match.params.newsId)
      .then(news => {
          this.setState({
            title: news.title,
            synopsis: news.synopsis,
            url:news.url,
            date: news.date,
            loadingStatus: false,
          });
      });
    }

    render() {
            return (
<>
<Form>
  <Form.Group controlId="formBasicEmail">
    
    
    <Form.Control type="text"  onChange={this.handleFieldChange}
                value={this.state.title}
                id="title"/>
  </Form.Group>
  <Form.Group>
 
    <Form.Control    onChange={this.handleFieldChange}
                value={this.state.synopsis}
                id="synopsis"/>
  </Form.Group>
  <Form.Group>
  
    <Form.Control onChange={this.handleFieldChange}
                value={this.state.url}
                id="url"/>
  </Form.Group>


  <Button variant="primary" type="submit"disabled={this.state.loadingStatus}
                onClick={this.updateExistingArticle} >
    Save
  </Button>
  </Form>
  </>

        
      );
    }
}

export default NewsEditForm