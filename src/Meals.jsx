import { useState, useEffect } from 'react';
import MealCard from './MealCard';

const fetchMealsByLetter = async (letter) => {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
        const data = await res.json();
        return data.meals || [];
    } catch (error) {
        console.error(`Error fetching meals for letter ${letter}:`, error);
        return [];
    }
};

const fetchAllMeals = async () => {
    const letters = "abcdefghijklmnopqrstuvwxyz".split("");
    const requests = letters.map(letter => fetchMealsByLetter(letter));
    const results = await Promise.all(requests);
    return results.flat();
};

function Meals() {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadMeals = async () => {
            try {
                setLoading(true);
                const data = await fetchAllMeals();
                setMeals(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch meals');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadMeals();
    }, []);

    const filteredMeals = meals.filter(meal =>
        meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-white"></span>
                    <p className="mt-4 text-white text-lg">Loading delicious meals...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
                <div className="alert alert-error shadow-lg max-w-md">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Error: {error}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary to-secondary py-8 px-4">
            <div className="container mx-auto max-w-7xl">
                {/* Search Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
                        🍽️ Explore Meals
                    </h1>
                    <div className="max-w-md mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for a meal..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input input-bordered w-full pl-10 input-primary bg-white/90 backdrop-blur-sm"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <p className="text-white/80 mt-3 text-sm">
                            Found {filteredMeals.length} delicious {filteredMeals.length === 1 ? 'meal' : 'meals'}
                        </p>
                    </div>
                </div>

                {/* Meals Grid */}
                {filteredMeals.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredMeals.map((meal) => (
                            <MealCard key={meal.idMeal} meal={meal} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="card bg-white/90 backdrop-blur-sm shadow-xl max-w-md mx-auto">
                            <div className="card-body items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-16 w-16 text-gray-400 mb-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h2 className="card-title text-2xl">No meals found</h2>
                                <p className="text-gray-600">Try a different search term!</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Meals;