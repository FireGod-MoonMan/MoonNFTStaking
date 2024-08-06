const circleBtnStyle = (size = 46) => {
    return `flex cursor-pointer select-none items-center justify-center rounded-full border relative w-[${size}px] h-[${size}px] \
                text-[#999a9c] border-gray-400 \
                hover:border-[#343434] hover:text-[#343434] \
                dark:text-gray-400 dark:hover:text-white dark:hover:border-white`
}
const siderBtnStyle = "flex w-10 h-10 cursor-pointer select-none items-center justify-center rounded-full border border-gray-400 hover:border-[#343434] dark:hover:text-white dark:hover:border-white";
const primaryBtnStyle = () => {

    return `flex cursor-pointer select-none items-center justify-center min-w-[46px] h-[46px] bg-violet-700 rounded-md hover:bg-[#1c1b20] hover:text-white dark:text-white px-5
         dark:hover:bg-violet-900 `
}
module.exports = {
    circleBtnStyle,
    primaryBtnStyle,
    siderBtnStyle,
}