import { css } from '@emotion/react';
import {
  Typography,
  IconButton,
  FormControl,
  TextField,
  Rating,
  Button
} from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import { gql } from '@apollo/client';

import { useRouter } from 'next/router'
import { useQuery } from "@apollo/client";

import EditIcon from '../../components/EditIcon'

import { NewReviewForm } from '../../components/NewReviewForm';
import { EditReviewForm } from '../../components/EditReviewForm';

const GET_MOVIE = gql(`
query GetMovie($id: ID!) {
  movie(nodeId: $id) {
    id
    title
    imgUrl
    releaseDate
    movieDirectorByMovieDirectorId {
      id
      name
    }
    movieReviewsByMovieId {
      totalCount
      nodes {
        id
        nodeId
        title
        rating
        body
        movieId
        userByUserReviewerId {
          id
          name
        }
      }
    }
  }
}
`)

// The component
export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;
  
  const [reviewId, setReviewId] = useState('');

  // fetch data using apollo client
const { loading, error, data } = useQuery(GET_MOVIE, {
variables: { id: id },
})

  if (loading) return (
    <Typography variant={'h1'} css={styles.heading}>
      {'...Loading'}
    </Typography>
  )
  if (error) return <p>{error.message}</p>;

  const { movie } = data

  const reviews = movie?.movieReviewsByMovieId.nodes
  {/* add remotePatterns on next.config to render images from url */}
  
  return (
  <div css={styles.root}>
    <div css={styles.body}>
      {/* <p>Movie: {router.query.id}</p> */}
        <div>
          <div css={styles.infoWrapper}>
                  <div>
                  <Image src={movie.imgUrl} height={350} width={250} alt={movie.title} key={movie.id} />
                      <Typography variant='h3' css={styles.heading}>
                          {movie.title}
                      </Typography>
                      <Typography>
                          A film by {movie.movieDirectorByMovieDirectorId.name} | {movie.releaseDate.substring(0, 4)}
                      </Typography>
                      <br />
                      <Typography variant='h6'>
                        Reviews about the movie (total reviews: {movie.movieReviewsByMovieId.totalCount})
                      </Typography>
                      <br />
                  </div>
            </div>
            {/*  */}
            <div>
              <EditReviewForm />
            </div>
            {/*  */}
            <div>
              <div>
                {
                  !data ? null :
                  reviews.map((comment: any) => {
                    return (
                      <div css={styles.commentCard} key={comment.id}>
                        <Typography variant='body1'>
                          Review by: {comment?.userByUserReviewerId && comment.userByUserReviewerId.name || 'Anonymous' }
                        </Typography>
                        <Typography variant='h5'>
                          {comment.title}
                          <IconButton 
                            size="large" 
                            name='nodeId'
                            value={comment.nodeId}
                            onClick={() => {setReviewId(comment.nodeId), console.log(reviewId)}}
                          >
                            <EditIcon />
                          </IconButton>
                        </Typography>
                        <Rating name="read-only" value={comment.rating} readOnly />
                        <br />
                        <Typography variant='body1'>{comment.body}</Typography><br/>
                        {/* <Typography variant='body1'>{comment.nodeId}</Typography><br/> */}
                      </div>
                    )
                  })
                }
              </div>
            </div>
        </div>
        <div css={styles.reviewForm}>
          <NewReviewForm message={movie.id} />
        </div>
    </div>
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
