import React from 'react';
import { css } from '@emotion/react';
import {
  Button,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from '@mui/material';
import type { NextPage } from 'next';
import { exampleActions, useAppDispatch, useAppSelector } from '../redux';
import { MovieCard } from '../components/MovieCard';


const primary = '#1976d2';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const exampleState = useAppSelector((state) => state.example);
  return (
    <div css={styles.root}>
      <div css={styles.body}>
        <Typography variant={'h1'} css={styles.heading}>
          {'EcoPortal Coolmovies'}
        </Typography>
        {/* <Typography variant={'subtitle1'} css={styles.subtitle}>
          {`Thank you for taking the time to take our test. We really appreciate it. 
        All the information on what is required can be found in the README at the root of this repo. 
        Please don't spend ages on this and just get through as much of it as you can. 
        Good luck! 😄`}
        </Typography> */}

        {/* <div css={styles.mainControls}>
          <Tooltip
            title={`Side Effect Count from Epic (Gets run on odd values): ${exampleState.sideEffectCount}`}
            arrow
          >
            <Button
              variant={'contained'}
              onClick={() => dispatch(exampleActions.increment())}
              color='secondary'
            >
              {`Redux Increment: ${exampleState.value}`}
            </Button>
          </Tooltip>
          <Button
            color='secondary'
            variant={'outlined'}
            onClick={() =>
              dispatch(
                exampleState.fetchData
                  ? exampleActions.clearData()
                  : exampleActions.fetch()
              )
            }
          >
            {exampleState.fetchData ? 'Hide some data' : 'Fetch some data'}
          </Button>
        </div> */}
        
        <div>
          <MovieCard />
        </div>
{/* 
        <Zoom in={Boolean(exampleState.fetchData)} unmountOnExit mountOnEnter>
          <TextField
            css={styles.dataInput}
            multiline
            label={'Some Data'}
            defaultValue={JSON.stringify(exampleState.fetchData)}
          />
        </Zoom> */}
      </div>
    </div>
  );
};

const styles = {
  root: css({
    height: 'full',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }),
  body: css({
    alignSelf: 'stretch',
    padding: 32,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }),
  heading: css({ marginTop: 16, fontSize: '2.75rem', textAlign: 'center', color:'#8700FC' }),
  subtitle: css({
    fontWeight: 300,
    textAlign: 'center',
    maxWidth: 600,
    margin: '24px 0',
    color: 'rgba(250 0, 0)',
  }),
  mainControls: css({
    display: 'flex',
    alignItems: 'center',
    button: { marginRight: 16 },
  }),
  dataInput: css({
    alignSelf: 'stretch',
    margin: '32px 0',
  }),
};

export default Home;

// Creating Unit Tests for this project, based on the official next.js website
// And the official apollo graphql website

// https://nextjs.org/docs/app/building-your-application/testing/jest

// https://www.apollographql.com/docs/react/development-testing/testing/

// This doc's shows how to create unit testing with Jest and React Testing Library

// Firts steps:

// npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom

// Generate a basic Jest configuration file by running the following command:

// npm init jest@latest

// This will automatically create a jest.config.ts|js file

// ... the next step goes on the documentation

// After the configuration of jest.config.ts

// Do not execute this command, but is good to know

// jest --watch will re-run tests when a file is changed

// Creating the first test:

// The projett is now ready to run tests.

// Create a folder called __tests__

// now create the test as it's described on the next.js website

// name the file __tests__/home.test.jsx

// and optionally, add a snapshot test to keep track of any unexpected changes

// the file name __tests__/snapshot.js

// now run the following command to run tests

// npm run test

// after creating the test based on the next.js website

// I went to this error message.

// could not find react-redux context value; please ensure the component is wrapped in a <Provider>      

// now have to solve it

// added a simple test that check that the navbar component has a link with EcoPortal text

// now has to add a test that check GraphQL query for the homepage

// Seeing how on https://www.apollographql.com/docs/react/development-testing/testing/

// Developing allmovies query test

// The allMovies test is on development, probably is almost done