import { gql } from "@apollo/client";

export const GET_MOVIE = gql(`
    query {
        allMovies {
        nodes {
            id
            nodeId
            title
            imgUrl
            releaseDate
            movieDirectorByMovieDirectorId {
            name
            nodeId
            id
            age
            }
            movieReviewsByMovieId {
            totalCount
            nodes {
                body
                id
                movieId
                nodeId
                rating
                title
                userByUserReviewerId {
                name
                id
                }
            }
            }
        }
        }
    }
`)

