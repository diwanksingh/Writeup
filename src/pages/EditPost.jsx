import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null);    // State to hold the post data
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null);   // State to track any errors
    const { slug } = useParams();              // Get slug from the URL params
    const navigate = useNavigate();            // Navigation hook

    // Effect to fetch post data based on the slug
    useEffect(() => {
        const fetchPost = async () => {
            try {
                if (slug) {
                    setLoading(true);
                    const fetchedPost = await appwriteService.getPost(slug); // Fetch the post using the slug
                    if (fetchedPost) {
                        setPost(fetchedPost); // Set the post data if found
                    } else {
                        setError('Post not found'); // Set error if no post is found
                    }
                } else {
                    setError('Invalid post ID'); // Set error if slug is invalid
                }
            } catch (err) {
                setError('An error occurred while fetching the post'); // Set error on failed fetch
            } finally {
                setLoading(false); // Stop loading once fetching is complete
            }
        };

        fetchPost(); // Call the fetch function
    }, [slug]); // Re-run when slug changes

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <span className="text-gray-500">Loading...</span> {/* Show loading text */}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center py-8">
                <span className="text-red-500">{error}</span> {/* Show error message */}
            </div>
        );
    }

    return (
        post ? (
            <div className="py-8">
                <Container>
                    <h1 className="text-3xl font-semibold text-center mb-6 text-gray-900">Edit Post</h1>
                    <PostForm post={post} />
                </Container>
            </div>
        ) : (
            <div className="flex justify-center items-center py-8">
                <span className="text-red-500">Post not found</span> {/* Show if post is not found */}
            </div>
        )
    );
}

export default EditPost;
