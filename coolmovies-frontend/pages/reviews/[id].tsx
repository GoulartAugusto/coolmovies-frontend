import { css } from '@emotion/react';
import {
  Typography,
  IconButton,
  FormControl,
  TextField,
  Input,
  Rating,
  Button
} from '@mui/material';
import Image from 'next/image';
import React from 'react';

import { useRouter } from 'next/router'
import { useQuery } from "@apollo/client";

import { GET_MOVIE } from '../../queries/MoviesQueries';
import EditIcon from '../../components/EditIcon'

// The component
export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;
  
  // fetch data using apollo client
  const { data, loading } = useQuery(GET_MOVIE);

  console.log(data)

  // this is only render the movie that matches with router.query.id
  for (let i = 0; i < data.allMovies.nodes.length; i++) {
    if (data.allMovies.nodes[i].id == router.query.id) {
      var movie = data.allMovies.nodes[i]
    }
  }

  const comments = movie.movieReviewsByMovieId.nodes


  {/* add remotePatterns on next.config to render images from url */}
  return (
  <div css={styles.root}>
    <div css={styles.body}>
      {/* <p>Movie: {router.query.id}</p> */}
        { loading ? (
            <Typography variant={'h1'} css={styles.heading}>
                {'...Loading'}
            </Typography>
        ) : (
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
                  comments.map((comment: any) => {
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
        )}
        <div css={styles.reviewForm}>
            <form action="submit">
              <FormControl sx={{ width: '93vw' }}>
                <TextField fullWidth id="outlined-basic" label="Name" variant="outlined" color='success' required />
                <br />
                <TextField fullWidth id="outlined-basic" label="Title" variant="outlined" color='success' required />
                <br />
                <Rating name="read-only" />
                <br/>
                <TextField 
                  multiline fullWidth id="outlined-multiline-flexible" 
                  label="Write your review ..." 
                  variant="outlined" 
                  color='success' 
                  sx={{ minWidth: '150px' }}
                  required
                />
                {/* <FormControl component="fieldset"> */}
                <Button color='success' variant='contained'>Submit</Button>
              </FormControl>
            </form>
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
  }),
  reviewForm: css({
    display:"block",
    gap:'1em',
    textAlign:'center',
    "@media (max-width: 600px)": {
        display: "flex",
        flexDirection:'column',
        gap:"13rem"
      },
    
  })
};