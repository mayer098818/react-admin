type Props = {
  isOpen: boolean
  children: React.ReactNode
  className?: string
}
const Modal: React.FC<Props> = ({ isOpen, children, className }) => {
  if (!isOpen) return null
  return (
    <div className="fixed bg-white inset-0 flex items-center justify-center overflow-y-auto modal z-99999">
      <div className={`${className} relative w-full rounded-3xl bg-white dark:bg-gray-900 `}>{children}</div>
    </div>
  )
}

export default Modal
