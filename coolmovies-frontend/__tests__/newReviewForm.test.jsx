import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from "@apollo/client/testing";
import { act } from 'react-dom/test-utils';
import { CREATE_MOVIE_REVIEW, CREATE_USER, NewReviewForm } from '../components/NewReviewForm'
import { fireEvent } from '@testing-library/react';

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

        //type TestElement = Document | Element | Window | Node

function hasNameInputValue(e) {
  return screen.getByDisplayValue('Test User') === e
}

function hasTitleInputValue(e) {
    return screen.getByDisplayValue('Test Title') === e
}

function hasBodyInputValue(e) {
    return screen.getByDisplayValue('Test Body') === e
}


            const nameInput = screen.getByLabelText('Name')
            fireEvent.change(nameInput, { target: { name: "Name", value: "Test User" } })
            //expect(hasInputValue(nameInput, 'Test User')).toBe(true)
            //userEvent.type(screen.getByLabelText('Name'), 'Test User')

            // Input title
            const titleInput = screen.getByLabelText('Title *')
            fireEvent.change(titleInput, { target: { name: "Title *", value: "Test Title" } })
            //userEvent.type(screen.getByLabelText('Title *'), 'Test Title')

            // Input rating
            userEvent.click(screen.getByPlaceholderText('Rate this movie:').querySelector('input[value="5"]'));

            // Input Body
            const bodyInput = screen.getByLabelText('Write your review ... *')
            fireEvent.change(bodyInput, { target: { name: "Write your review ... *", value: "Test Body" } })
            //userEvent.type(screen.getByLabelText('Write your review ... *'), 'Test Body')

            // Submit form
            await act(async () => {
                userEvent.click(screen.getByText('Submit'))
                //userEvent.click(screen.getByText('Submit'))
            })

            // Wait for mutation and result

            await waitFor(() => {
                //expect(hasInputValue(nameInput, 'Test User')).toBe(true)
                //expect(screen.getByText('Write your review ... *')).toBeInTheDocument()
                expect(hasNameInputValue(nameInput, 'Test User')).toBe(true)
                expect(hasTitleInputValue(titleInput, 'Test Title')).toBe(true)
                expect(hasBodyInputValue(bodyInput, 'Test Body')).toBe(true)
            })
        })

        {/*
    const input = screen.getByLabelText("Some Label")

fireEvent.change(input, { target: { value: '123' } })
expect(hasInputValue(input, "123")).toBe(true)
    
    */}


// Developing the test for New Review Mutation

