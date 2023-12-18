import { css } from '@emotion/react';
import {
    Button,
    Typography,
} from '@mui/material';

import { useQuery } from "@apollo/client";

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { gql } from '@apollo/client';

const GET_MOVIES = gql(`
    query getMovies {
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


export function MovieCard() {
    // our query's result, data, is typed!
    const { loading, error, data } = useQuery(GET_MOVIES)
    console.log(data)


    // console.log(data.allMovies.nodes[1].nodeId)
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
                        <div key={movie.nodeId}>
                            <div>
                                <Link href={`/reviews/${movie.nodeId}`} >
                                    <Image src={movie.imgUrl} height={350} width={250} alt={movie.title} css={styles.movieCard} />
                                    <Button css={styles.floattingBtn} size="large" variant="text" color='secondary'>+ Details</Button>
                                    <div css={styles.blurEffect}></div>
                                    <div css={styles.description}>
                                        <Typography css={styles.subtitle}>
                                            {movie.title}
                                        </Typography>
                                        <Typography css={styles.subtitle}>
                                            {movie.movieDirectorByMovieDirectorId.name} | {movie.releaseDate.substring(0, 4)}
                                        </Typography>
                                    </div>
                                </Link>
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
      fontSize:'1em',
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
        "@media (max-width: 600px)": {
            display: "flex",
            flexDirection:'column',
            gap:"13rem"
          },
    }),
    movieCard: css({
        display: 'flex',
        alignItems:'center',
        textAlign:'center',
        borderRadius:'5%',
        border:'2px solid #8700FC',
        position:'absolute',

        h6: {
            fontWeight: '400',
            fontSize: '1.2em',
            color: '#ffffff',
            textAlign: 'justify',
            paddingLeft:'0.5em',
            marginRight: '0.5em'
        }
    }),
    floattingBtn: css({
        position:'relative',
        top:'3px',
        right:'70px'
    }),
    description: css({
        position:'relative',
        top:'150px',
        left:'5px',

    }),
    blurEffect: css({
        position:'relative',
        filter: `blur(20px)`,
        background:'black',
        height:'80px',
        top:'245px',
        right:'10x',
    }),
  };
