import React, { Component } from "react";
import Pagination from "react-js-pagination";
import ListContainer from "../containers/ListContainer";

class App extends Component {
    render() {
        return (
            <div className="wrapper">
                <h1>Recently Updated Studios</h1>

                <ListContainer studios={this.props.studios}/>

                <Pagination
                    activePage={this.props.activePage}
                    itemsCountPerPage={this.props.itemsCountPerPage}
                    totalItemsCount={this.props.totalItemsCount}
                    pageRangeDisplayed={5}
                    onChange={this.props.handlePageChange}
                    linkClass = 'page-link'
                    itemClass = 'page-item'
                />
            </div>
        );
    }
}

export default App;