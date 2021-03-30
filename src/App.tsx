import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Providers from './providers/Providers'
import Routes from './navigation/Routes'

const App = () => {
  return (
    <Router>
      <Providers>
        <Routes />
      </Providers>
    </Router>
  );
}

export default App
