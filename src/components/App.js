import React, { Component } from 'react';
import Papa from 'papaparse';
import { Divider, Grid, Header, Message } from 'semantic-ui-react';

import SeedInput from './SeedInput';
import MatchupGrid from './MatchupGrid';
import FilterInput from './FilterInput';
import MatchupList from './MatchupList';

import './App.css';
import gameCSV from '../data/Big_Dance_CSV.csv';
import teamCSV from '../data/KP.csv';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // All games, grouped by sorted seed matchups.
      games: [],

      // Filtered games, all games currently selected.
      filteredGames: [],

      // Potential games, used for just the seeds (not matchups).
      potentialMatchups: [],

      // Team lookup - can lookup by team name - year keys.
      teams: {},

      // The current season based on tourney year (e.g. 2019-2020 season is
      // 2020).
      currentYear: 2020,

      // Selected seeds.
      leftSeed: 1,
      rightSeed: 1,

      // Chart filter options.
      startingYear: 2010,
      showPotentialMatchups: false,

      // Data status variables. Used to indicate if data is ready or not.
      dataReady: false,
    };

    this.handleLeftSeedUpdate = this.handleLeftSeedUpdate.bind(this);
    this.handleRightSeedUpdate = this.handleRightSeedUpdate.bind(this);
    this.handlePotentialMatchupsUpdate = this.handlePotentialMatchupsUpdate.bind(
      this
    );
    this.handleStartingYearUpdate = this.handleStartingYearUpdate.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    Papa.parse(teamCSV, {
      download: true,
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: teamData => {
        // Get the team data.
        let teams = {};
        teamData.data.forEach(teamRow => {
          // Ignore any teams without a seed. This can be blank or -1.
          if (!teamRow['Seed'] || teamRow['Seed'] === -1) {
            return;
          }

          const key = `${teamRow['Team']}-${teamRow['Year']}`;
          teams[key] = {
            year: teamRow['Year'],
            seed: teamRow['Seed'],
            name: teamRow['Team'],
            adjO: teamRow['AdjO'],
            adjD: teamRow['AdjD'],
          };
        });

        // Now load matches and embed team data into matches.
        Papa.parse(gameCSV, {
          download: true,
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          complete: gameData => {
            let games = [];
            gameData.data.forEach(gameRow => {
              // Filter out years we don't support.
              if (gameRow['Year'] < 2010) {
                return;
              }

              // Only extract the data we plan on using.
              games.push({
                key: `${gameRow['Year']}-${gameRow['Team A']}-${gameRow['Team B']}`,
                year: gameRow['Year'],
                seedMatchup: [gameRow['Seed A'], gameRow['Seed B']].sort(),
                teamA: {
                  data: teams[`${gameRow['Team A']}-${gameRow['Year']}`],
                  won: gameRow['Score A'] > gameRow['Score B'],
                  key: `${gameRow['Year']}-${gameRow['Team A']}-${gameRow['Team B']}`,
                },
                teamB: {
                  data: teams[`${gameRow['Team B']}-${gameRow['Year']}`],
                  won: gameRow['Score B'] > gameRow['Score A'],
                  key: `${gameRow['Year']}-${gameRow['Team B']}-${gameRow['Team A']}`,
                },
              });
            });
            this.setState({ teams, games, dataReady: true }, this.filterGames);
          },
        });
      },
    });
  }

  handleLeftSeedUpdate(event, data) {
    event.preventDefault();
    this.setState({ leftSeed: data.value }, this.filterGames);
  }

  handleRightSeedUpdate(event, data) {
    event.preventDefault();
    this.setState({ rightSeed: data.value }, this.filterGames);
  }

  handlePotentialMatchupsUpdate(event, data) {
    event.preventDefault();
    this.setState(
      { showPotentialMatchups: data.checked },
      this.filterPotentialGames
    );
  }

  handleStartingYearUpdate(event, data) {
    event.preventDefault();
    this.setState({ startingYear: parseInt(data.value, 10) }, this.filterGames);
  }

  filterGames() {
    const stateSeeds = [this.state.leftSeed, this.state.rightSeed].sort();
    const filteredGames = this.state.games.filter(game => {
      return (
        game.year >= this.state.startingYear &&
        game.seedMatchup[0] === stateSeeds[0] &&
        game.seedMatchup[1] === stateSeeds[1]
      );
    });
    this.setState({ filteredGames });
  }

  filterPotentialGames() {
    let potentialMatchups = [];
    if (this.state.showPotentialMatchups) {
      const stateSeeds = [this.state.leftSeed, this.state.rightSeed];
      Object.keys(this.state.teams).forEach(key => {
        if (key.endsWith(this.state.currentYear.toString())) {
          if (stateSeeds.includes(this.state.teams[key].seed)) {
            potentialMatchups.push(this.state.teams[key]);
          }
        }
      });
    }
    this.setState({ potentialMatchups });
  }

  render() {
    return (
      <Grid container style={{ marginTop: '20px' }}>
        <Grid.Row>
          <Grid.Column>
            <Header as="h1" dividing>
              CBB Matchup Grid
            </Header>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Message warning>
              <b>Note:</b> Uses incomplete and mocked data for 2020.
            </Message>
          </Grid.Column>
        </Grid.Row>

        <SeedInput
          leftSeed={this.state.leftSeed}
          onLeftSeedDropdownChange={this.handleLeftSeedUpdate}
          rightSeed={this.state.rightSeed}
          onRightSeedDropdownChange={this.handleRightSeedUpdate}
        ></SeedInput>

        <Divider />

        <FilterInput
          startingYear={this.state.startingYear}
          showPotentialMatchups={this.state.showPotentialMatchups}
          onPotentialMatchupsCheckboxChange={this.handlePotentialMatchupsUpdate}
          onStartingYearChange={this.handleStartingYearUpdate}
        ></FilterInput>

        <Grid.Row>
          <Grid.Column>
            {this.state.dataReady && (
              <MatchupGrid
                teams={this.state.teams}
                filteredGames={this.state.filteredGames}
                currentYear={this.state.currentYear}
                showPotentialMatchups={this.state.showPotentialMatchups}
                potentialMatchups={this.state.potentialMatchups}
              ></MatchupGrid>
            )}
          </Grid.Column>
        </Grid.Row>

        <Divider />

        <MatchupList filteredGames={this.state.filteredGames}></MatchupList>

        <Divider />
      </Grid>
    );
  }
}

export default App;
