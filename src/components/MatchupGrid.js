import React from 'react';
import * as d3 from 'd3';
import Tippy from '@tippy.js/react';
import PropTypes from 'prop-types';

import './MatchupGrid.css';
import 'tippy.js/dist/tippy.css';

// Constants.
const WIDTH = 1200;
const HEIGHT = 600;
const MARGIN = {
  top: 40,
  left: 40,
  right: 40,
  bottom: 40,
};
const CHART_WIDTH = WIDTH - (MARGIN.left + MARGIN.right);
const CHART_HEIGHT = HEIGHT - (MARGIN.top + MARGIN.bottom);

// Global D3 elements.
let xScale = null;
let yScale = null;
const lineGenerator = d3.line();

class MatchupGrid extends React.Component {
  constructor(props) {
    super(props);

    // Get teams from props.
    let allTeams = Object.values(this.props.teams);

    // Create X scale.
    xScale = d3
      .scaleLinear()
      .domain(d3.extent(allTeams.map(team => team['AdjO'])))
      .range([0, CHART_WIDTH])
      .nice();

    // Create Y scale.
    yScale = d3
      .scaleLinear()
      .domain(d3.extent(allTeams.map(team => team['AdjD'])))
      .range([0, CHART_HEIGHT])
      .nice();
  }

  render() {
    let teamData = [];
    let matchupLines = [];

    this.props.filteredGames.forEach(game => {
      // FIXME: Only years with data at the moment.
      if (
        game['Year'] !== 2015 &&
        game['Year'] !== 2016 &&
        game['Year'] !== 2017 &&
        game['Year'] !== 2018 &&
        game['Year'] !== 2019
      ) {
        return;
      }

      let teamAColor = 'green';
      let teamBColor = 'red';
      if (game['Score A'] < game['Score B']) {
        teamAColor = 'red';
        teamBColor = 'green';
      }

      let teamAData = null;
      let teamBData = null;
      let lookupKey = `${game['Team A']}-${game['Year']}`;
      if (this.props.teams[lookupKey]) {
        teamAData = this.props.teams[lookupKey];
        teamData.push({
          ...teamAData,
          ...{ FillColor: teamAColor, Opponent: game['Team B'] },
        });
      } else {
        console.error('MISSING TEAM', lookupKey);
      }
      lookupKey = `${game['Team B']}-${game['Year']}`;
      if (this.props.teams[lookupKey]) {
        teamBData = this.props.teams[lookupKey];
        teamData.push({
          ...teamBData,
          ...{ FillColor: teamBColor, Opponent: game['Team A'] },
        });
      } else {
        console.error('MISSING TEAM', lookupKey);
      }

      // Create matchup line.
      matchupLines.push({
        key: `${teamAData['Team']}-${teamAData['Year']}-${teamBData['Team']}`,
        pointA: [xScale(teamAData['AdjO']), yScale(teamAData['AdjD'])],
        pointB: [xScale(teamBData['AdjO']), yScale(teamBData['AdjD'])],
      });
    });

    let xTicks = xScale.ticks().map(value => ({
      value,
      xOffset: xScale(value),
    }));
    let yTicks = yScale.ticks().map(value => ({
      value,
      yOffset: yScale(value),
    }));

    return (
      <svg width={WIDTH} height={HEIGHT}>
        <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
          <g className="line-container">
            {matchupLines.map(line => (
              <path
                key={line.key}
                className="line"
                strokeDasharray="3, 3"
                d={lineGenerator([line.pointA, line.pointB])}
              ></path>
            ))}
          </g>
          <g className="point-container">
            {teamData.map(team => (
              <Tippy
                key={`${team['Year']}-${team['Team']}-${team['Opponent']}`}
                content={`${team['Year']}: (${team['Seed']}) ${team['Team']}`}
              >
                <circle
                  cx={xScale(team['AdjO'])}
                  cy={yScale(team['AdjD'])}
                  r={5}
                  style={{ fill: team['FillColor'] }}
                ></circle>
              </Tippy>
            ))}
          </g>
        </g>

        <g
          className="axis"
          transform={`translate(${MARGIN.left}, ${CHART_HEIGHT + MARGIN.top})`}
        >
          <path d={`M 0 0 H ${CHART_WIDTH}`} stroke="currentColor"></path>

          {xTicks.map(({ value, xOffset }) => (
            <g key={value} transform={`translate(${xOffset}, 0)`}>
              <line y2="6" stroke="currentColor"></line>
              <text
                key={value}
                style={{
                  fontSize: '10px',
                  textAnchor: 'middle',
                  transform: 'translateY(16px)',
                }}
              >
                {value}
              </text>
            </g>
          ))}
          <text
            className="axis-label"
            style={{ textAnchor: 'middle' }}
            transform={`translate(${CHART_WIDTH / 2}, 35)`}
          >
            Adjusted Offensive Efficiency
          </text>
        </g>

        <g
          className="axis"
          transform={`translate(${MARGIN.left}, ${MARGIN.top})`}
        >
          <path d={`M 0 0 V ${CHART_HEIGHT}`} stroke="currentColor"></path>
          {yTicks.map(({ value, yOffset }) => (
            <g key={value} transform={`translate(0, ${yOffset})`}>
              <line x2="-6" stroke="currentColor"></line>
              <text
                key={value}
                style={{
                  fontSize: '10px',
                  textAnchor: 'end',
                  transform: 'translateX(-8px) translateY(3px)',
                }}
              >
                {value}
              </text>
            </g>
          ))}
          <text
            className="axis-label"
            style={{ textAnchor: 'middle' }}
            transform={`translate(-30, ${CHART_HEIGHT / 2}) rotate(-90)`}
          >
            Adjusted Defensive Efficiency
          </text>
        </g>
      </svg>
    );
  }
}

MatchupGrid.propTypes = {
  filteredGames: PropTypes.array,
  teams: PropTypes.object,
};

export default MatchupGrid;
