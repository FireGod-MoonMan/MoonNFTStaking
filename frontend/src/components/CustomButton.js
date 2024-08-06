import { useState } from "react"
import { ChangeCircleOutlined } from '@mui/icons-material'
import { CircularProgress } from '@mui/material'
const CustomButton = (props) => {
    const { handleClick, title, isLoading=false, px=6 } = props
    return (
        <button type="button" className={`min-w-[46px] h-[46px] bg-violet-700 px-${px} rounded-md hover:bg-[#1c1b20] hover:text-white dark:text-white
         dark:hover:bg-violet-900  ${isLoading ? 'cursor-no-drop' : 'cursor-pointer'}`} 
            aria-label="Connect wallet" data-testid="button-connect-wallet" onClick={ () => handleClick() } disabled={isLoading}>
            {isLoading ? <CircularProgress color="inherit" size={18}/> : <span>{title}</span>}
            {/* <span className="-ml-2 -mr-[11px] block align-text-bottom sm:hidden">
                <ChangeCircleOutlined />
            </span> */}
        </button>
    )
}

export default CustomButton