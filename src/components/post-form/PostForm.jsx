import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col sm:flex-row text-black shadow-2xl  bg-white bg-opacity-40 rounded-2xl p-6 gap-6">
            {/* Left Section: Title, Slug, Image, and Status (Significantly Reduced Size) */}
            <div className="flex flex-col sm:w-1/4  space-y-3">
                <div className="border border-gray-600 rounded-lg p-4 shadow-md sm:mt-2 lg:mt-32">
                    {/* Title Input */}
                    <div className="relative mb-3">
                        <Input
                            label="Title :"
                            placeholder="Enter title"
                            className="w-full text-xs"
                            {...register("title", { required: "Title is required" })}
                        />
                    </div>

                    {/* Slug Input */}
                    <div className="relative mb-3">
                        <Input
                            label="Unique ID (Slug) :"
                            placeholder="Generated from title"
                            className="w-full text-xs"
                            {...register("slug", { required: "Slug is required" })}
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                            }}
                        />
                    </div>

                    {/* Featured Image Input */}
                    <div className="relative mb-3">
                        <Input
                            label="Featured Image :"
                            type="file"
                            className="w-full text-xs"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: !post })}
                        />
                    </div>

                    {/* Status Select */}
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="w-full text-xs"
                        {...register("status", { required: "Status is required" })}
                    />
                </div>

                {/* Submit Button */}
                <Button 
                    type="submit" 
                    bgColor={post ? "bg-green-500" : "bg-blue-400"} 
                    className="w-full hover:bg-blue-500 transition duration-300 mt-3"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>

            {/* Right Section: Content (RTE) */}
            <div className="sm:w-3/4 ">
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
        </form>
    );
}
