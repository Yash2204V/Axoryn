import React from 'react'

function Button({
    children,
    type="button",
    bgColor="bg-[#08e6f5]",
    textColor="text-black",
    className="",
    ...props
}) {
    return (
        <button type={type} className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button