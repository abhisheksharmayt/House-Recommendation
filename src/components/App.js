import React, { useState } from 'react'
import PlotOptions from './PlotOptions'
import CreatePlotModal from './CreatePlotModal'
import AddHouseModal from './AddHouseModal'
import AddServicesModal from './AddServicesModal'
import Plot from './Plot'
import { useGlobalContext } from '../context/context'
import HelpModal from './HelpModal'

const App = () => {
  const [showHelpModal, setShowHelpModal] = useState(true);
  const { showHouseModal, showPlotModal, showServicesModal } = useGlobalContext();

  const closeHelpModal = () => setShowHelpModal(false);

  return (
    <div className='relative min-w-screen min-h-screen p-2 py-10 bg-slate-900 flex flex-col items-center'>
      <h1 className='text-center mb-10 main-heading text-lg md:text-2xl lg:text-4xl'>House Recommendation UI</h1>
      {showHelpModal && <HelpModal closeHelpModal={closeHelpModal} />}
      <PlotOptions />
      {showPlotModal && <CreatePlotModal />}
      {showHouseModal && <AddHouseModal />}
      {showServicesModal && <AddServicesModal />}
      <Plot />
    </div>
  )
}

export default App