import { forwardRef, useId } from 'react'

const Input = forwardRef(function Input({
    label, 
    type = "text",
    className = "",
    ...props
}, ref) {

    const id = useId();

    return (
        <div className='w-full flex flex-col'>
            {label && <label htmlFor={id} className="mb-1 inline-block text-gray-300">
                {label}
            </label>}
            
            <input
                id={id}
                type={type}
                {...props}
                className={`mb-4 rounded-lg border bg-transparent px-3 py-2 ${className}`}
                ref={ref} />
        </div>
    )
})

export default Input