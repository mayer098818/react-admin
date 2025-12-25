type Props = {
  isOpen: boolean
  children: React.ReactNode
  className?: string
}
const Modal: React.FC<Props> = ({ isOpen, children, className }) => {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-y-auto modal z-99999">
      <div className={`${className}`}>{children}</div>
    </div>
  )
}

export default Modal
