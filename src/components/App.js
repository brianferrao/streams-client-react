import React from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import StreamList from './streams/StreamList';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamView from './streams/StreamView';
import Header from './Header';
import history from '../history';

class App extends React.Component {
    render() {
        return (
            <div className="ui container">
                <Router history={history}>
                    <Header></Header>
                    <Switch>
                        <Route path="/" exact component={StreamList}></Route>
                        <Route path="/streams/new" component={StreamCreate}></Route>
                        <Route path="/streams/edit/:id" exact component={StreamEdit}></Route>
                        <Route path="/streams/delete/:id" component={StreamDelete}></Route>
                        <Route path="/streams/:id" component={StreamView}></Route>
                    </Switch>                    
                </Router>
            </div>
        );
    }
}

export default App;