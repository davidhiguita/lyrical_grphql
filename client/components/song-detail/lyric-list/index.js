import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import IconLike from 'material-ui/svg-icons/content/inbox';

import './style.css';

class LyricList extends Component {
    render() { 
        return (
            <div className="lyric-list-container">
                <List className="lyric-list-container__list">
                    {
                        this.props.lyrics.map(({ id, content }, index) => (
                            <ListItem
                                key={index}
                                rightIcon={<IconLike onClick={() => console.log('like', id)} />}
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
 
export default LyricList;
