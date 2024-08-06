import { GitHub } from "@mui/icons-material";
import { useState, useEffect, } from "react";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from 'react-scroll';

const Footer = () => {
  return (
    <footer className="absolute left-0 flex w-full dark:text-white justify-between px-3 pb-2 bottom-0">
      {/* <div>AntNFT© All Right Reserved</div>
      <div>
        <GitHub />
      </div> */}
    </footer>
  )
}

export default Footer