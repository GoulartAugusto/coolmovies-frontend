import React from 'react';
import '@testing-library/jest-dom';
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

// Developing the test for New Review Mutation