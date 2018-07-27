import React, { Component } from 'react';
import './App.css';
import MyMapComponent from './components/myMapComponent';
import SideNav from './components/SideNav/SideNav';

class App extends Component {
    state = {
        locations: [
            {
                id: 1, loc: {lat: 41.7058606, lng: 44.7854635}, query: 'chaos concept store',
                url: 'https://foursquare.com/v/chaos-concept-store/590c680b61f0701b4692a5f5'
            },
            {
                id: 2, loc: {lat: 41.7062322, lng: 44.784224,}, query: 'hotel',
                url: 'https://foursquare.com/v/rooms-hotel-tbilisi--%E1%83%A0%E1%83%A3%E1%83%9B%E1%83%A1%E1%83%98/5234588411d2a87013cb0d89'
            },
            {
                id: 3, loc: {lat: 41.7117565, lng: 44.7494138,}, query: 'vake park',
                url: 'https://foursquare.com/v/vake-park--%E1%83%95%E1%83%90%E1%83%99%E1%83%98%E1%83%A1-%E1%83%9E%E1%83%90%E1%83%A0%E1%83%99%E1%83%98/4c3888b51a38ef3bbba79221'
            },
            {
                id: 4, loc: {lat: 41.7095404, lng: 44.8007267}, query: 'Fabrika Tbilisi',
                url: 'https://foursquare.com/v/fabrika/575d778d498e126b8c3b83a5'
            },
            {
                id: 5, loc: {lat: 41.7058214, lng: 44.7847367,}, query: 'lolita',
                url: 'https://foursquare.com/v/fabrika/575d778d498e126b8c3b83a5'
            },
            {
                id: 6, loc: {lat: 41.7019718, lng: 44.7995639,}, query: 'Dry Bridge Market',
                url: 'https://foursquare.com/v/flea-market--%E1%83%AB%E1%83%95%E1%83%94%E1%83%9A%E1%83%9B%E1%83%90%E1%83%9C%E1%83%94%E1%83%91%E1%83%98%E1%83%A1-%E1%83%91%E1%83%90%E1%83%96%E1%83%A0%E1%83%9D%E1%83%91%E1%83%90/4b6818e7f964a5201a672be3'
            },
            {
                id: 7, loc: {lat: 41.7047108, lng: 44.7865039,}, query: 'keto and kote',
                url: 'https://foursquare.com/v/keto--kote/5774140a498e86f29d9facd4'
            },
            {
                id: 8, loc: {lat: 41.7025527, lng: 44.7897838,}, query: 'blow',
                url: 'https://foursquare.com/v/blow/5868286892ca4c7f6f81ba4d'
            },
            {
                id: 9, loc: {lat: 41.6995526, lng: 44.7952379,}, query: 'skola',
                url: 'https://foursquare.com/v/skola-coffee--wine-bar/5a3fd28d610f046421e70416'
            },
            {
                id: 10, loc: {lat: 41.691683, lng: 44.7988984,}, query: 'double b',
                url: 'https://foursquare.com/v/double-b--%E1%83%93%E1%83%90%E1%83%91%E1%83%9A%E1%83%91%E1%83%98/57dc0002498e9379fa5aced2'
            },
        ],
        places: [
            'CHAOS concept store',
            'Rooms Hotel Tbilisi | რუმსი (სასტუმრო "რუმსი")',
            'Vake Park (ვაკის პარკი)',
            'Fabrika (ფაბრიკა)',
            'Lolita | ლოლიტა',
            'Dry Bridge | მშრალი ხიდი',
            'Keto & kote',
            'BLOW[34, Griboedov street]',
            'Skola Coffee & Wine Bar',
            'Double B Coffee & Tea (დაბლბი)'
        ],
        current: null,
        selected: null,
        centred: null,
        showSideNav: false,
        filterInput: '',
        filteredResult: []
    } 
    displayDetails = pos =>{
        const position = pos-1
        let centered = this.state.locations[position].loc
        this.setState({current: pos, centered: centered})
    }
    closeDetail = () =>{
        this.setState({current: null})
    }
    toggleNav = () =>{
        let showSideNav = this.state.showSideNav;
        this.setState({showSideNav: !showSideNav})
    }
    filterHandler = e =>{
        this.setState({filterInput: e.target.value})
        let results = [...this.state.places];
        let newResults = []
        for(let result of results){
            if(result.toLowerCase().includes(e.target.value.toLowerCase())){
                newResults.push(result)
            }
        }
        this.setState({filteredResult: newResults})
    }
    resetHandler = () =>{
        const places = [...this.state.places]
        this.setState({filteredResult: places, filterInput: '', current: null, selected: null})
    }
    clickHandler = (place) =>{
        const places = [...this.state.places]
        let index = places.indexOf(place)
        index += 1;
        this.setState({current: index, selected: index})
    }
    render(){
        return(
            <div>
                <SideNav clicked={(place) => this.clickHandler(place)}
                 places={this.state.places} val={this.state.filterInput}
                 filterInput={(e) => this.filterHandler(e)} reset={this.resetHandler}
                 placesResult={this.state.filteredResult}
                show={this.state.showSideNav} toggle={this.toggleNav} />
                <MyMapComponent selected={this.state.selected}
                 current={this.state.current}
                 show = {this.state.current} closeDetail={this.closeDetail}
                 display = {this.displayDetails} locations={this.state.locations}
                 centered = {this.state.centred}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDbEDaXomkJk0OlglYzalXs3js6oX6S9I&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: '100%' }} />}
                    containerElement={<div style={{ height: '100vh' }} />}
                    mapElement={<div style={{ height: '100%' }} />}
                    />
            </div>
        )
    }
}



export default App;