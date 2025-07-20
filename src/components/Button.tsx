interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  'data-testid'?: string;
}

export default function Button({ children, onClick, disabled = false, 'data-testid': dataTestId }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} data-testid={dataTestId}>
      {children}
    </button>
  )
}