import { CodegenConfig } from '@graphql-codegen/cli';
import {GET_MOVIE} from './coolmovies-frontend/queries/MoviesQueries'

const config: CodegenConfig = {
  schema: '<GET_MOVIE>',
  documents: ['src/**/*.tsx'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;