import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import InfoBox from '../../components/InfoBox'
import { ethers } from 'ethers'
import { networkDeployedTo, nftContractAddress, ownerAddress, stakingContractAddress } from "../../utils/contracts-config"
import nftContract from '../../artifacts/MoonNFT.sol/MoonNFT.json'
import stakingContract from '../../artifacts/NFTStaking.sol/NFTStaking.json'
import CustomButton from "../../components/CustomButton"
import CustomInput from "../../components/CustomInput"
import networksMap from "../../utils/networksMap.json";
import ImageBox from "../../components/ImageBox"
import { AddOutlined, RemoveOutlined } from "@mui/icons-material"
import { notification } from "antd"

const Mint = () => {
    const data = useSelector((state) => state.blockchain.value)
    const [info, setInfo] = useState({
        totalSupply: 0,
        mintedCount: 0,
        mintCost: 0,
        maxAmountPerTx: 5,
        myNfts: [],
        myStakedNfts: [],
        myReward: 0,
        paused: 1,
    })
    const alertError = (message, description) => {
        notification.error({
            message: message,
            description: description
        })
    }
    const [reward, setReward] = useState(0)
    const [mintAmount, setMintAmount] = useState(1)
    const [loading, setLoading] = useState(false)
    // web3 relative
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any")
    const signer = provider.getSigner()
    const nft_contract = new ethers.Contract(nftContractAddress, nftContract.abi, provider)
    const owner_nft_contract = new ethers.Contract(nftContractAddress, nftContract.abi, signer)
    const staking_contract = new ethers.Contract(stakingContractAddress, stakingContract.abi, provider)
    const owner_staking_contract = new ethers.Contract(stakingContractAddress, stakingContract.abi, signer)
    const setClearInfo = () => {
        setInfo({
            totalSupply: 0,
            mintedCount: 0,
            mintCost: 0,
            maxAmountPerTx: 5,
            myNfts: [],
            myStakedNfts: [],
            myReward: 0,
            paused: 1,
        })
    }
    async function getInfo() {
        if (data.network == networksMap[networkDeployedTo]) {
            try {
                const user = signer.getAddress()
                const stakedTokens = Array.from(await staking_contract.tokensOfOwner(user), x => Number(x))
                const reward = await staking_contract.getTotalRewardEarned(user)
                setReward(reward)
                let userTokens = Array.from((await nft_contract.tokensOfOwner(user)), x => Number(x))
                const maxMintAmountPerTx = await nft_contract.maxMintAmountPerTx()
                const cost = await nft_contract.cost()
                const totalSupply = await nft_contract.totalSupply()
                const maxSupply = await nft_contract.maxSupply()
                const paused = await nft_contract.callStatic.paused()
                userTokens = userTokens.concat(stakedTokens).sort()
                setInfo({
                    mintedCount: Number(totalSupply),
                    totalSupply: Number(maxSupply),
                    maxAmountPerTx: Number(maxMintAmountPerTx),
                    mintCost: Number(ethers.utils.formatUnits(cost, 'ether')),
                    myNfts: userTokens,
                    myStakedNfts: stakedTokens,
                    myReward: Number(ethers.utils.formatUnits(reward, "ether")),
                    paused: Number(paused)
                })
            } catch (error) {
                alertError(`${data.network} ERROR:`, error.message)
            }
        } else setClearInfo()
    }
    async function handleMint() {
        
        if (data.network == networksMap[networkDeployedTo] && info.paused == 0) {
            try {
                setLoading(true)
                if (data.account === ownerAddress) {
                    const mint_tx = await owner_nft_contract.mint(mintAmount)
                    await mint_tx.wait()
                } else {
                    const totalMintCost = ethers.utils.parseEther(String(info.mintCost * mintAmount), "ether")
                    const mint_tx = await owner_nft_contract.mint(mintAmount, { value: totalMintCost })
                    await mint_tx.wait()
                }
                setLoading(false)
                getInfo()
            } catch (error) {
                setLoading(false)
                alertError(`${data.network} ERROR:`, error.message)
                console.log(error)
            }
        }
    }
    async function handleStake(tokenId) {
        if (data.network === networksMap[networkDeployedTo] && info.paused == 0) {
            try {
                setLoading(true)
                const approve_tx = await owner_nft_contract.approve(stakingContractAddress, tokenId)
                await approve_tx.wait()
                const stack_tx = await owner_staking_contract.stake([tokenId])
                await stack_tx.wait()
                setLoading(false)
                getInfo()
            } catch (error) {
                setLoading(false)
                alertError(`${data.network} ERROR:`, error.message)
                console.log('handleStake Error===', error)
            }
        } else setClearInfo()
    }
    async function handleUnstake(tokenId) {
        if (data.network === networksMap[networkDeployedTo] && info.paused == 0) {
            try {
                setLoading(true)
                const unstack_tx = await owner_staking_contract.unstake([tokenId])
                await unstack_tx.wait()
                setLoading(false)
                getInfo()
            } catch (error) {
                setLoading(false)
                alertError(`${data.network} ERROR:`, error.message)
                console.log(error)
            }
        } else setClearInfo()
    }
    async function handleUnstakeAll() {
        if (data.network === networksMap[networkDeployedTo] && info.paused === 0) {
            try {
                setLoading(true)
                const unstakeAll_tx = await owner_staking_contract.unstake(info.myStakedNfts)
                await unstakeAll_tx.wait()
                setLoading(false)
                getInfo()
            } catch (error) {
                setLoading(false)
                alertError(`${data.network} ERROR:`, error.message)
                console.log(error)
            }
        } else setClearInfo()
    }
    async function handleClaim() {
        if (data.network == networksMap[networkDeployedTo] && info.paused === 0) {
            try {
                setLoading(true)
                const claim_tx = await owner_staking_contract.claim(info.myStakedNfts)
                await claim_tx.wait()
                setLoading(false)
                getInfo()
            } catch (error) {
                setLoading(false)
                alertError(`${data.network} ERROR:`, error.message)
                console.log(error)
            }
        } else setClearInfo()
    }
    useEffect(() => {
        getInfo()
        const interval = setInterval(() => {
            getInfo()
        }, 5000)
        return () => {
            clearInterval(interval)
        }
    }, [data])

    return (
        <div id="container" className="bg-skin-bg relative flex w-screen min-w-0 shrink-0 flex-col sm:w-auto sm:shrink sm:grow max-sm:grow mb-20 mt-10">
            <div id="operate_part" className="flex gap-x-20 gap-y-10 flex-wrap justify-center items-start ">

                <InfoBox key="infobox_1" title="Minting info" data={[
                    { name: 'Total Collection Supply', value: info.totalSupply },
                    { name: 'Minted NFT Count', value: info.mintedCount },
                    { name: 'Mint Cost', value: info.mintCost },
                    // { name: 'Max Mint Amount Per TX', value: info.maxAmountPerTx },
                ]} />


                <InfoBox key="infobox_2" title="Staking Info" data={[
                    { name: 'My NFTs', value: `[${info.myNfts.toString()}]` },
                    { name: 'Items Count', value: info.myNfts.length },
                    { name: 'Items Staked', value: `[${info.myStakedNfts.toString()}]` },
                    { name: 'My Earned Reward', value: info.myReward != 0 ? parseFloat(info.myReward).toFixed(15) : 0, style: 'alert_td' },
                ]} />

            </div>
            <div className="flex justify-center gap-20 mt-20">
                <CustomButton title="MINT" isLoading={loading} handleClick={() => handleMint()} />
                <CustomButton title="Unstake All" handleClick={() => handleUnstakeAll()} isLoading={loading} />
                <CustomButton title="Claim" handleClick={() => handleClaim()} isLoading={loading} />               
                

            </div>
            {info.myNfts.length > 0 &&
                <div id="my_nfts_container" className="flex flex-col gap-y-5 items-center mt-10">
                    <div className="flex text-[20px] sm:text-[24px] dark:text-white">My NFTs</div>
                    <div id="my_nfts" className="flex flex-wrap justify-center gap-5">
                        {info.myNfts.map((nft, idx) => (
                            <div key={`imageboxContainer_${idx + 1}`} className="flex flex-col justify-center gap-y-3">
                                <ImageBox key={`imagebox_${idx + 1}`} uri={nft} />
                                <CustomButton
                                    isLoading={loading}
                                    title={info.myStakedNfts.includes(nft) ? 'UNSTAKE' : 'STAKE'}
                                    handleClick={info.myStakedNfts.includes(nft) ? () => handleUnstake(nft) : () => handleStake(nft)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default Mint