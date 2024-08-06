import { AcUnitOutlined, HomeOutlined, InfoOutlined, SettingsOutlined, Shop2Outlined } from '@mui/icons-material'
import { Tooltip } from 'antd';

const Sidebar = () => {
    // const data = useSelector((state) => state.blockchain.value )
    const btnStyle = "flex w-10 h-10 cursor-pointer select-none items-center justify-center rounded-full border border-gray-400 hover:border-[#343434] dark:hover:text-white dark:hover:border-white";
    
    return <div id="sidebar" className="flex flex-col dark:bg-[#1c1b20] dark:border-[#8b949e] dark:text-[#8b949e]">
        <div className="sticky top-0 z-40 h-screen overflow-hidden bg-skin-bg transition-all sm:w-[60px] max-w-0 sm:max-w-none">
            <div className="no-scrollbar flex h-full flex-col items-end overflow-auto overscroll-contain pb-[12px] border-r border-skin-border">
                <div className="w-full">
                    <div className="flex h-[70px] items-center justify-center cursor-pointer" onClick={() => {window.location.href = "/"}}>
                        <AcUnitOutlined className='text-yellow-500' fontSize='large'/>
                    </div>
                </div>
                <div className="mt-[6px] px-[10px]">
                    <Tooltip placement='right' title="Home">
                        <button 
                            className={btnStyle}
                            onClick={() => {window.location.href = "/"}}
                        >
                            <HomeOutlined />
                        </button>
                    </Tooltip>
                </div>
                <div className="flex w-[60px] items-center justify-center py-[15px]">
                    <div className="h-[1px] w-[20px] bg-[#8b949e]"></div>
                </div>
                <div className="flex flex-col items-center space-y-2 px-[10px]">
                    <Tooltip placement='right' title="Mint page">
                        <button 
                            className={btnStyle}
                            onClick={() => {window.location.href = "/mint"}}
                        >
                            <Shop2Outlined />
                        </button>
                    </Tooltip>
                </div>
                {/* {
                    data.account == ownerAddress && <>
                        <div className="flex w-[60px] items-center justify-center py-[15px]">
                            <div className="h-[1px] w-[20px] bg-[#8b949e]"></div>
                        </div>
                        <div className="flex flex-col items-center space-y-2 px-[10px]">
                            <button 
                                className={btnStyle}
                                onClick={() => {window.location.href = "/settings"}}
                            >
                                <SettingsOutlined />
                            </button>
                        </div>
                    </>
                } */}
            </div>
        </div>
    </div>
}

export default Sidebar