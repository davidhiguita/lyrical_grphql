import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import IconLike from 'material-ui/svg-icons/action/thumb-up';
import { graphql } from 'react-apollo';

import LikeLyric from '../../../mutations/likeLyric';

import './style.css';

class LyricList extends Component {
    onLike(id) {
        this.props.likeLyric({
            variables: { id }
        })
    }

    render() { 
        return (
            <div className="lyric-list-container">
                <List className="lyric-list-container__list">
                    {
                        this.props.lyrics.map(({ id, content, likes }, index) => (
                            <ListItem
                                key={index}
                                rightIcon={<IconLike onClick={() => this.onLike(id)} />}
                                secondaryText={`${likes} likes`}
                            >
                                {content}
                            </ListItem>
                        ))
                    }
                </List>
            </div>
        );
    }
}
 
export default graphql(LikeLyric, { name: "likeLyric" })(LyricList);
