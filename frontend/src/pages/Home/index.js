import React from "react";
import { Row, Col, Flex, Divider } from "antd";
import CustomButton from "../../components/CustomButton";
const Image = ({uri}) => {
    return (
        <div className="flex rounded-full size-[200px] max-sm:size-[150px] dark:bg-gray-200 items-center justify-center">
            <img src={`./img/${uri}.png`} className="max-h-[170px] max-sm:max-h-[130px]"/>
        </div>
    )
}
const Home = () => {
    const images=[2, 3, 5, 6]
    return (
        <div className="bg-skin-bg relative flex w-screen min-w-0 shrink-0 flex-col sm:w-auto sm:shrink sm:grow max-sm:grow mb-20">
            <div className="m-auto flex flex-col gap-y-10 justify-center items-center">
                <div className="text-[48px] dark:text-white max-sm:text-[32px]">
                    The MoonNFTs
                </div>
                {/* <div className="flex flex-wrap gap-3 items-center justify-center">
                    {images.map((image, idx) => (
                        <Image key={`home_img_${idx+1}`} uri={image}/>
                    ))}
                </div> */}
                <div className="flex text-center items-center text-[24px] max-sm:text-[20px] dark:text-white">
                    Mint, Stake And Earn Rewards With Your MoonNFTs
                </div>
                <div className="flex flex-wrap">
                    <CustomButton title="Mint now" handleClick={() => {window.location.href="/mint"}}/>
                </div>
            </div>
        </div>
    )
}

export default Home