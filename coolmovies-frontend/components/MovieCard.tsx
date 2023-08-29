import { gql, useQuery } from "@apollo/client";

import Image from 'next/image';
import React from 'react';

const GET_ALL_MOVIES = gql(`
    query AllMovies {
        allMovies {
            nodes {
                id
                title
                imgUrl
                releaseDate
                movieDirectorByMovieDirectorId {
                    name
                    nodeId
                }
            }
        }
    }
`);

export function MovieCard() {
    // our query's result, data, is typed!
    const { loading, data } = useQuery(GET_ALL_MOVIES)

    return (
        <div>
            <h1>Movies</h1>
            { loading ? (
                <h1>Loading...</h1>
            ) : (
                <div>
                    {/* add remotePatterns on next.config to render images from url */}
                    {/* map over the movies and render them */}
                    {!data ? null : data.allMovies.nodes.map((movie: any) => {
                        return (
                        <div key={movie.id}>
                            <h1>{movie.title}</h1>
                            <Image src={movie.imgUrl} height={250} width={250} alt={movie.title} />
                            <p>Released on {movie.releaseDate}</p>
                            <p>{movie.movieDirectorByMovieDirectorId.name}</p>
                        </div>
                        )
                })}
                </div>

            )}
        </div>
    )
}