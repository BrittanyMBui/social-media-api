import React from 'react'
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import PostCard from '../components/PostCard';


function Home() {
    const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);
    // if (loading) {
    //     return 'Loading..';
    // }
    // if (error) {
    //     return `Error: ${error.message}`
    // }

    return (
        <Grid columns={3}>
        <Grid.Row>
            <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
            { loading ? (
                <h1>Loading posts..</h1>
            ) : (
                data.getPosts && data.getPosts.map((post) => (
                    <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                        <PostCard post={post} />
                    </Grid.Column>
                ))
            )}
        </Grid.Row>
        </Grid>
    )
}

export const FETCH_POSTS_QUERY = gql`
    query GetPosts {
        getPosts{
            id
            body
            createdAt
            username
            likeCount
            likes{
                username
            }
            commentCount
            comments{
            id
            username
            createdAt
            body
            }
        }
    }
`

export default Home;
