import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from "@apollo/client/testing";
import { act } from 'react-dom/test-utils';
import { CREATE_MOVIE_REVIEW, CREATE_USER, NewReviewForm } from '../components/NewReviewForm'

it("should render without error", () => {

    render(
        <MockedProvider mocks={[]}>
            <NewReviewForm />
        </MockedProvider>
    )
})

it("should render loading and success states on submit", async () => {
    const createMovieReviewMock = {
        request: {
            query: CREATE_MOVIE_REVIEW,
            variables: {
                input: {
                    movieReview: {
                        title: "Test Title",
                        body: "Test Body",
                        rating: 5,
                        movieId: "70351289-8756-4101-bf9a-37fc8c7a82cd",
                        userReviewerId: "5f1e6707-7c3a-4acd-b11f-fd96096abd5a"
                    },
                },
            },
        },
        result: {
            data: {
                createMovieReview: {
                    movieReview: {
                        id: "123abc",
                        title: "Test Title",
                        body: "Test Body",
                        rating: 5,
                        movieByMovieId: {
                            title: "Rogue One: A Star Wars Story"
                        },
                        userByUserReviewerId: {
                            name: "Chrono"
                        }
                    }
                }
            }
        }
    }

    const createUserMock = {
        request: {
            
        }
    }
  
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <NewReviewForm />
        </MockedProvider>
    );
  
    // Find the button element
    
    const button = await screen.getByText("Submit")
    fireEvent(button) // Simulate a click and fire the mutation
    
    expect(await screen.findByText("Adding Moview Review")).toBeInTheDocument()
  });

// Developing the test for New Review Mutation

// The test above no execute the mutation, because the mutate function is not called

// the test bellow does execute de mutation

{/*

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

const CREATE_USER = gql(`
mutation NewUser($input: CreateUserInput!) {
  createUser(input: $input) {
    user {
      id
      name
    }
  }
}
`)

it("should render loading and success states on createMovieReview", () => async {
    const createMovieReview = { movieReview: { title: "Very good", body: "Nice!", rating: 5, movieByMovieId: { title: "Rogue One: A Star Wars Story" }, userByUserReviwerId: { name: "Augusto" } }}
    const newUser = { createUser: { user: { name: "Augusto"}} }

    const mocks = [
        {
            request: {
                query: CREATE_MOVIE_REVIEW,
                variables: {
                    input: {
                        movieReview: formData
                    }
                },
                result: { data }
            }
        }
    ]

    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <NewReviewForm />
        </MockedProvider>
    )
    
    // Find the button element
    
    const button = await screen.getByText("Submit")
    fireEvent(button) // Simulate a click and fire the mutation
    
    expect(await screen.findByText("Adding Moview Review")).toBeInTheDocument()
})

*/}