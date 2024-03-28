import React from 'react'

const Button = ({index,value,Icon}) => {
  return (
    <>
        <a
            key={index}
            href={value.url}
            className="btn border-gray-300 hover:border-neutral-400 text-gray-500 flex mr-5 py-1"
        >
          {Icon && <Icon/>}
            <span>{value.title}</span>
        </a>
    </>
  )
}

export default Button;
