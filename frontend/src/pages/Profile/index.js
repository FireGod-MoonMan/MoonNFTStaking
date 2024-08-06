import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { tokenContractAddress } from "../../utils/contracts-config"
import tokenContract from '../../artifacts/MoonToken.sol/MoonToken.json'
import { networkDeployedTo, nftContractAddress, ownerAddress, stakingContractAddress } from "../../utils/contracts-config"
import networksMap from "../../utils/networksMap.json";
import { notification, Spin } from "antd"

const Profile = () => {
    const [info, setInfo] = useState({
        token_balance: 0,
        balance: 0
    })
    const [loading, setLoading] = useState(false)
    const data = useSelector((state) => state.blockchain.value)
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    const token_contract = new ethers.Contract(tokenContractAddress, tokenContract.abi, provider)
    
    const clearInfo = () => {
        setInfo({
            token_balance: 0,
            balance: 0
        })
    }
    const alertError = (message, description) => {
        notification.error({
            message: message,
            description: description
        })
    }
    async function appInfo () {
        if(data.network == networksMap[networkDeployedTo] & data.account != ''){
            try {
                setLoading(true)
                const token_balance = await token_contract.balanceOf(data.account);
                const balance = data.balance;
                setInfo({
                    token_balance: ethers.utils.formatEther(token_balance, 'ether'),
                    balance: balance
                })
                setLoading(false)
            } catch (error) {
                setLoading(false)
                alertError(`${data.network} ERROR:`, error.message)
            }
        } else clearInfo()
    }
    useEffect(() => {
        appInfo()
    }, [data])
    return (
        <Spin spinning={loading} size="large">
            <div className="m-auto py-10 dark:text-white w-full justify-center flex">
                <div className="flex flex-col justify-center items-center gap-y-5">
                    <div className='text-5xl text-white mb-3'>Wallet Info</div>
                    <div className="flex gap-x-5 text-[16px] sm:text-[20px]">
                        <span> Balance: </span>
                        <span> {info.balance} </span>
                    </div>
                    <div className="flex gap-x-5 text-[16px] sm:text-[20px]">
                        <span> MoonToken balance: </span>
                        <span> {parseFloat(info.token_balance).toFixed(4)} </span>
                    </div>
                </div>
            </div>
        </Spin>
    )
}
export default Profile