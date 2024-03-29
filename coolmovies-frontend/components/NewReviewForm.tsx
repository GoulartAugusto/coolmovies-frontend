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

// Define the GraphQL mutation
export const CREATE_MOVIE_REVIEW = gql(`
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

export const CREATE_USER = gql(`
mutation NewUser($input: CreateUserInput!) {
  createUser(input: $input) {
    user {
      id
      name
    }
  }
}
`)

export const NewReviewForm = (props: any) => {
  //const router = useRouter();

  const [value, setValue] = React.useState<number | null>(2);
  
  // Define state to hold form input values
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    rating: value,
    movieId: props.message, // Replace with actual movie ID
    userReviewerId: '' // Will be set to the user ID later
  })
  
  const [name, setName] = useState('');
  
  // Define the useMutation hooks
  const [createMovieReview, { loading, error, data }] = useMutation(CREATE_MOVIE_REVIEW)
  const [createUser] = useMutation(CREATE_USER)

  // Handle form input changes
  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Handle name input changes
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // If the e.preventDefault() is uncommented when the button submit is clicked the review stay on the form
     e.preventDefault()

    // Call the createMovieReview mutation with form data
    try {
      // Step 1: Create a new user with the entered name
      const userResult = await createUser({
        variables: {
          input: {
            user: {
              name: name
            }
          }
        }
      })
      
      // Step 2: Obtain the user ID  from result
      const newUserId = userResult?.data.createUser.user.id;

      // Step 3: Update formData with the obtained user ID
      setFormData({
        ...formData,
        userReviewerId: newUserId
      })

      setTimeout(() => {}, 1000)
      // Step 4: Call the createMovieReview mutation with updated form data
      const result = await createMovieReview({
        variables: {
          input: {
            movieReview: formData,
          },
        },
      });

      if (result.data.createMovieReview.movieReview != 0) {
        document.location.reload()
      } else {
        console.log('try again')
      }

      // Handle the result from the mutation
      console.log('Moview Review added:', result.data.createMovieReview.movieReview)
    } catch (mutationError: any) {
      console.error('Error adding movie review:', mutationError.message)
    }
  }

  // Render the form ...
  return (
  <div>
    <div css={styles.reviewForm}>
        <Typography variant='h4' css={styles.heading}>Write your review:</Typography>
        {/* {error ? <p>Oh no! {error.message}</p> : null} */}
        {error ? <p>Click on submit button again</p> : null}
        {data && data.createReview ? <p>Saved!</p> : null}
        <br />
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ width: '93vw' }}>
              <TextField 
                fullWidth 
                id="outlined-basic" 
                label="Name" 
                name="Name"
                variant="outlined" 
                color='success' 
                value={name}
                onChange={handleNameChange}
              />
              <br />
              <TextField 
                fullWidth 
                label="Title" 
                name="Title"
                id="outlined-basic" 
                variant="outlined" 
                color='success' 
                required 
                value={formData.title}
                onChange={handleInputChange}
              />
              <br />
              <Typography component="legend">Rate this movie:</Typography>
              <Rating 
                placeholder='Rate this movie:'
                name='rating'
                id="simple-controlled" 
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                  handleInputChange({ target: { name: "rating", value: newValue}});
                }}
              />
              <br/>
              <TextField 
                name="body"
                label="Write your review ..." 
                multiline 
                fullWidth 
                id="outlined-multiline-flexible" 
                variant="outlined" 
                color='success' 
                sx={{ minWidth: '150px' }}
                value={formData.body}
                onChange={handleInputChange}
                required
              />
              <br />
              <Button 
                color='success'   
                variant='contained'
                type='submit'
                onClick={() => setTimeout(() => {handleSubmit}, 1000)}
              >
                {loading ? 'Adding Moview Review' : 'Submit'}
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