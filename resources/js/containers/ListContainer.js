import React from 'react';
import List from '../components/List';

class ListContainer extends React.Component {

    mapListItems() {
        const studios = this.props.studios;

        const listItems = studios.map( (studio, key) => {
            return (
                <li key={key}>
                    <a href={studio.path}>Studio {studio.name} </a>
                    <a href='#'>Category {studio.category.name} </a>
                </li>
            );
        });

        const middleIndex = Math.round(studios.length / 2);

        return [
            listItems.slice(0, middleIndex),
            listItems.slice(middleIndex)
        ];
    }

    render() {
        return (
            <div className="lists row">
                <List listItems={this.mapListItems()[0]}/>
                <List listItems={this.mapListItems()[1]}/>
            </div>
        );
    }
}

export default ListContainer;