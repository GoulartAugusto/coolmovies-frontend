import React from 'react'
import Link from 'next/link';
import { css } from '@emotion/react';

import {
    Paper,
    Typography,
  } from '@mui/material';

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div>
        <Paper elevation={3} css={styles.navBar}>
            <Link href='/'>
                <Typography>{'EcoPortal'}</Typography>
            </Link>
        </Paper>
    </div>
  )
}

const styles = {
    navBar: css({
        height: 50,
        alignSelf: 'stretch',
        display: 'flex',
        alignItems: 'center',
        padding: 16,
        borderRadius: 0,
        backgroundColor:'#000000',
        p: {
            color: '#8700FC',
            fontSize:'1.5em'
          },
    })
};

export default Navbar

