import React from 'react'
import StoreOpenInterviewed from './StoreOpenInterviewed'
import StoreOpenCannotInterviewed from './StoreOpenCannotInterviewed'

const StoreOpen = ({ is_interview }) => {
    return (
        is_interview ? (
            <StoreOpenInterviewed />
        ) : (
            <StoreOpenCannotInterviewed />
        )
    )
}

export default StoreOpen