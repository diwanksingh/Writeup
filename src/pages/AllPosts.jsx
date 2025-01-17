import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to track errors

    useEffect(() => {
        // Fetching posts when the component mounts
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await appwriteService.getPosts([]);
                if (fetchedPosts) {
                    setPosts(fetchedPosts.documents);
                } else {
                    setError('No posts found');
                }
            } catch (err) {
                setError('An error occurred while fetching posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8 min-h-screen">
                <span className="text-gray-500">Loading posts...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center py-8 min-h-screen">
                <span className="text-red-500">{error}</span>
            </div>
        );
    }

    return (
        <div className='w-full py-8 min-h-screen '>
            <Container>
                <h1 className="text-3xl font-semibold text-center text-gray-900 mb-6 underline">All Posts</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {posts.map((post) => (
                        <div key={post.$id} className='flex justify-center'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
