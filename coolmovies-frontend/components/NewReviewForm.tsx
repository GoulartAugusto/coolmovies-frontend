import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { css } from '@emotion/react';
import {
  Typography,
  FormControl,
  TextField,
  Rating,
  Button
} from '@mui/material';


const CREATE_REVIEW = gql(`
mutation CreateReview($id: ID! $title: String!, $body: String!, $rating: Number!, $name: String!) {
  movieReviewById(title: $title, body: $body, rating: $rating, name: $name) {
    id
    title
    body
    rating
    movieId
    userByUserReviewerId {
      id
      name
    }
  }
}
`)

export function NewReviewForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [rating, setRating] = React.useState<number>(0);
  const [name, setName] = useState('');

  const [saveReview, {error, data}] = useMutation(CREATE_REVIEW, {
    variables: { id: { name, title, rating: +rating, body } }
  })

  return (
  <div>
    <div css={styles.reviewForm}>
        <Typography variant='h4' css={styles.heading}>Write your reviview:</Typography>
        {error ? <p>Oh no! {error.message}</p> : null}
        {data && data.saveReview ? <p>Saved!</p> : null}
        <br />
          <form action="submit">
            <FormControl sx={{ width: '93vw' }}>
              <TextField 
                fullWidth 
                id="outlined-basic" 
                label="Name" 
                variant="outlined" 
                color='success' 
                required 
                onChange={e => setName(e.target.value)}
              />
              <br />
              <TextField 
                fullWidth 
                id="outlined-basic" 
                label="Title" 
                variant="outlined" 
                color='success' 
                required 
                onChange={e => setTitle(e.target.value)}
              />
              <br />
              <Typography component="legend">Rate this movie:</Typography>
              <Rating 
                name="read-only" 
                value={rating}
                onChange={(event) => {
                  setRating(rating)
                }}
              />
              <br/>
              <TextField 
                multiline fullWidth id="outlined-multiline-flexible" 
                label="Write your review ..." 
                variant="outlined" 
                color='success' 
                sx={{ minWidth: '150px' }}
                required
                onChange={e => setBody(e.target.value)}
              />
              <br />
              <Button 
                color='success' 
                variant='contained'
                onClick={() => name && title && rating && body && saveReview()}
              >
                Submit
                </Button>
            </FormControl>
          </form>
      </div>
    </div>
  );
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