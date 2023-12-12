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
import { gql, useMutation  } from '@apollo/client';

import { useRouter } from 'next/router'
import { useQuery } from "@apollo/client";

//import { GET_MOVIE } from '../../queries/MoviesQueries';
import EditIcon from '../../components/EditIcon'

import { NewReviewForm } from '../../components/NewReviewForm';

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
  
  // fetch data using apollo client
  //const { data, loading, error } = useQuery(GET_MOVIE);
  
  const router = useRouter();
  const { id } = router.query;

const { loading, error, data } = useQuery(GET_MOVIE, {
variables: { id: id },
})


  {/*

  const { data, loading, error } = useQuery(GET_MOVIE_BY_NODEID, {

  })
*/}

  //console.log(data)

  // console.log(data?.allMovies.nodes[0].nodeId)

  // this only render the movie that matches with router.query.id
  // for (let i = 0; i < data?.allMovies.nodes.length; i++) {
  //   if (data.allMovies.nodes[i].id == id) {
  //     var movie = data?.allMovies.nodes[i]
  //   }
  // }

  // const reviews = movie?.movieReviewsByMovieId.nodes

  // the line bellow is the path to the first comment
  //console.log(movie?.movieReviewsByMovieId.nodes[0].id)

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
            <div>
              <div>
                {
                  !data ? null :
                  reviews.map((comment: any) => {
                    return (
                      <div css={styles.commentCard}>
                        <Typography variant='body1'>
                          Review by: {comment?.userByUserReviewerId && comment.userByUserReviewerId.name || 'Anonymous' }
                        </Typography>
                        <Typography variant='h5'>
                          {comment.title}
                          <IconButton size="large">
                            <EditIcon />
                           </IconButton>
                        </Typography>
                        <Rating name="read-only" value={comment.rating} readOnly />
                        <br />
                        <Typography variant='body1'>{comment.body}</Typography><br/>
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

{/*

=== useMutation is a operation that creates, modify or destroy data in GraphQL ===

I want to insert on graphQL server the data of the NewReviewForm

how to do it?


*/}

// how to insert data on graphQL apollo?