import React, { useState, ChangeEvent, FormEvent } from 'react';
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

interface ReviewData {
  title: string
  body: string
  rating: number
  nodeId: string
}

interface EditReviewFormProps {
  initialData: ReviewData
}

// Define the GraphQL mutation
const EDIT_MOVIE_REVIEW = gql(`
mutation editMovieReview($input: UpdateMovieReviewInput!) {
    updateMovieReview(input: $input) {
          movieReview {
              nodeId
              title
              body
              rating
              userReviewerId
              movieByMovieId {
                title
              }
              userByUserReviewerId {
                id
                name
              }
          }
      clientMutationId
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
            - the nodeId is passed by props 
            - now is needed to fetch the other fields
        - define the states
        - define the useMutation
        - define the handleChange
        - define the handleSubmit


        ...

        The mutation work
        
        - now the work is:
            - make the editReviewForm toggle on the review card to make the edit when the client click on it

*/}

export const EditReviewForm = (props: any) => {
  //const [editReview, setEditReview] = useState(props.editReview)
  const editReview = props.editReview
  const [value, setValue] = React.useState<number | null>(2);

  //const [updateMovieReview, { loading, error, data }] = useMutation(EDIT_MOVIE_REVIEW)
  
  console.log('this is the original object', editReview)

  // Define state to hold form input values
  const [newData, setNewData] = useState<ReviewData>({...editReview})

  // hold the new value for rating input

    console.log('this is the new data object', newData)
    console.log('this is the new data object', newData)

    // Handle form input changes
    const handleInputChange = (e: any) => {
      setNewData({
        ...newData,
        [e.target.name]: e.target.value
      })
    }

  // Define the state to hold form input values
  const [formData, setFormData] = useState({
    title: editReview.title,
    body: editReview.body,
    rating: editReview.rating,
    nodeId: editReview.nodeId
  })

  // Define the useMutation hook for editing review
  const [editMovieReview, { loading, error }] = useMutation(EDIT_MOVIE_REVIEW)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value
    })
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // If the e.preventDefault() is uncommented when the button submit is clicked the review stay on the form
     e.preventDefault()

    // Call the updateMovieReview mutation with form data
    try {
      const result = await editMovieReview({
        variables: {
          input: {
            nodeId: editReview.nodeId,
            movieReviewPatch: {
              title: newData.title,
              body: newData.body,
              rating: newData.rating
            }
          },
        },
      });

      if (result.data.updateMovieReview.movieReview != 0) {
        document.location.reload()
      } else {
        console.log('try again')
      }

      // Handle the result from the mutation
      console.log('Moview Review Edited:', result.data.updateMovieReview.movieReview)
    } catch (mutationError: any) {
      console.error('Error editing movie review:', mutationError.message)
    }
  }


    return (
        <div css={styles.reviewCard}
        key={editReview.nodeId}
        >
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ width: '93vw' }}>
              <TextField 
                name='name'
                fullWidth 
                id="outlined-basic" 
                label="Name" 
                variant="outlined" 
                color='success' 
                value={editReview.name}
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
                value={newData.title}
                onChange={handleInputChange}
              />
              <br />
              <Typography component="legend">Rate this movie:</Typography>
              <Rating 
                name='rating'
                id="simple-controlled" 
                value={newData.rating}
                onChange={(event, newValue) => {
                  setValue(newValue);
                  handleInputChange({ target: { name: "rating", value: newValue}});
                }}
              />
              <br/>
              <TextField 
                name='body'
                required
                multiline 
                fullWidth 
                id="outlined-multiline-flexible" 
                label="Edit your review ..." 
                variant="outlined" 
                color='success' 
                sx={{ minWidth: '150px' }}
                value={newData.body}
                onChange={handleInputChange}
              />
              <br />
              <Button 
                color='success'   
                variant='contained'
                type='submit'
                onClick={() => setTimeout(() => {handleSubmit}, 1000)}
              >
                {loading ? 'Updating Moview Review ...' : 'EDIT THE REVIEW'}
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
    reviewCard: css({
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
  