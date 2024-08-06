
const InfoBox = ({ title, data, }) => {

    return (
        <div className="flex flex-col items-center">
            <div id="title" className="text-[24px] dark:text-white pb-5">{title}</div>
            <div id="info_table">
                <table className="dark:text-white w-full">
                    <tbody>
                        {data.map((item, idx) => (
                            <tr key={`tr_${idx}`}>
                                <td className="py-2 sm:px-2 md:px-10 border-[1px] border-gray-300">{item.name}</td>
                                <td className={`${item.style} sm:px-2 md:px-10 py-2 border-[1px] border-gray-300`}>{item.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default InfoBox