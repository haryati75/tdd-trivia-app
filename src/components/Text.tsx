interface TextProps {
  children: React.ReactNode;
  variant?: 'heading' | 'paragraph';
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  'data-testid'?: string;
}

export default function Text({ children, variant = 'paragraph', level = 2, className, 'data-testid': dataTestId }: TextProps) {
  if (variant === 'heading') {
    switch (level) {
      case 1:
        return <h1 className={className} data-testid={dataTestId}>{children}</h1>;
      case 2:
        return <h2 className={className} data-testid={dataTestId}>{children}</h2>;
      case 3:
        return <h3 className={className} data-testid={dataTestId}>{children}</h3>;
      case 4:
        return <h4 className={className} data-testid={dataTestId}>{children}</h4>;
      case 5:
        return <h5 className={className} data-testid={dataTestId}>{children}</h5>;
      case 6:
        return <h6 className={className} data-testid={dataTestId}>{children}</h6>;
      default:
        return <h2 className={className} data-testid={dataTestId}>{children}</h2>;
    }
  }
  
  return <p className={className} data-testid={dataTestId}>{children}</p>;
}
