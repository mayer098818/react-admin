import { createContext, useContext, useState } from 'react'
type Props = {
  children: React.ReactNode
}
type SidebarContextType = {
  isExpanded: boolean
  isMobileOpen: boolean
  isHovered: boolean
  activeItem: string | null
  openSubmenu: string | null
  toggleSidebar: () => void
  toggleMobileSidebar: () => void
  setIsHovered: (isHovered: boolean) => void
  setActiveItem: (item: string | null) => void
  toggleSubmenu: (item: string) => void
}
const SidebarContext = createContext(null)
export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}
export const SideBarProvider: React.FC<Props> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  // value传入需要再包裹一层
  return <SidebarContext.Provider value={{ isExpanded, isHovered, isMobileOpen }}>{children}</SidebarContext.Provider>
}
