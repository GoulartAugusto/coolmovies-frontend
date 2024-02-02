import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from "@apollo/client/testing";
import { CREATE_MOVIE_REVIEW, CREATE_USER, NewReviewForm } from '../components/NewReviewForm'
import { fireEvent } from '@testing-library/react';

it("This test should render the form that create a new review without error", () => {
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

test('handles form submission and mutation for  the title input', async () => {
    render(
        <MockedProvider mocks={[createMovieReviewMock, createUserMock]} addTypename={false}>
            <NewReviewForm message="70351289-8756-4101-bf9a-37fc8c7a82cd" />
        </MockedProvider>
    );

    const titleInput = screen.getByLabelText("Title *");

    // Input title
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });

    // Submit form
    await act(async () => {
        userEvent.click(screen.getByText('Submit'))
    })

    // Wait for mutation and result
    await waitFor(() => {
        expect(titleInput.value).toBe('Test Title')
    })
})

test('handles form submission and mutation for the name input', async () => {
    render(
        <MockedProvider mocks={[createMovieReviewMock, createUserMock]} addTypename={false}>
            <NewReviewForm message="70351289-8756-4101-bf9a-37fc8c7a82cd" />
        </MockedProvider>
    );

    const nameInput = screen.getByLabelText("Name");

    // Input name
    fireEvent.change(nameInput, { target: { value: 'Test User' } });

    // Submit form
    await act(async () => {
        userEvent.click(screen.getByText('Submit'))
    })

    // Wait for mutation and result
    await waitFor(() => {
        expect(nameInput.value).toBe('Test User')
    })
})

test('handles form submission and mutation for the body of review input', async () => {
    render(
        <MockedProvider mocks={[createMovieReviewMock, createUserMock]} addTypename={false}>
            <NewReviewForm message="70351289-8756-4101-bf9a-37fc8c7a82cd" />
        </MockedProvider>
    );

    const bodyInput = screen.getByLabelText("Write your review ... *");

    // Input Body
    fireEvent.change(bodyInput, { target: { value: 'Test Body' } });

    // Submit form
    await act(async () => {
        userEvent.click(screen.getByText('Submit'))
    })

    // Wait for mutation and result
    await waitFor(() => {
        expect(bodyInput.value).toBe('Test Body')
    })
})
