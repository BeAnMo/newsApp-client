import React, { Component } from 'react';
import Articles from './Articles';
import Topics from './Topics';
import { FetchNews } from './Fetch-News';
import { checkKey } from 'json-find';

export default class News extends Component {
    constructor(props){
        super(props);
        this.handleSubscription = this.handleSubscription.bind(this);
        this.handleSelectAll = this.handleSelectAll.bind(this);
        this.handleDeselectAll = this.handleDeselectAll.bind(this);
        this.state = {
            originalArticles: [],
            originalTopics: {},
            articles: [],
            topics: {}
        };
    }

    componentDidMount(){
        return FetchNews.then(articles => {
            const topics = getSectionNames(articles);
            
            return this.setState({ 
                orginalArticles: articles, 
                originalTopics: topics,
                articles, 
                topics 
            });
        })
        .catch(console.log);
    }

    handleSubscription(topic){
        const isVisible = !this.state.topics[topic];
        const updatedTopic = { [topic]: isVisible };
        const updated = Object.assign({...this.state.topics}, updatedTopic);
        const filtered = this.state.originalArticles.filter(article => {
            return updated[article.section];
        });
    
        return this.setState({ articles: filtered, topics: updated });
    }
    
      /* selection functions are not getting updated data to components */
    handleSelectAll(){
        return this.setState({ 
            articles: this.state.originalArticles, 
            topics: this.state.originalTopics 
        });
    }
    
    handleDeselectAll(){
        // assert that all topics are deselected
        const deselected = (() => {
            let topics = this.state.topics;
            let result = {};
    
            for(let k in topics){
                Object.assign(result, { [k]: false });
            }
    
            return result;
        })();
    
        return this.setState({ topics: deselected, articles: [] });
    }


    render(){
        return (
            <section>
                <Topics 
                    topics={this.state.topics} 
                    subscription={this.handleSubscription} 
                    selectAll={this.handleSelectAll} 
                    deselectAll={this.handleDeselectAll} />
                
                <Articles articles={this.state.articles} />
            </section>
        );
    }
}

/* Array-of-Object -> Object */
function getSectionNames(articles){
	return articles.reduce((acc, art) => {
		const name = checkKey(art, 'section');
		
		return name in acc ? 
			acc 
			: 
			{...acc, [name]: true };
	}, {});
}