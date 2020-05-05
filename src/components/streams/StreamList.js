import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {

    componentDidMount() {
        this.props.fetchStreams();
    }

    renderActions(stream) {
        if(stream.userId === this.props.currentUserId) {
            return (
                <div className="ui right floated">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
                </div>
            );
        }
    }

    renderStreams() {
        return this.props.streams.map( (stream) => {
            return (
                <div key={stream.id} className="item">
                    {this.renderActions(stream)}
                    <i className="large user middle aligned icon"></i>
                    <div className="content">
                        <div className="header">
                            <Link to={`/streams/${stream.id}`}>{stream.title}</Link>
                        </div>
                        <div className="description">{stream.description}</div>
                    </div>                    
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <div className="ui list divided">
                    {this.renderStreams()}
                </div>
                <div>
                    <Link to="/streams/new" className="ui right floated button primary">Create Stream</Link>
                </div>
            </div>            
        );
    }
    
}

const mapStateToProps = (state) => {
    return { 
        streams : _.values(state.streams),
        currentUserId : state.auth.userId
    };
};

export default connect(mapStateToProps, {fetchStreams})(StreamList);