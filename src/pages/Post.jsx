import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="flex items-center justify-center mt-10">
            <div className="w-full sm:w-full md:w-2/3 lg:w-2/3 bg-white bg-opacity-40 min-h-screen flex flex-col items-center rounded-xl shadow-2xl p-6">
                {/* Post Title */}
                <div className="w-full mb-8 underline">
                    <h1 className="text-4xl sm:text-3xl md:text-4xl font-bold text-black text-center">{post.title}</h1>
                </div>

                {/* Post Content and Image */}
                <div className="flex flex-col items-center space-y-8 w-full px-4">
                    <div className="w-full flex justify-center mb-8">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl  w-[500px]"
                        />
                    </div>
                    <div className="w-full max-w-3xl bg-white rounded-3xl p-6 text-base sm:text-lg md:text-xl text-gray-700 shadow-xl">
                        <div
                            className="mt-2 whitespace-pre-wrap break-words text-left"
                        >
                            {parse(post.content)}
                        </div>
                    </div>
                </div>

                {/* Author Actions (Edit/Delete) */}
                {isAuthor && (
                    <div className="flex space-x-4 mt-6">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button
                                bgColor="bg-green-500"
                                className="px-8 py-4 text-white font-semibold rounded-lg transition-all duration-300 bg-opacity-70 ease-in-out transform hover:scale-105 active:scale-95"
                            >
                                Edit
                            </Button>
                        </Link>
                        <Button
                            bgColor="bg-red-500"
                            onClick={deletePost}
                            className="px-8 py-4 text-white bg-opacity-70 font-semibold rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                        >
                            Delete
                        </Button>
                    </div>
                )}
            </div>
        </div>
    ) : null;
}
