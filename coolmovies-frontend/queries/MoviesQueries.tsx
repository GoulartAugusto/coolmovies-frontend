import { gql } from "@apollo/client";

export const GET_MOVIE = gql(`
query GetMovie($id: ID!) {
  movie(nodeId: $id) {
    id
    title
    imgUrl
    releaseDate
    movieDirectorByMovieDirectorId {
      id
      name
    }
    movieReviewsByMovieId {
      totalCount
      nodes {
        id
        title
        rating
        body
        movieId
        userByUserReviewerId {
          id
          name
        }
      }
    }
  }
}
`)
