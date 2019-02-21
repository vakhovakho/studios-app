import React, {Component} from 'react';

class List extends Component {
    render() {
        const listItems = this.props.listItems;

        return (
            <div className="list-column col-md-6">
                <ul className="list-items">
                    {listItems}
                </ul>
            </div>
        );
    }
}

export default List;