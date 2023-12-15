import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { css } from '@emotion/react';
import {
    Typography,
    IconButton,
    FormControl,
    TextField,
    Rating,
    Button
  } from '@mui/material';
import { useRouter } from 'next/router';


import EditIcon from './EditIcon'

// Define the GraphQL mutation
const EDIT_MOVIEW_REVIEW = gql(`
mutation editMovieReview($input: UpdateMovieReviewInput!) {
    updateMovieReview(input: $input) {
          movieReview {
              title
              body
              rating
              nodeId
          }
      clientMutationId
    }
  }
`)


const CREATE_MOVIE_REVIEW = gql(`
mutation myMutationNewMovieReview($input: CreateMovieReviewInput!) {
  createMovieReview(input: $input)
  {
    movieReview {
      id
      title
      body
      rating
      movieByMovieId {
        title
      }
      userByUserReviewerId {
        name
      }
    }
  }
}
`)

{/*
    __ The input that makes this mutation work look like this:

    {
	"input": {
		"nodeId": "WyJtb3ZpZV9yZXZpZXdzIiwiMGY1ZWRlYmYtNzAwYS00NjQzLWE1ZDktNjkzMWNhZGVhZjI2Il0=",
		"movieReviewPatch": {
			"title": "Testing mutation on insomnia",
			"body": "Testing body of mutation",
			"rating": 3
		}
	}
}

    __ now the work is:
        - fetch the data using the edit icon button based on nodeId parameter
        - define the states
        - define the useMutation
        - define the handleChange
        - define the handleSubmit


*/}

export const EditReviewForm = (props: any) => {
    return (
        <div css={styles.commentCard}>
          {/* <Typography variant='body1'>
            Review by: NAME OF REVIEWER
          </Typography>
          <Typography variant='h5'>
            REVIEW TITLE
            <IconButton size="large">
              <EditIcon />
             </IconButton>
          </Typography>
          <Rating name="read-only" value={2} readOnly />
          <br />
          <Typography variant='body1'>THE TEXT OF THE REVIEW</Typography>
          <br/> */}

          <form >
            <FormControl sx={{ width: '93vw' }}>
              <TextField 
                fullWidth 
                id="outlined-basic" 
                label="Name" 
                variant="outlined" 
                color='success' 
                value='NAME OF THE REVIEWER'
                name='name'
              />
              <br />
              <TextField 
                fullWidth 
                name='title'
                id="outlined-basic" 
                label="Edit the title" 
                variant="outlined" 
                color='success' 
                required 
                value='REVIEW TITLE'
              />
              <br />
              <Typography component="legend">Rate this movie:</Typography>
              <Rating 
                name='rating'
                id="simple-controlled" 
                value={5}
              />
              <br/>
              <TextField 
                name='body'
                multiline 
                fullWidth 
                id="outlined-multiline-flexible" 
                label="Edit your review ..." 
                variant="outlined" 
                color='success' 
                sx={{ minWidth: '150px' }}
                value='THE TEXT OF THE REVIEWER'
                required
              />
              <br />
              <Button 
                color='success'   
                variant='contained'
                type='submit'
              >
                EDIT THE REVIEW
                </Button>
            </FormControl>
          </form>
        </div>
      )
}







const styles = {
    root: css({
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent:'center'
      }),
    body: css({
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
    }),
    heading: css({ marginBottom: 16, marginTop: 12, fontSize: '2.75rem', color:'grey' }),
    infoWrapper: css({
        display:"block",
        gap:'1em',
        textAlign:'center',
        "@media (max-width: 600px)": {
            display: "flex",
            flexDirection:'column',
            gap:"13rem"
          },
    }),
    commentCard: css({
      display: 'grid',
      background: '#F0DC9D',
      border:'1px solid black',
      marginBottom:'1rem',
      padding:'1rem',
      borderRadius:'10px'
    }),
    reviewForm: css({
      display:"block",
      gap:'1em',
      border:'1px solid black',
      padding:'1rem',
      borderRadius:'10px',
  
      
    })
  };
  