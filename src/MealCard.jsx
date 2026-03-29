import { useState } from 'react';

function MealCard({ meal }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <figure className="relative h-48 overflow-hidden">
                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                    <div className="badge badge-primary gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        Featured
                    </div>
                </div>
            </figure>

            <div className="card-body p-5">
                <h2 className="card-title text-lg font-bold line-clamp-1">
                    {meal.strMeal}
                </h2>

                <div className="flex flex-wrap gap-2 mt-1">
                    <div className="badge badge-outline gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                        {meal.strCategory || 'N/A'}
                    </div>
                    <div className="badge badge-outline gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {meal.strArea || 'N/A'}
                    </div>
                </div>

                {meal.strTags && (
                    <div className="flex flex-wrap gap-1 mt-2">
                        {meal.strTags.split(',').slice(0, 3).map((tag, index) => (
                            <span key={index} className="badge badge-sm badge-secondary">
                                #{tag.trim()}
                            </span>
                        ))}
                    </div>
                )}

                <div className="card-actions mt-4">
                    <button
                        onClick={toggleExpand}
                        className="btn btn-primary btn-block"
                    >
                        {isExpanded ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                                Show Less
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                View Details
                            </>
                        )}
                    </button>
                </div>

                {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-base-200 space-y-4 animate-fadeIn">
                        {/* Ingredients Section */}
                        <div>
                            <h3 className="font-semibold text-sm uppercase tracking-wider text-primary mb-2 flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Ingredients
                            </h3>
                            <div className="grid grid-cols-2 gap-1 text-sm">
                                {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
                                    const ingredient = meal[`strIngredient${i}`];
                                    const measure = meal[`strMeasure${i}`];
                                    if (ingredient && ingredient.trim()) {
                                        return (
                                            <div key={i} className="flex items-center gap-1 text-gray-600">
                                                <span className="text-xs">•</span>
                                                <span className="text-xs">{measure} {ingredient}</span>
                                            </div>
                                        );
                                    }
                                    return null;
                                }).filter(Boolean)}
                            </div>
                        </div>

                        {/* Instructions Section */}
                        <div>
                            <h3 className="font-semibold text-sm uppercase tracking-wider text-primary mb-2 flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                Instructions
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed max-h-40 overflow-y-auto">
                                {meal.strInstructions}
                            </p>
                        </div>

                        {/* YouTube Link */}
                        {meal.strYoutube && (
                            <a
                                href={meal.strYoutube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-outline btn-error w-full gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Watch on YouTube
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MealCard;