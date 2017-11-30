import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { formatDate } from '../../../utils';

/*
can images be removed from article html in api call?
- maybe?
*/
export class Article extends Component {
  constructor(props){
    super(props);
      this.handleToggle = this.handleToggle.bind(this);
      this.state = {
        isVisible: false, // isActive?
        data: this.props.data
      };
  }

  handleToggle(e){
    // show article has been selected
    return this.setState({ isVisible: !this.state.isVisible });
  }

  setHtml(html, isVisible){
    return isVisible ? 
      <div dangerouslySetInnerHTML={{__html: html}}/> : '';
  }

  render(){
    const { title, date, html, section } = this.state.data;
    const isVisible = this.state.isVisible;
    const setHtml = this.setHtml;

    return (
      <Row>
        <Col xs="12" md={{ size: 8, offset: 2}}>
        <article key={title} className="article-component">
          <h2 onClick={this.handleToggle}>{ title }</h2>
          <Row>
            <Col>
              <h4>{ section }</h4>
            </Col>
            <Col>
              <h6>{ formatDate(date, 'toLocaleString') }</h6>
            </Col>
          </Row>
          { setHtml(html, isVisible) }
        </article>
        </Col>
      </Row>
    );
  }
}

