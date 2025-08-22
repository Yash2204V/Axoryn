import React from 'react'

function Logo({
    width = 16
}) {
  return (
    <div className={`mx-auto inline-block w-${width}`}>
        <img src="/images/axoryn.png" alt="logo" />
    </div>
  )
}

export default Logo