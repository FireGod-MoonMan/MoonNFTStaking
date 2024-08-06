import React, { useState, useEffect } from 'react'
// import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch, useSelector } from "react-redux"
import { updateAccountData, disconnect } from "../../src/store/reducer"
import { ethers } from "ethers"
import { Modal } from "antd"
import Web3Modal from "web3modal"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import networks from "../utils/networksMap.json"
import { ownerAddress } from "../utils/contracts-config.js"
import CustomButton from './CustomButton.js'


const eth = window.ethereum
let web3Modal = new Web3Modal()

const WalletConnect = () => {
    const { utils } = ethers
    const dispatch = useDispatch()
    const data = useSelector((state) => state.blockchain.value)
    console.log('data===============', data)

    const [injectedProvider, setInjectedProvider] = useState();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function fetchAccountData() {
        
        if (typeof window.ethereum !== 'undefined') {
            try {
                const connection = await web3Modal.connect()
                const provider = new ethers.providers.Web3Provider(connection)

                setInjectedProvider(provider);
                const signer = provider.getSigner()
                const chainId = await provider.getNetwork()
                
                const account = await signer.getAddress()
                const balance = await signer.getBalance()
                
                dispatch(updateAccountData(
                    {
                        account: account,
                        balance: utils.formatUnits(balance),
                        network: networks[String(chainId.chainId)]
                    }
                ))
                console.log({
                    account: account,
                    balance: utils.formatUnits(balance),
                    network: networks[String(chainId.chainId)]
                })    
            } catch (error) {
                window.alert(error)    
            }
            
        }
        else {
            console.log("Please install metamask")
            window.alert("Please Install Metamask")
        }
    }

    async function Disconnect() {
        web3Modal.clearCachedProvider();
        if (injectedProvider && injectedProvider.provider && typeof injectedProvider.provider.disconnect == "function") {
            await injectedProvider.provider.disconnect();
            setInjectedProvider(null)
        }
        dispatch(disconnect())
        setShow(false)
    }

    useEffect(() => {
        if (eth) {
            console.log('load =================')
            eth.on('chainChanged', (chainId) => {
                fetchAccountData()
            })
            eth.on('accountsChanged', (accounts) => {
                fetchAccountData()
            })
        }
    }, [])

    const isConnected = data.account ? true : false

    return (

        <>
            {isConnected ? (
                <>
                    <button type="button" className="dark:text-white min-w-[46px] h-[46px] 
                        border-[1px] sm:px-6 cursor-pointer rounded-full hover:border-[#343434] dark:hover:text-white dark:hover:border-white" 
                        aria-label="Connect wallet" data-testid="button-connect-wallet" onClick={handleShow}>
                        <div className='flex items-center justify-center'>
                            <div className="-ml-1 -mr-1 sm:mr-2 md:mr-2 lg:mr-2 xl:mr-2">
                                <img src={`https://cdn.stamp.fyi/avatar/eth:${data.account}?s=40`} 
                                className="rounded-full bg-skin-border object-cover w-[20px] h-[20px]" alt="avatar" />
                            </div>
                            <span className="hidden sm:block">
                                {data.account &&
                                    `${data.account.slice(0, 6)}...${data.account.slice(
                                        data.account.length - 6,
                                        data.account.length
                                )}`}
                            </span>
                        </div>
                    </button>
                    <Modal 
                        title={<span className='text-[24px]'>Wallet Info</span>}
                        open={show} 
                        onCancel={handleClose}
                        footer={ null }
                        style={{ contentBg: 'black'}}
                    >
                        <div className='text-[16px]'>
                            <p> <b>Account</b>: {data.account}</p>
                            <p> <b>Balance</b>: {data.balance && parseFloat(data.balance).toFixed(30)} ETH</p>
                            <p> <b>Network</b>: {data.network}</p>
                        </div>
                        <div className='flex flex-col justify-end gap-x-[20px] sm:flex-row gap-y-2'>
                            {data.account === ownerAddress ? (
                                <a href="/settings" >
                                    <button type="button" className={`tune-button h-[46px] border-[1px] px-6 cursor-pointer rounded-full text-black hover:bg-[#1c1b20] hover:text-white w-full`} 
                                        aria-label="Connect wallet" data-testid="button-connect-wallet" onClick={ () => {} }>
                                        <span >Settings</span>
                                    </button>
                                </a>
                            ) : null}
                            <button type="button" className={`tune-button h-[46px] border-[1px] px-6 cursor-pointer rounded-full text-black hover:bg-[#1c1b20] hover:text-white`} 
                                aria-label="Connect wallet" data-testid="button-connect-wallet" onClick={ () => Disconnect() }>
                                <span>Disconnect</span>
                            </button>
                        </div>
                    </Modal>
                </>
            ) : (
                <div>
                <button type="button" className="tune-button dark:text-white h-[46px] border-[1px] px-6 cursor-pointer rounded-full" 
                    aria-label="Connect wallet" data-testid="button-connect-wallet" onClick={fetchAccountData}>
                    <span className="hidden sm:block">Connect wallet</span>
                    <svg viewBox="0 0 24 24" width="1.2em" height="1.2em" className="-ml-2 -mr-[11px] block align-text-bottom sm:hidden">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="m11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h7a3 3 0 0 1 3 3v1"></path>
                    </svg>
                </button>
                <ConnectButton />
                </div>
            )}
        </>
    )
}

export default WalletConnect;





