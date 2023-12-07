# Important Note

If submitting via a private repository, please add the following user(s) as collaborators to your repo:

- GitHub `@SheepySean`
- Gitlab `@SheepySean`

# Coolmovies web challenge

You have to add the cool movies review feature to the existing `coolmovies-frontend`.

We have created a basic app for you to get started in.

What tooling has been setup for you:

- [Next.js](https://nextjs.org/) (Build Framework)
- [MUI](https://mui.com/) (Component Library)
- [Redux Toolkit](https://redux-toolkit.js.org/) (State Management)
- [Redux-Observable](https://redux-observable.js.org/) (State Side-effect Middleware)
- [Apollo GraphQL](https://www.apollographql.com/) (GraphQL Query Client)

You must use these tools to complete the test. If you're unfamiliar with any of these, please read their documentation. We have also added some example code for the ideal patterns we would like to see. Have a look at `pages/index.tsx`.

We are providing you a GraphQL API mock application to consume.

## Acceptance Criteria

**You will be evaluated on your UI/UX. We expect this to be at the level of a basic prototype; clean and clear flow.**

You will be evaluated against your ability to understand and use the tooling provided and mimic existing patterns that are shown in the examples.

There are 3 main components for this feature, they **MUST** be completed and working:

1. Listing of the movie reviews.
2. Editing the existing movie reviews.
3. Adding additional reviews.

Additional things we would like to see, you **must do at least 5** of these:

1. The feature is available on the `/reviews` endpoint of the application.
2. The design is responsive.
3. Our designers don't like the default MUI blue. Change this.
4. Make the proxied GraphQL URL an environment variable.
5. Improve the folder structure of the frontend application how you see fit. (It's intentionally not great)
6. Add the custom `edit.svg` from the `public` folder as an icon to launch editing the review.
7. Add a unit testing framework of your choice, and some unit tests around the more complex areas of your code.

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [ratingState, setRatingState] = React.useState<number>(2);
  const [name, setName] = useState('');

  const [formState, setFormState] = useState({
    title: '',
    body: '',
    rating: '',
  })

  const [createReview, {error, data, loading}] = useMutation(CREATE_REVIEW)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    createMovieReview()

    setTitle('')
    setBody('')
    setRatingState(0)
    setName('')
  }




  const [ createMovieReview ] = useMutation(CREATE_MOVIE_REVIEW, {
    variables: {
      input: {
        title: formState.title,
        body: formState.body,
        rating: ratingState,
        movieId: "70351289-8756-4101-bf9a-37fc8c7a82cd",
        userReviewerId: "5f1e6707-7c3a-4acd-b11f-fd96096abd5a"
      }
    }
  })

  ///


  const CREATE_MOVIE_REVIEW = gql(`
mutation NewMovieReview($title: String!, $body: String, $rating: Int) {
    createMovieReview(input: {
      movieReview: {
        title: $title,
        body: $body,
        rating: $rating,
        movieId: "70351289-8756-4101-bf9a-37fc8c7a82cd",
        userReviewerId: "5f1e6707-7c3a-4acd-b11f-fd96096abd5a"
      }})
    {
      movieReview {
        id
        title
        body
        rating
        movieByMovieId {
          title
        }
        userByUserReviewerId {
          name
        }
      }
    }
  }
`)


_____________

