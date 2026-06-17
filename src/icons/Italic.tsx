const Italic = ({ 
    size = 8, 
}) => (
    <svg 
        width={size} 
        height={Math.round((size * 19) / 10)} 
        viewBox="0 0 10 19" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="
            group-hover:fill-charcoal-100 fill-grey-200
            smooth cursor-pointer
        "
    >
        <path d="M0 18.5L0.249377 17.2647L2.36908 16.7605L5.41147 2.2395L3.51621 1.7605L3.76559 0.5H10L9.75062 1.7605L7.60599 2.2395L4.56359 16.7605L6.48379 17.2647L6.23441 18.5H0Z" 
        />
    </svg>
)

export default Italic