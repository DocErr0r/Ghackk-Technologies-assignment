import React from 'react';

const WebtoonCard = ({ webtoon }) => {
    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg transform transition-all duration-200 hover:shadow-2xl hover:scale-105 m-4">
            <img className="w-full h-56 object-cover" src={webtoon.image} alt={webtoon.title} />
            <div className="bg-white p-4">
                <div className="font-bold text-xl mb-2 text-gray-800">{webtoon.title}</div>
                <p className="text-gray-600 text-base">{webtoon.description}</p>
            </div>
            <div className="p-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105">View More</button>
            </div>
        </div>
    );
};

export default WebtoonCard;
