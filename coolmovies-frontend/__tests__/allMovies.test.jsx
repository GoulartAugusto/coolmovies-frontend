import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from "@apollo/client/testing"
import { GET_MOVIES, MovieCard } from '../components/MovieCard'

//const mocks = [] // This wille filled next

const mocks = [
    {
        request: {
            query: GET_MOVIES,
            variables: {
                title: "Rogue One: A Star Wars Story"
            }
        },
        result: {
            data: {
                Movie: { 
                    id: "70351289-8756-4101-bf9a-37fc8c7a82cd",
                    title: "Rogue One: A Star Wars Story",
                    releaseDate: "2016-12-16"
                }
             }
        }
    }
]

it("renders without error", async () => {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <MovieCard />
        </MockedProvider>
    )
    expect(await screen.findByText('...Loading')).toBeInTheDocument()
})