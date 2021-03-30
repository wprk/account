import React from 'react'

import Loading from './Loading'

const FullScreenLoading = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <Loading color="#252f3f" size={50} />
  </div>
)

export default FullScreenLoading
