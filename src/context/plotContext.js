import React, { useState, useContext, useEffect} from 'react';
import { useGlobalContext } from './context';

const PlotContext = React.createContext();
let num = 1;

const PlotProvider = ({ children }) => {
    const {plotDimensions} = useGlobalContext();
    const [plot, setPlot] = useState(null);
    const [houses, setHouses] = useState([]);
    const [servicesList, setServicesList] = useState([]);

    const addServices = (row, col, services) => {
        let tempPlot = plot;
        tempPlot[row][col] = {isHouse:false, services}
        setPlot(tempPlot);
        setServicesList([...servicesList, {row, col, services}]);
        console.log(servicesList);
    }

    const addHouse = (row, col)=>{
        let tempPlot = plot;
        tempPlot[row][col] = {isHouse:true, houseNum: num, isRecommended: false, nearByServices:[]};
        setHouses([...houses,{row, col, houseNum: num, isRecommended: false, nearByServices:[]}]);
        setPlot(tempPlot);
        console.log(houses);
        num += 1;
    }

    const calculateScore = ()=>{
        let min_score = Number.MAX_SAFE_INTEGER;
        let housesScore = [];
        for(let h_ind=0; h_ind<houses.length; h_ind++){
            let s_map = new Map();
            for(let s_ind=0; s_ind<servicesList.length; s_ind++){
                const rowDist = Math.abs(houses[h_ind].row - servicesList[s_ind].row);
                const colDist = Math.abs(houses[h_ind].col - servicesList[s_ind].col);
                const currDist = rowDist + colDist;
                servicesList[s_ind].services.forEach((ele)=>{
                    const {name, isPresent} = ele;
                    if(isPresent && s_map.has(name)){
                        if (s_map.get(name) > currDist){
                            s_map.set(name, currDist);
                        }
                    }
                    else if(isPresent){
                        s_map.set(name, currDist);
                    }
                })
            }
            console.log(s_map);
            let score = 0;
            for (const [key, value] of s_map) {
                score+=value;
            }
            housesScore = [...housesScore,{...houses[h_ind],score, nearByServices: s_map}];
            min_score = Math.min(score, min_score);
            console.log(houses[h_ind].houseNum, score);
        }
        console.log("h_scores", housesScore);
        console.log("min_score", min_score);
        recommendHouse(min_score, housesScore);
    }

    const recommendHouse = (min_score, housesScore)=>{
        let tempPlot = plot;

        //first remove all previouse recommend houses if it exists
        houses.forEach((ele)=>{
            const {row, col} = ele;
            tempPlot[row][col].isRecommended = false;
        })

        //update recommend houses based on "min_score"
        housesScore.forEach((ele)=>{
            const {row, col, score, nearByServices} = ele;
            if(score === min_score){
                tempPlot[row][col].isRecommended = true;
                tempPlot[row][col].nearByServices = [...nearByServices];
            }
            
        })
        console.log('tempPlot',tempPlot);
        //update plot
        setPlot([...tempPlot]);
    }

    useEffect(()=>{
        if(plotDimensions){
            let row = plotDimensions.height, col = plotDimensions.width;
            let newPlot = [];
            for(let i=0; i<row; i++){
                newPlot[i] = [];
                for(let j=0; j<col; j++){
                    newPlot[i][j] = null;
                }
            }
            setPlot(newPlot);
        }
    },[plotDimensions])

    return (
        <PlotContext.Provider
            value={{
                plot,
                addHouse,
                addServices,
                calculateScore
            }}
        >
            {children}
        </PlotContext.Provider>
    )
}

const usePlotContext = ()=>{
    return useContext(PlotContext);
}

export {usePlotContext, PlotProvider};