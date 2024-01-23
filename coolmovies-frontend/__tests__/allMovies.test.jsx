import React from 'react'
import '@testing-library/jest-dom'
import { render, waitFor, screen } from '@testing-library/react'
import { MockedProvider } from "@apollo/client/testing"
import { GET_MOVIES, MovieCard } from '../components/MovieCard'

const mocks = [
    {
        request: {
            query: GET_MOVIES
        },
        result: {
            data: {
                allMovies: {
                    nodes: [
                        {
                            id: "70351289-8756-4101-bf9a-37fc8c7a82cd",
                            imgUrl: "https://upload.wikimedia.org/wikipedia/en/d/d4/Rogue_One%2C_A_Star_Wars_Story_poster.png",
                            movieDirectorByMovieDirectorId: {
                                age: 46,
                                id: "c103cc08-ed39-4a3c-a1f3-0f431c07539e",
                                name: "Gareth Edwards",
                                nodeId: "WyJtb3ZpZV9kaXJlY3RvcnMiLCJjMTAzY2MwOC1lZDM5LTRhM2MtYTFmMy0wZjQzMWMwNzUzOWUiXQ=="
                            },
                            nodeId: "WyJtb3ZpZXMiLCI3MDM1MTI4OS04NzU2LTQxMDEtYmY5YS0zN2ZjOGM3YTgyY2QiXQ==", 
                            releaseDate: "2016-12-16",
                            title: "Rogue One: A Star Wars Story"
                        }
                     
                ]
                }
            }
        }
    }
]

it("Render movies correctly", async () => {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <MovieCard />
        </MockedProvider>
    )

  // Wait for the data to be loaded
  await waitFor(() => expect(screen.getByText("Rogue One: A Star Wars Story")).toBeInTheDocument());
  expect(screen.getByText("Gareth Edwards | 2016")).toBeInTheDocument();
})

// Test fully working