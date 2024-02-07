import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from "@apollo/client/testing";
import { EDIT_MOVIE_REVIEW, EditReviewForm } from '../components/EditReviewForm';
import { fireEvent } from '@testing-library/react';


const editMovieReviewMock = {
    request: {
        query: EDIT_MOVIE_REVIEW,
        variables: {
            input: {
                nodeId: "WyJtb3ZpZV9yZXZpZXdzIiwiMTFiZWY2YjItNmUzZS00MDAwLWExZWQtYWQxN2RiYjg5OWVkIl0=",
                movieReviewPatch: {
                    title: "New Title",
                    body: "New Body",
                    rating: 4,
                },
            },
        },
    },
    result: {
        data: {
            updateMovieReview: {
                movieReview: {
                    nodeId: "WyJtb3ZpZV9yZXZpZXdzIiwiMTFiZWY2YjItNmUzZS00MDAwLWExZWQtYWQxN2RiYjg5OWVkIl0=",
                    title: "New Title",
                    body: "New Body",
                    rating: 4,
                }
            }
        }
    }
}


test('handles the title field of form that edit a review submission and mutations', async () => {
    const editReview = {
        nodeId: "WyJtb3ZpZV9yZXZpZXdzIiwiMTFiZWY2YjItNmUzZS00MDAwLWExZWQtYWQxN2RiYjg5OWVkIl0=",
        title: "Good",                                                                                                                                                                                                                             
        body: "nice",
        rating: 5,
    }
    render(
        <MockedProvider mocks={[editMovieReviewMock]} addTypename={false}>
            <EditReviewForm editReview={editReview} />
        </MockedProvider>
    );

    const titleInput = screen.getByLabelText("Edit the title *");

    // Input title
    fireEvent.change(titleInput, { target: { value: 'New Title' } });

    // Submit form
    await act(async () => {
        userEvent.click(screen.getByText('EDIT THE REVIEW'))
    })

    // Wait for mutation and result
    await waitFor(() => {
        expect(titleInput.value).toBe('New Title')
    })
})

test('handles the body field of form that edit a review submission and mutations', async () => {
    const editReview = {
        nodeId: "WyJtb3ZpZV9yZXZpZXdzIiwiMTFiZWY2YjItNmUzZS00MDAwLWExZWQtYWQxN2RiYjg5OWVkIl0=",
        title: "Good",                                                                                                                                                                                                                             
        body: "nice",
        rating: 5,
    }
    render(
        <MockedProvider mocks={[editMovieReviewMock]} addTypename={false}>
            <EditReviewForm editReview={editReview} />
        </MockedProvider>
    );

    const bodyInput = screen.getByLabelText("Edit your review ... *");

    // Input body
    fireEvent.change(bodyInput, { target: { value: 'New Body' } });

    // Submit form
    await act(async () => {
        userEvent.click(screen.getByText('EDIT THE REVIEW'))
    })

    // Wait for mutation and result
    await waitFor(() => {
        expect(bodyInput.value).toBe('New Body')
    })
})
