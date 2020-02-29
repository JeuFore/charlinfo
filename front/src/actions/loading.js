import React from 'react'
import { RequestStatus } from '../utils/consts'

const loading = () => {
        return (
            <div className="text-center fixed-center">
                <div className="spinner-border" role="status">
                </div>
            </div>
        )
    
}

export default loading