import React, { Component } from "react";
import ReactDOM from 'react-dom';
import App from '../components/App';
import axios from "axios";
import {Subject} from "rxjs";

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                activePage : 1,
                totalItemsCount: 20,
                itemsCountPerPage: 20
            },
            studios: []
        };

        this.handlePageChange = this.handlePageChange.bind(this);
        this.insertNewStudio = this.insertNewStudio.bind(this);
    }

    // Get new studios
    getStudios() {
        const page = this.state.pagination.activePage;
        let url = '/studios';

        if(page > 1) {
            url += `?page=${page}`;
        }

        axios.get(url).then( response => {
            this.setState({
                pagination: {
                    activePage: response.data.current_page,
                    totalItemsCount: response.data.total,
                    itemsCountPerPage: response.data.per_page
                },
                studios: response.data.data
            });
        });
    }

    // Create observable for pusher
    createPusherObservable(pusher, channel, event) {
        const pusherMessageStream = new Subject();
        pusher.subscribe(channel).bind(event, pusherMessageStream.next.bind(pusherMessageStream));
        return pusherMessageStream;
    }

    // get all studios with pagination when component is mounted
    componentDidMount() {
        this.getStudios();
    }

    // Insert new studio into state
    insertNewStudio(studio) {
        let studios = this.state.studios;
        studios.splice(-1, 1);
        studios = [studio, ...studios];
        this.setState({studios});
    }

    // listen pusher chanel via rxjs observable
    // do it only when active page is first and when chanel is subscribed
    listenChannel() {
        if(this.state.pagination.activePage === 1) {

            if (window.myPusher.channels.channels.studios === undefined) {
                const pusherSubject = this.createPusherObservable(window.myPusher, 'studios', 'App\\Events\\StudioHasBeenAdded');

                const subscription = pusherSubject
                    .subscribe(response => this.insertNewStudio(response.studio));
            }
        }else {
            window.myPusher.unsubscribe('studios');
        }

    }

    // pagination page change event handler
    handlePageChange(pageNumber) {
        if(this.state.pagination.activePage === pageNumber) {
            return;
        }
        this.setState({pagination: {
                activePage: pageNumber
            }
        });
    }

    // listen pusher chanel on update
    // get studios for active pagination page
    componentDidUpdate(prevProps, prevState) {
        this.listenChannel();

        if(this.state.pagination.activePage !== prevState.pagination.activePage) {
            this.getStudios();
        }
    }

    render() {
        return (
            <App
            studios = {this.state.studios}
            activePage = {this.state.pagination.activePage}
            itemsCountPerPage = {this.state.pagination.itemsCountPerPage}
            totalItemsCount = {this.state.pagination.totalItemsCount}
            handlePageChange = {this.handlePageChange} />
        );
    }
}

ReactDOM.render(
    <AppContainer />,
    document.getElementById('app')
);
