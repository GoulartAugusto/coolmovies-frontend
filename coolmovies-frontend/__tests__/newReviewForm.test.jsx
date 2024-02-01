import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from "@apollo/client/testing";
//import { act } from 'react-dom/test-utils';
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
                        id: "",
                        title: "Test Title",
                        body: "Test Body",
                        rating: 5,
                        movieByMovieId: {
                            title: "Rogue One: A Star Wars Story"
                        },
                        userByUserReviewerId: {
                            name: "Test User"
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
                    id: "",
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

        const nameInput = screen.getByLabelText("Name");
        const titleInput = screen.getByLabelText("Title *");
        const bodyInput = screen.getByLabelText("Write your review ... *");

        // Input name
        fireEvent.change(nameInput, { target: { value: 'Test User' } });

        // Input title
        fireEvent.change(titleInput, { target: { value: 'Test Title' } });

        // Input rating
        userEvent.click(screen.getByPlaceholderText('Rate this movie:').querySelector('input[value="5"]'));

        // Input Body
        fireEvent.change(bodyInput, { target: { value: 'Test Body' } });

        // Submit form
        await act(async () => {
            userEvent.click(screen.getByText('Submit'))
        })

        // Wait for mutation and result
        await waitFor(() => {
            expect(nameInput.value).toBe('Test User')
            expect(titleInput.value).toBe('Test Title')
            expect(bodyInput.value).toBe('Test Body')
        })
    })

        {/*
    const input = screen.getByLabelText("Some Label")

fireEvent.change(input, { target: { value: '123' } })
expect(hasInputValue(input, "123")).toBe(true)



        



// function hasNameInputValue(e) {
//   return screen.getByDisplayValue('Test User') === e
// }

// function hasTitleInputValue(e) {
//     return screen.getByDisplayValue('Test Title') === e
// }

// function hasBodyInputValue(e) {
//     return screen.getByDisplayValue('Test Body') === e
// }


            //expect(hasInputValue(nameInput, 'Test User')).toBe(true)
            //userEvent.type(screen.getByLabelText('Name'), 'Test User')


            //userEvent.type(screen.getByLabelText('Title *'), 'Test Title')




            //userEvent.type(screen.getByLabelText('Write your review ... *'), 'Test Body')

    
    */}


// Developing the test for New Review Mutation

