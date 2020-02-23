import React, { Component } from 'react';
import Papa from 'papaparse';

import './App.css';
import gameData from '../data/Big_Dance_CSV.csv';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: {},
    };
  }

  componentDidMount() {
    this.loadGames();
  }

  loadGames() {
    Papa.parse(gameData, {
      download: true,
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: result => {
        console.log(result);
      },
    });
  }

  render() {
    return <div>TODO</div>;
  }
}

export default App;
