import { css } from '@emotion/react';
import {
    Button,
    Paper,
    TextField,
    Tooltip,
    Typography,
    Zoom,
  } from '@mui/material';

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
        <div css={styles.root}>
            <div css={styles.body}>
                { loading ? (
                    <Typography variant={'h1'} css={styles.heading}>
                        {'...Loading'}
                    </Typography>
                ) : (
                <div css={styles.cardWrapper}>
                    {/* add remotePatterns on next.config to render images from url */}
                    {/* map over the movies and render them */}
                    {!data ? null : data.allMovies.nodes.map((movie: any) => {
                        return (
                        <div css={styles.movieCard}>
                            <div key={movie.id}>
                                <Image src={movie.imgUrl} height={350} width={250} alt={movie.title} css={styles.movieCard} />
                                
                                {/* <Typography variant="h6" css={styles.heading}>
                                    {movie.title}
                                </Typography>
                                
                                <Typography css={styles.subtitle}>
                                    Film released in :
                                    <br />
                                    {movie.releaseDate}
                                </Typography>
                                <Typography css={styles.subtitle}>
                                    A film by:
                                    <br />
                                    {movie.movieDirectorByMovieDirectorId.name}
                                </Typography> */}

                            </div>
                        </div>
                        )
                    })}
                    </div>
                )}
            </div>
        </div>
    )
}

const styles = {
    root: css({
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        
      }),
    body: css({
      alignSelf: 'stretch',
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }),
    heading: css({ margin: 16, fontSize: '2.75rem', textAlign: 'center', color:'#ffffff' }),
    subtitle: css({
      fontWeight: 100,
      paddingLeft: '0.5em',
      textAlign: 'justify',
      fontSize:'1.1em',
      maxWidth: 250,
      color: '#ffffff',
    }),
    mainControls: css({
      display: 'flex',
      alignItems: 'center',
      button: { marginRight: 16 },
    }),
    cardWrapper: css({
        display:"grid",
        gridTemplateColumns: '250px 250px',
        gap:'1em',
        textAlign:'center',
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        justifySelf:'center',
        
    }),
    movieCard: css({
        display: 'flex',
        alignItems:'center',
        textAlign:'center',
        borderRadius:'5%',
        border:'2px solid #8700FC',
        h6: {
            fontWeight: '400',
            fontSize: '1.2em',
            color: '#ffffff',
            textAlign: 'justify',
            paddingLeft:'0.5em',
            marginRight: '0.5em'
        }
    })
  };
  