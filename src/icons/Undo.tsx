const Undo = ({ 
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
            fill-grey-200 stroke-grey-200 smooth 
        "
    >
        <path
            d="M42 4C31.4 4 21.8 7.96 14.4 14.4L0 0V36H36L21.52 21.52C27.08 16.88 34.16 14 42 14C56.16 14 68.2 23.24 72.4 36L81.88 32.88C76.32 16.12 60.6 4 42 4Z"
        />
    </svg>

)

export default Undo