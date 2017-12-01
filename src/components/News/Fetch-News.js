import { FetchApp } from '../../Fetch-App';
import { findValues } from 'json-find';

// racket server
//const url2 = 'http://127.0.0.1:5000/article-html';
// node-express server
const apiUrl = 'http://localhost:3001/api_v1/html';
export const FetchNews = FetchApp({
    url: apiUrl,
    //path: ['response', 'results'],
    path: ['data'],
    fn(json) {
        return json.map(article => {
            return findValues(
                article,
                'title',
                'section',
                'date',
                'html'
            );
        });
    }
});