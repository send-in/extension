const Redo = ({ 
    size = 18, 
}) => (
    <svg 
        width={size} 
        height={Math.round((size * 36) / 82)}  
        viewBox="0 0 82 36" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="
            group-hover:fill-charcoal-100 group-hover:stroke-charcoal-100 
            fill-grey-200 stroke-grey-200
            smooth 
        "
    >
        <path 
            d="M67.44 14.4C60.04 7.96 50.44 4 39.84 4C21.24 4 5.52 16.12 0 32.88L9.44 36C13.64 23.24 25.64 14 39.84 14C47.64 14 54.76 16.88 60.32 21.52L45.84 36H81.84V0L67.44 14.4Z" 
        />
    </svg>

)

export default Redo