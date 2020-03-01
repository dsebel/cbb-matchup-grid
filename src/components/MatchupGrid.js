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
      .domain(d3.extent(allTeams.map(team => team['adjO'])))
      .range([0, CHART_WIDTH])
      .nice();

    // Create Y scale.
    yScale = d3
      .scaleLinear()
      .domain(d3.extent(allTeams.map(team => team['adjD'])))
      .range([0, CHART_HEIGHT])
      .nice();
  }

  render() {
    // Create axis ticks.
    let xTicks = xScale.ticks().map(value => ({
      value,
      xOffset: xScale(value),
    }));
    let yTicks = yScale.ticks().map(value => ({
      value,
      yOffset: yScale(value),
    }));

    // Create matchup lines.
    let matchupLines = [];
    this.props.filteredGames.forEach(game => {
      matchupLines.push(
        <path
          key={game.key}
          className="line"
          strokeDasharray="3, 3"
          d={lineGenerator([
            [xScale(game.teamA.data.adjO), yScale(game.teamA.data.adjD)],
            [xScale(game.teamB.data.adjO), yScale(game.teamB.data.adjD)],
          ])}
        ></path>
      );
    });

    // Create points.
    let matchupPoints = [];
    this.props.filteredGames.forEach(game => {
      [game.teamA, game.teamB].forEach(team => {
        matchupPoints.push(
          <Tippy
            key={team.key}
            content={`${game.year}: (${team.data.seed}) ${team.data.name}`}
          >
            <circle
              cx={xScale(team.data.adjO)}
              cy={yScale(team.data.adjD)}
              r={5}
              style={{ fill: team.won ? 'green' : 'red' }}
            ></circle>
          </Tippy>
        );
      });
    });

    let potentialMatchupPoints = [];
    this.props.potentialMatchups.forEach(team => {
      potentialMatchupPoints.push(
        <Tippy
          key={`${team.name}-${team.year}`}
          content={`${this.props.currentYear}: (${team.seed}) ${team.name}`}
        >
          <circle
            cx={xScale(team.adjO)}
            cy={yScale(team.adjD)}
            r={5}
            style={{ fill: 'purple' }}
          ></circle>
        </Tippy>
      );
    });

    return (
      <svg width={WIDTH} height={HEIGHT}>
        <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
          <g className="line-container">{matchupLines}</g>
          <g className="point-container">{matchupPoints}</g>
          <g className="point-container">{potentialMatchupPoints}</g>
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
  teams: PropTypes.object,
  filteredGames: PropTypes.array,
  currentYear: PropTypes.number,

  showPotentialMatchups: PropTypes.bool,
  potentialMatchups: PropTypes.array,
};

export default MatchupGrid;
