import { WorkoutsContext } from "../context/Workoutcontext";
import { useContext } from "react";

import React from 'react'

export const useworkoutcontext=()=> {
    const context = useContext(WorkoutsContext)
    if(!context) {
        throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
      }    
    return context
}

