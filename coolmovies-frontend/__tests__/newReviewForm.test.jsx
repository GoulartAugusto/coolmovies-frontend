import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import { CREATE_MOVIE_REVIEW, CREATE_USER, NewReviewForm } from '../components/NewReviewForm'

it("should render without error", () => {

    render(
        <MockedProvider mocks={[]}>
            <NewReviewForm />
        </MockedProvider>
    )
})

it("should render loading and success states on submit", async () => {
    const createMovieReview = { movieReview: { title: "Very good", body: "Nice!", rating: 5, movieByMovieId: { title: "Rogue One: A Star Wars Story" }, userByUserReviwerId: { name: "Augusto" } }}
    const newUser = { createUser: { user: { name: "Augusto"}} }

    const mocks = [
        {
            request: {
                query: CREATE_MOVIE_REVIEW,
                variables: {
                    input: {
                        movieReview: createMovieReview
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