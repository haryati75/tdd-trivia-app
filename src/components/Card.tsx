import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  'data-testid'?: string
}

export default function Card({ children, className, 'data-testid': dataTestId }: CardProps) {
  const cardClassName = className ? `card ${className}` : 'card'
  
  return (
    <div className={cardClassName} data-testid={dataTestId}>
      {children}
    </div>
  )
}
