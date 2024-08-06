import { useEffect, useState } from "react"
import CustomButton from "../../components/CustomButton"
import CustomInput from '../../components/CustomInput'
import { useSelector } from "react-redux"
import networksMap from "../../utils/networksMap.json"
import nftContract from "../../artifacts/MoonNFT.sol/MoonNFT.json";
import { networkDeployedTo, nftContractAddress, ownerAddress } from "../../utils/contracts-config"
import { ethers } from "ethers"
import { useNavigate } from "react-router"
import { message, notification, Spin } from "antd"


const Settings = () => {
    const data = useSelector((state) => state.blockchain.value)
    let navigate = useNavigate()
    const [appInfo, setAppInfo] = useState({
        nftContractBalance: 0,
        nftContractPaused: 1,
        maxMintAmountPerTx: 5,
        minCost: 0,
    })
    const [loading, setLoading] = useState(false)

    // web3 relative
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    const signer = provider.getSigner()
    const owner_nft_contract = new ethers.Contract(nftContractAddress, nftContract.abi, signer)
    const alertError = (message, description) => {
        notification.error({
            message: message,
            description: description
        })
    }
    const clearInfo = () => {
        setAppInfo({
            nftContractBalance: 0,
            nftContractPaused: 1,
            maxMintAmountPerTx: 5,
            minCost: 0,
        })
    }
    async function getAppInfo() {
        if(data.network == networksMap[networkDeployedTo] && data.account !== ""){
            try {
                setLoading(true)
                const nft_contract = new ethers.Contract(nftContractAddress, nftContract.abi, provider)
                if(ownerAddress != data.account) navigate('/')
                
                const balance = await provider.getBalance(nftContractAddress)
                const isPaused = await nft_contract.callStatic.paused()
                const _fee = await nft_contract.callStatic.cost()
                const _maxMintAmount = await nft_contract.callStatic.maxMintAmountPerTx()
                setAppInfo({
                    nftContractBalance: Number(ethers.utils.formatUnits(balance, "ether")),
                    nftContractPaused: Number(isPaused),
                    maxMintAmountPerTx: _maxMintAmount,
                    minCost: Number(ethers.utils.formatUnits(_fee, "ether"))
                })   
                setLoading(false)

            } catch (error) {
                setLoading(false)
                alertError(`${data.network} ERROR:`, error.message)
            }
        } else clearInfo()
    }
    async function handleWithdraw() {
        if(data.network == networksMap[networkDeployedTo]){
            try {
                setLoading(true)
                const change_tx = await owner_nft_contract.withdraw()
                await change_tx.wait()
                setLoading(false)
                window.location.reload()
            }catch(error){
                setLoading(false)
                alertError(`${data.network} ERROR:`, error.message)
            }
        } else clearInfo()
    }
    async function changeMaxNftPerTx() {
        if(data.network == networksMap[networkDeployedTo]){
            try{
                setLoading(true)
                const change_tx = await owner_nft_contract.setMaxMintAmountPerTx(appInfo.maxMintAmountPerTx)
                await change_tx.wait()
                setLoading(false)
                window.location.reload()
            }catch(error){
                setLoading(false)
                alertError(`${data.network} ERROR:`, error.message)
                console.log(error)
            }
        } else clearInfo()
    }
    async function changeMinCost() {
        if(data.network == networksMap[networkDeployedTo]){
            try {
                setLoading(true)
                const change_tx = await owner_nft_contract.setCost(
                    ethers.utils.parseEther(String(appInfo.minCost), 'ether')
                )
                await change_tx.wait()
                setLoading(false)
                window.location.reload()
            } catch (error) {
                setLoading(false)
                alertError(`${data.network} ERROR:`, error.message)
                console.log(error)
            }
        } else clearInfo()
    }
    async function changeContractState(){
        if(data.network == networksMap[networkDeployedTo]) {
            try {
                setLoading(true)
                const change_state_tx = appInfo.nftContractPaused == 1 ? await owner_nft_contract.pause(0) : await owner_nft_contract.pause(1)
                await change_state_tx.wait(1)
                setLoading(true)
                window.location.reload()
            } catch (error) {
                setLoading(false)
                alertError(`${data.network} ERROR:`, error.message)
                console.log(error)
            }
        } else clearInfo()
    }

    useEffect(() => {
        if(window.ethereum !== undefined) {
            getAppInfo()
        }
    }, [data])

    return (
        <Spin spinning={loading} size="large">
            <div className="flex flex-col justify-center items-center py-10 gap-y-5">
                <div className="dark:text-white text-[24px] font-bold font-['inter'] pb-10">
                    Owner Settings
                </div>
                <div className="flex flex-col gap-y-5 justify-between ">
                    <div className="flex justify-between gap-x-5">
                        <div className="flex flex-col dark:text-white w-full">
                            <span>Current contract balance</span>
                            <span>{appInfo.nftContractBalance.toFixed(20) }ETH</span>
                        </div>
                        <div className="m-auto">
                            <CustomButton handleClick={handleWithdraw} isLoading={false} title="withdraw" dark={true}/>
                        </div>
                    </div>
                    {/* <div className="flex justify-between gap-x-5 items-end">
                        <div className="flex flex-col dark:text-white gap-y-2 w-full">
                            <span>Max NFT minted per transaction :</span>
                            <span>
                                <CustomInput type="number" 
                                            value={appInfo.maxMintAmountPerTx} 
                                            handleChange={(e) => setAppInfo({...appInfo, maxMintAmountPerTx: e.target.value})}
                                />
                            </span>
                        </div>
                        <div><CustomButton handleClick={changeMaxNftPerTx} isLoading={false} title="Change" dark={true}/></div>
                    </div> */}
                    <div className="flex gap-x-5 justify-between items-end">
                        <div className="flex flex-col dark:text-white gap-y-2 w-full">
                            <span>NFT mint cost (ETH) :</span>
                            <span>
                            <CustomInput type="number" value={appInfo.minCost} handleChange={(e) => setAppInfo({...appInfo, minCost: e.target.value})}/>
                            </span>
                        </div>
                        <div><CustomButton handleClick={changeMinCost} isLoading={false} title="Change" dark={true}/></div>
                    </div>
                    <div className="flex gap-x-5 justify-between items-center pt-5">
                        <div className="flex flex-col dark:text-white gap-y-2">
                            <div>Nft Contract : {appInfo.nftContractPaused == 0 ? 
                                <span className="px-3 py-1 bg-green-600 rounded-full"> active</span> : 
                                <span className="px-3 py-1 bg-yellow-600 rounded-full"> paused </span>} 
                            </div>
                        </div>
                        <CustomButton handleClick={changeContractState} isLoading={false} title="Change" dark={true}/>
                    </div>
                </div>
            </div>
        </Spin>
    )
}

export default Settings