
const ImageBox = ({uri}) => {
    return (
        <div className="bg-white w-[250px] h-[250px] flex items-center justify-center"> 
            <img src={`./img/moon${uri}.jpg`} style={{maxHeight: 220}}/>
        </div>
    )
}

export default ImageBox