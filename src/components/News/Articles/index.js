import React, { Component } from 'react';
import { Article } from './Article';

export default class NewsApp extends Component {
  constructor(props){
    super(props);
    this.state = {
      articles: this.props.articles,
    }
  }

  componentWillReceiveProps(nextProps){
    return this.setState({ articles: nextProps.articles });
  }

  render(){
    const articles = this.state.articles;

    return (
      <section>
        { articles.map(article => <Article key={article.title} data={article} />)}
      </section>
    );
  }

}

