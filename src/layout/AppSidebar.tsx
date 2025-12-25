import { useEffect, useRef, useState } from 'react'
import { useSidebar } from '../context/SideBarContext'
import { BoxCubeIcon, CalenderIcon, ChevronDownIcon, GridIcon, HorizontaLDots, ListIcon, PageIcon, PieChartIcon, PlugInIcon, TableIcon, UserCircleIcon } from '../icons'
import { Link, useLocation } from 'react-router-dom'

type Props = {}
type SubItems = {
  name: string
  path: string
  pro: boolean
}
type NavItem = {
  icon: React.ReactNode
  name: string
  subItems?: SubItems[]
  path?: string
}
const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: 'Dashboard',
    subItems: [{ name: 'Ecommerce', path: '/', pro: false }]
  },
  {
    icon: <CalenderIcon />,
    name: 'Calendar',
    path: '/calendar'
  },
  {
    icon: <UserCircleIcon />,
    name: 'User Profile',
    path: '/profile'
  },
  {
    name: 'Forms',
    icon: <ListIcon />,
    subItems: [{ name: 'Form Elements', path: '/form-elements', pro: false }]
  },
  {
    name: 'Tables',
    icon: <TableIcon />,
    subItems: [{ name: 'Basic Tables', path: '/basic-tables', pro: false }]
  },
  {
    name: 'Pages',
    icon: <PageIcon />,
    subItems: [
      { name: 'Blank Page', path: '/blank', pro: false },
      { name: '404 Error', path: '/error-404', pro: false }
    ]
  }
]

const othersItems: NavItem[] = [
  {
    icon: <PieChartIcon />,
    name: 'Charts',
    subItems: [
      { name: 'Line Chart', path: '/line-chart', pro: false },
      { name: 'Bar Chart', path: '/bar-chart', pro: false }
    ]
  },
  {
    icon: <BoxCubeIcon />,
    name: 'UI Elements',
    subItems: [
      { name: 'Alerts', path: '/alerts', pro: false },
      { name: 'Avatar', path: '/avatars', pro: false },
      { name: 'Badge', path: '/badge', pro: false },
      { name: 'Buttons', path: '/buttons', pro: false },
      { name: 'Images', path: '/images', pro: false },
      { name: 'Videos', path: '/videos', pro: false }
    ]
  },
  {
    icon: <PlugInIcon />,
    name: 'Authentication',
    subItems: [
      { name: 'Sign In', path: '/signin', pro: false },
      { name: 'Sign Up', path: '/signup', pro: false }
    ]
  }
]
export const AppSidebar: React.FC<Props> = ({}) => {
  const location = useLocation()

  // isExpand是宽度的表示，默认是expand
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar()
  const [openSubmenu, setOpenSubmenu] = useState<{
    type: 'main' | 'others'
    index: number
  } | null>(null)
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({})
  // 取目前element的ref
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const isActive = (pathname: string) => pathname === location.pathname

  const handleSubmenuToggle = (menuType: 'main' | 'others', index: number) => {
    // 如果点击一样的不变化
    // if (openSubmenu?.type === menuType && openSubmenu?.index === index) return null
    setOpenSubmenu(prev => {
      if (prev && prev.type === menuType && prev?.index === index) return null
      return { type: menuType, index }
    })
  }
  // 根据是否点击子菜单来动态设置second layout of sidebar的高度
  useEffect(() => {
    if (openSubmenu) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`
      console.log(subMenuRefs.current[key], 'subMenuRefs.current[key]')
      if (subMenuRefs.current[key]) {
        setSubMenuHeight(prevHeight => ({
          ...prevHeight,
          // 加[]的意思是把key这个变量的值作为key传入
          [key]: subMenuRefs.current[key]?.scrollHeight || 0
        }))
      }
    }
  }, [openSubmenu])
  const renderMenuItems = (items: NavItem[], menuType: 'main' | 'others') => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={index}>
          {/* first layout  */}
          {nav.subItems ? (
            <button className={`menu-item group ${openSubmenu?.type === menuType && openSubmenu?.index === index ? 'menu-item-active' : 'menu-item-inactive'} cursor-pointer ${!isExpanded && !isHovered ? 'lg:justify-center' : 'lg:justify-start'}`} onClick={() => handleSubmenuToggle(menuType, index)}>
              <span className={`menu-item-icon-size  ${openSubmenu?.type === menuType && openSubmenu?.index === index ? 'menu-item-icon-active' : 'menu-item-icon-inactive'}`}>{nav.icon}</span>
              {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{nav.name}</span>}
              {(isExpanded || isHovered || isMobileOpen) && <ChevronDownIcon className={`ml-auto w-5 h-5 transition-transform duration-200 ${openSubmenu?.type === menuType && openSubmenu?.index === index ? 'rotate-180 text-brand-500' : ''}`} />}
            </button>
          ) : (
            nav.path && (
              <Link to={nav.path} className={`menu-item group ${isActive(nav.path) ? 'menu-item-active' : 'menu-item-inactive'}`}>
                <span className={`menu-item-icon-size ${isActive(nav.path) ? 'menu-item-icon-active' : 'menu-item-icon-inactive'}`}>{nav.icon}</span>
                {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{nav.name}</span>}
              </Link>
            )
          )}
          {/* second layout of sidebar */}
          {nav.subItems && (isExpanded || isHovered) && (
            <div
              ref={el => {
                subMenuRefs.current[`${menuType}-${index}`] = el
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height: openSubmenu?.type === menuType && openSubmenu?.index === index ? `${subMenuHeight[`${menuType}-${index}`]}px` : '0px'
              }}>
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map(subItem => (
                  <li key={subItem.name}>
                    <Link to={subItem.path} className={`menu-dropdown-item ${isActive(subItem.path) ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}>
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
  return (
    <aside className="mx-5 fixed" onMouseEnter={() => !isExpanded && setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className={`py-8 flex ${!isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'}`}>
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img className="dark:hidden" src="/images/logo/logo.svg" alt="Logo" width={150} height={40} />
              <img className="hidden dark:block" src="/images/logo/logo-dark.svg" alt="Logo" width={150} height={40} />
            </>
          ) : (
            <img src="/images/logo/logo-icon.svg" alt="Logo" width={32} height={32} />
          )}
        </Link>
      </div>
      <nav className="mb-6">
        <div className="flex flex-col gap-3">
          <div>
            <h2 className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'}`}>{isExpanded || isHovered || isMobileOpen ? 'Menu' : <HorizontaLDots className="size-6" />}</h2>
            {renderMenuItems(navItems, 'main')}
          </div>
          <div className="">
            <h2 className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'}`}>{isExpanded || isHovered || isMobileOpen ? 'Others' : <HorizontaLDots />}</h2>
            {renderMenuItems(othersItems, 'others')}
          </div>
        </div>
      </nav>
    </aside>
  )
}
