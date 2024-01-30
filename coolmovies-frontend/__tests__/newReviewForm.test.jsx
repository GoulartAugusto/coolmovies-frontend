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
                            name: "Reviewer Name"
                        }
                    }
                }
            }
        }
    }

    const createUserMock = {
        request: {
            query: CREATE_USER,
            variables: {
                input: {
                    user: {
                        name: "Test User"
                    },
                },
            },
        },
        result: {
            data: {
                createUser: {
                    id: "2",
                    name: "Test User"
                }
            }
        }
    }
  
    test('handles form submission and mutations', async () => {
        render(
          <MockedProvider mocks={[createMovieReviewMock, createUserMock]} addTypename={false}>
            <NewReviewForm message="70351289-8756-4101-bf9a-37fc8c7a82cd" />
          </MockedProvider>
        );
            // Input name
            userEvent.type(screen.getByLabelText('Name'), 'Test User')

            // Input title
            userEvent.type(screen.getByLabelText('Title *'), 'Test Title')

            // Input rating
            userEvent.click(screen.getByPlaceholderText('Rate this movie:').querySelector('input[value="5"]'));

            // Input Body
            userEvent.type(screen.getByLabelText('Write your review ... *'), 'Test Body')

            // Submit form
            await act(async () => {
                userEvent.click(screen.getByText('Submit'))
                userEvent.click(screen.getByText('Submit'))
            })

            // Wait for mutation and result

            await waitFor(() => {
                expect(screen.getByText('Title *')).toBeInTheDocument()
                expect(screen.getByText('Write your review ... *')).toBeInTheDocument()
            })
        })


// Developing the test for New Review Mutation

