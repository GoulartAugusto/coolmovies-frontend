import { gql } from "@apollo/client";

export const GET_ALL_MOVIES_DETAILS = gql(`
    query allMovies {
        allMovies {
        nodes {
            id
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

export const GET_MOVIE = gql(`
    query {
        allMovies {
        nodes {
            id
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