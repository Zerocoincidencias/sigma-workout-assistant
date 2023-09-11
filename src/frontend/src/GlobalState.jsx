import React, { createContext, useState } from 'react';
import { callCloudFunction } from './firebase';

// Create the initial context
export const AppContext = createContext();

// Create the provider component
export const GlobalState = ({ children }) => {
 
  const [DadosHistoricos, setDadosHistoricos] = useState([]);
  
  const callDados = () => {
    console.log("Chamou CloudFunction")
    callCloudFunction((data) => {
      setDadosHistoricos(data);
      console.log('Response from Cloud Function1:', data);
      console.log('Response energy:', data[0]);
      console.log('Response OEE:', data[1]);
    }, "BzYH8GdnP7PHQvJuMQ9YDeBf2lz1", "canvão", "Celula 1"); 

    callCloudFunction((data) => {
      setDadosHistoricos(data);
      console.log('Response from Cloud Function2:', data);
    }, "BzYH8GdnP7PHQvJuMQ9YDeBf2lz1", "canvão", "Celula 1"); 

    callCloudFunction((data) => {
      setDadosHistoricos(data);
      console.log('Response from Cloud Function3:', data);
    }, "BzYH8GdnP7PHQvJuMQ9YDeBf2lz1", "canvão", "Celula 1"); 
  }

/*   useEffect(() => {
      callDados(); // Call the function initially
      const interval = setInterval(callDados, 60000); // Call the function every 1 minute
    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []); */

  // Make the state and update functions accessible to the components
  const state = { DadosHistoricos };
  const actions = { callDados  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};
