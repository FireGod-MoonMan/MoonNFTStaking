
const CustomInput = ({ handleChange, type='text', value}) => {
    return <input 
                type={type} 
                className="border-[1px] border-[#9fa3a7] w-full p-[0.375rem_0.75rem] rounded-[0.25rem] dark:text-white dark:bg-[#1c1b20]" 
                value={value}
                onChange={(e) => handleChange(e)}
            />
}

export default CustomInput