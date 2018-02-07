import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';

import { hashHistory } from 'react-router';

import fetchSongs from '../../queries/fetchSongs';

import './style.css';

class SongCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: ''
        };

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeTitle(event, title) {
        this.setState({ title });
    }

    handleSubmit() {
        this.props.mutate({
            variables: {
                title: this.state.title
            },
            refetchQueries: [{ query: fetchSongs }]
        })
            .then(() => {
                this.setState({ title: '' });
                hashHistory.push('/songs');
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="songs-new-container">
                <TextField
                    className="songs-new-container__input-title"
                    fullWidth
                    hintText="New song's title"
                    onChange={this.handleChangeTitle}
                    value={this.state.title}
                />

                <a className="songs-new-container__back" onClick={() => hashHistory.push('/songs')}>View song's list</a>

                <FloatingActionButton
                    className="songs-new-container__fab"
                    disabled={!this.state.title.length}
                    mini
                    onClick={this.handleSubmit}
                >
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
}

const mutation = gql`
    mutation AddSong($title: String) {
        addSong(title: $title) {
            title
        }
    }
`;

export default graphql(mutation)(SongCreate);
