import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { Grommet } from 'grommet';
import { CaretDown } from 'grommet-icons';

const theme = {
  global: {
    colors: {
      brand: '#2774FA',
      "light-1": '#FFFFFF',
      "light-2": '#FAFAFC'
    },
    elevation: {
      light: {
        xsmall: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        small: '0px 6px 30px rgba(64, 80, 175, 0.08)',
        medium: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        large: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        xlarge: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
      },
    },
    font: {
      family: "'Roboto', Arial, sans-serif",
      size: '14px',
    },
    input: {
      weight: 500,
    },
  },
  button: {
    border: {
      radius: '4px',
    },
    padding: {
      vertical: '6px',
      horizontal: '24px',
    },
    extend: props => `
      font-weight: 500;
      text-transform: uppercase;
      font-size: 14px;

      ${props && props.primary && 'color: white;'}
    `,
  },
  formField: {
    border: {
      position: 'outer',
      side: 'all',
    },
    label: {
      weight: 600,
      size: 'small',
      color: 'dark-4',
    },
  },
  heading: {
    font: {
      family: "'Roboto', Arial, sans-serif",
    },
  },
  select: {
    icons: {
      down: <i className="fas fa-chevron-down"></i>,
      color: 'dark-5',
    },
  },
};

ReactDOM.render(
  <React.StrictMode>
    <Grommet theme={theme} full={true}>
      <Routes />
    </Grommet>
  </React.StrictMode>,
  document.getElementById('root')
);

