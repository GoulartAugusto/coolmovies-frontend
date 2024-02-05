import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from "@apollo/client/testing";
import { EDIT_MOVIE_REVIEW, EditReviewForm } from '../components/EditReviewForm';
import { fireEvent } from '@testing-library/react';

it("This test should render the edit review form without an error", () => {
    render(
        <MockedProvider mocks={[]}>
            <EditReviewForm />
        </MockedProvider>
    )
})

const editMovieReviewMock = {
    request: {
        query: EDIT_MOVIE_REVIEW,
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
    }
}