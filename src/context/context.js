import React, { useState, useContext} from 'react';

const testDimensions = { height: 20, width: 20 }
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [showPlotModal, setShowPlotModal] = useState(false);
    const [showHouseModal, setShowHouseModal] = useState(false);
    const [showServicesModal, setShowServicesModal] = useState(false);
    const [plotDimensions, setPlotDimensions] = useState(null);

    const openPlotModal = () => { setShowPlotModal(true) }
    const closePlotModal = () => { setShowPlotModal(false) }

    const openHouseModal = () => { setShowHouseModal(true) }
    const closeHouseModal = () => { setShowHouseModal(false) }

    const openServicesModal = () => { setShowServicesModal(true) }
    const closeServicesModal = () => { setShowServicesModal(false) }

    const updatePlotDimensions = (height, width) => {
        setPlotDimensions({
            height: parseInt(height),
            width: parseInt(width),
        });
        console.log(plotDimensions);
    }

    return (
        <AppContext.Provider
            value={{
                showHouseModal,
                openHouseModal,
                closeHouseModal,
                showPlotModal,
                openPlotModal,
                closePlotModal,
                showServicesModal,
                openServicesModal,
                closeServicesModal,
                plotDimensions,
                updatePlotDimensions,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider };