import { AnimatePresence } from 'framer-motion'
import React from 'react'
import Popup from '../shared/popup'

function Auth() {
  const shouldShowCart = false;
  const handleCart = () => {};
  return (
       <AnimatePresence>
      <Popup
        heading="Your Cart"
        openPopup={shouldShowCart}
        isCart
        closePopup={handleCart}
      ><></>
        
      </Popup>
    </AnimatePresence>
  )
}

export default Auth