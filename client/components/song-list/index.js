import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql  } from 'react-apollo';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CircularProgress from 'material-ui/CircularProgress';
import IconDelete from 'material-ui/svg-icons/action/delete';
import Snackbar from 'material-ui/Snackbar';
import {List, ListItem} from 'material-ui/List';

import { hashHistory, Link } from 'react-router';

import fetchSongs from '../../queries/fetchSongs';
import deleteSong from '../../mutations/deleteSong';

import './style.css';

class SongList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            snackbar: {
                open: false,
                message: ''
            }
        };
    }

    onSongDelete(id) {
        this.props.mutate({
            variables: { id },
            refetchQueries: [{ query: fetchSongs }]
        })
            .then(() => {
                this.setState({ snackbar: { open: true, message: 'Song deleted successfully' } });
            })
            .catch(error => {
                this.setState({ snackbar: { open: true, message: `Error deleting song: ${error}` }});
            });
    }

    renderSongs() {
        const { data } = this.props;

        if (!data.songs) {
            return null;
        }

        return (
            <List className="song-list-container__list">
                {
                    data.songs.map(({ id, title }, index) => (
                        <ListItem
                            key={index}
                            rightIcon={<IconDelete onClick={() => this.onSongDelete(id)} />}
                        >
                            <Link className="song-list-container__list__link" to={`/songs/${id}`}>{title}</Link>
                        </ListItem>
                    ))
                }
            </List>
        );
    }

    renderLoader() {
        const { data } = this.props;

        if (!data.loading) {
            return null;    
        }
        return (
            <div className="song-list-container__loader">
                <CircularProgress
                    size={40}
                    thickness={3}
                />
            </div>
        );
    }

    render() { 
        const {
            message,
            open
        } = this.state.snackbar;

        return (
            <div className="song-list-container">
                {this.renderLoader()}
                {this.renderSongs()}

                <FloatingActionButton
                    className="song-list-container__fab"
                    mini
                    onClick={() => hashHistory.push('/songs/new')}
                >
                    <ContentAdd />
                </FloatingActionButton>

                <Snackbar
                    open={open}
                    message={message}
                    autoHideDuration={2000}
                    onRequestClose={() => this.setState({ snack: { oepn: false, message: '' } })}
                />
            </div>
        );
    }
}
 
export default graphql(deleteSong)(
    graphql(fetchSongs)(SongList)
);