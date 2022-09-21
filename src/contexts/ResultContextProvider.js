import React, {createContext, useContext, useState} from 'react';

const ResultContext = createContext();
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';

export const ResultContextProvider = ({children}) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('Elon Musk');

    const getResults = async(type) => {            // Type- Takes /videos /images /news all types of inputs
        setIsLoading(true);

        const response = await fetch(`${baseUrl}${type}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '643a87decfmshc78e64528e0732fp172c09jsn164437e10d36',
                'X-RapidAPI-Host': 'google-search3.p.rapidapi.com'
            },
        });

        const data = await response.json();

        if(type.includes('/news')){
            setResults(data.entries);
        }else if(type.includes('/images')){
            setResults(data.image_results);
        }else {
            setResults(data.results);
        }
        setIsLoading(false);

    }

    return(
        <ResultContext.Provider value={{getResults, results, searchTerm, setSearchTerm, isLoading}}>
            {children }
        </ResultContext.Provider>
    );

    
}

export const useResultContext = () => useContext(ResultContext);