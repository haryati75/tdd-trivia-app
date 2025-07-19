interface FooterProps {
  className?: string
}

export default function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const footerClassName = className ? `footer ${className}` : 'footer'
  
  return (
    <footer className={footerClassName}>
      <p>
        Developed by <strong>Haryati Hassan</strong> • © {currentYear} • 
        <a 
          href="https://github.com/haryati75/tdd-trivia-app" 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-link"
        >
          View on GitHub
        </a>
      </p>
    </footer>
  )
}
