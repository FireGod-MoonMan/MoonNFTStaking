import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import RainBowConnect from "../components/RainBowConnect";
import { CloseOutlined, HomeOutlined, InfoOutlined, KeyboardBackspaceOutlined, MenuOutlined, MoreHorizOutlined, SettingsOutlined, Shop2Outlined } from "@mui/icons-material";
import { circleBtnStyle, siderBtnStyle } from "../components/ThemeStyle";
import { useSelector } from "react-redux";
import { ownerAddress } from "../utils/contracts-config";
import CustomButton from "../components/CustomButton";

const Header = () => {
  // const data = useSelector((state) => state.blockchain.value )
  const NavRef = useRef(null);
  const handleNavClose = () => {
    let display = NavRef.current.style.display
    if (display == 'none') NavRef.current.style.display = 'block'
    else NavRef.current.style.display = 'none'
  }
  return (
    <>
      <div id="navbar" className="sticky top-0 z-40 border-b border-skin-border bg-blue-800 py-3">
        <div className="px-3 sm:px-4">
          <div className="flex items-center py-[12px]">
            <div className="flex flex-auto items-center dark:text-white">
              <div className="group block sm:hidden">
                <button
                  className={`${circleBtnStyle()}`}
                  onClick={() => { handleNavClose() }}
                >
                  <svg viewBox="0 0 24 24" width="1.2em" height="1.2em" className="text-skin-link">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div
                  id="nav-hide"
                  className="absolute top-0 left-0 border-gray-500 w-full hidden sm:block" style={{ display: 'none' }}
                  ref={NavRef}
                >
                  <div className="py-5 flex flex-col items-center gap-y-10 transition-all duration-500
                  border-r-[1px] border-gray-600 bg-[#1c1b20] w-[60px]
                  h-screen">
                    <div onClick={() => handleNavClose()} className={siderBtnStyle}>
                      <KeyboardBackspaceOutlined />
                    </div>
                    <div>
                      <div className="mt-[6px] px-[10px]">
                        <button
                          className={siderBtnStyle}
                          onClick={() => { window.location.href = "/" }}
                        >
                          <HomeOutlined />
                        </button>
                      </div>
                      <div className="flex w-[60px] items-center justify-center py-[15px]">
                        <div className="h-[1px] w-[20px] bg-[#8b949e]"></div>
                      </div>
                      <div className="flex flex-col items-center space-y-2 px-[10px]">
                        <button
                          className={siderBtnStyle}
                          onClick={() => { window.location.href = "/mint" }}
                        >
                          <Shop2Outlined />
                        </button>
                      </div>
                      {/* {
                            data.account == ownerAddress && <>
                                <div className="flex w-[60px] items-center justify-center py-[15px]">
                                    <div className="h-[1px] w-[20px] bg-[#8b949e]"></div>
                                </div>
                                <div className="flex flex-col items-center space-y-2 px-[10px]">
                                    <button 
                                        className={siderBtnStyle}
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
              </div>
              <div className="flex justify-start gap-3 items-center">
                <CustomButton title="Home" handleClick={() => { window.location.href = "/" }} />
                <img src="./img/download.jfif" className="w-8 h-8"></img>
                <a href="#/" className="router-link-active router-link-exact-active hidden font-bold items-center sm:block text-[20px]" aria-current="page">
                  Moon NFT stacking
                </a>


              </div>
            </div>

            <div className="flex space-x-2">
              <div>
                <div className="hidden sm:block">
                  <RainBowConnect />
                </div>
                <div className="block sm:hidden group">
                  <div className={`${circleBtnStyle()}`}><MoreHorizOutlined /></div>
                  <div className="group-hover:block hidden top-[58px] right-[17px] absolute">
                    <div className="mt-1 p-5 border border-gray-500 bg-[#1c1b20] rounded-[15px]">
                      <RainBowConnect />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header