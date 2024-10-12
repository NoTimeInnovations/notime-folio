"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "../home/Button";


export const CourseReview = ({ reviews, handleReviewSubmit }) => {
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    const reviewIntervalRef = useRef(null);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };
    const handleReviewChange = (event) => {
        setReview(event.target.value);
    };
    const submitReview = () => {
        // Handle review submission
        handleReviewSubmit({ rating, review });

        setRating(0);
        setReview("");
    };

    useEffect(() => {
        reviewIntervalRef.current = setInterval(() => {
            setCurrentReviewIndex((prevIndex) =>
                prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(reviewIntervalRef.current);
    }, []);
    return (<>
        <div className=" bg-gray-800 p-6 rounded-lg shadow-lg relative">
            <h2 className="text-3xl font-bold mb-4 text-white text-center">
                Reviews
            </h2>
            <div className="relative overflow-hidden">
                <div
                    className="flex transition-transform duration-1000"
                    style={{ transform: `translateX(-${currentReviewIndex * 100}%)` }}
                >
                    {reviews?.map((review, index) => (
                        <div key={index} className="flex-none w-full px-4">
                            <div className="bg-gray-700 p-6 rounded-lg shadow-md mt-10 relative">
                                <div className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full overflow-hidden">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${review.user.image.url}`}
                                        alt={review.user.name}
                                    />
                                </div>
                                <div className="pt-10">
                                    <div className="flex items-center mb-2">
                                        <div className="text-yellow-400 flex items-center">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`w-5 h-5 ${i < review.rating ? "fill-current" : "text-gray-600"}`}
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M12 17.27l5.18 3.09-1.36-6.06L21 9.24l-6.18-.53L12 3 9.18 8.71 3 9.24l4.18 4.06-1.36 6.06L12 17.27z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="ml-3 text-gray-300">{review.user.name}</span>
                                    </div>
                                    <p className="text-gray-400">{review.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
                    onClick={() =>
                        setCurrentReviewIndex(
                            (prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1)
                        )
                    }
                >
                    &lt;
                </button>
                <button
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full"
                    onClick={() =>
                        setCurrentReviewIndex(
                            (prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1)
                        )
                    }
                >
                    &gt;
                </button>
            </div>
            <div className="flex items-center mb-2 mt-7">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-8 h-8 cursor-pointer ${i < rating ? "fill-yellow-400" : "text-gray-600"}`}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => handleRatingChange(i + 1)}
                    >
                        <path d="M12 17.27l5.18 3.09-1.36-6.06L21 9.24l-6.18-.53L12 3 9.18 8.71 3 9.24l4.18 4.06-1.36 6.06L12 17.27z" />
                    </svg>
                ))}
            </div>
            <textarea
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 resize-none mt-6"
                rows="4"
                value={review}
                onChange={handleReviewChange}
                placeholder="Write your review here..."
            ></textarea>
            <Button
                text={"Submit Review"}
                gradient={`bg-gradient-to-r from-green-500 to-yellow-500 text-white mt-6`}
                onClick={submitReview}
                
            />
        </div>
    </>)
}