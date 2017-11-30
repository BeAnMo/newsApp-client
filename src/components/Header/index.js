import React, { Component }from 'react';
import { Row, Col } from 'reactstrap';
import { formatDate } from '../../utils';
import { clearInterval } from 'timers';

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            now: formatDate(new Date(), 'toLocaleString')
        };
    }

    componentDidMount(){
        this.timer = setInterval(() => {
            return this.tick();
        }, 1000);
    }

    componentWillUnmount(){
        return clearInterval(this.timer);
    }

    tick(){
        const now = formatDate(new Date(), 'toLocaleString');

        return this.setState({ now });
    }

    render(){
        return (
            <header>
                <Row>
                    <Col>
                        <h1>News of World News</h1>
                    </Col>
                    <Col>
                        <h5>{ this.state.now }</h5>
                    </Col>
                </Row>
            </header>
        );
    }
}
