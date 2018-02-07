import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import addLyricToSong from '../../../mutations/addLyricToSong';

import './style.css';

class LyricCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ''
        };

        this.onLyricChange = this.onLyricChange.bind(this);
    }

    onLyricChange(event, content) {
        this.setState({ content });
    }

    onSubmit() {
        this.props.mutate({
            variables: {
                content: this.state.content,
                songId: this.props.songId
            }
        })
            .then(() => {
                this.setState({ content: '' });
            });
    }

    render() { 
        return (
            <div className="lyric-create-container">
                <TextField
                    className="lyric-create-container__input"
                    hintText="New lyric"
                    onChange={this.onLyricChange}
                    value={this.state.content}
                />

                <FlatButton
                    className="lyric-create-container__button"
                    disabled={!this.state.content.length}
                    label="Add lyric"
                    onClick={() => this.onSubmit()}
                />
            </div>
        );
    }
}
 
export default graphql(addLyricToSong)(LyricCreate);