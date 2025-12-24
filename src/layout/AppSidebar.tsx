import { useState } from 'react'
import { useSidebar } from '../context/SideBarContext'
import { BoxCubeIcon, CalenderIcon, ChevronDownIcon, GridIcon, HorizontaLDots, ListIcon, PageIcon, PieChartIcon, PlugInIcon, TableIcon, UserCircleIcon } from '../icons'
import { Link } from 'react-router-dom'

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
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar()
  const [openSubmenu, setOpenSubmenu] = useState<{
    type: 'main' | 'others'
    index: number
  } | null>(null)
  const renderMenuItems = (items: NavItem[], menuType: 'main' | 'others') => (
    <ul>
      {items.map((nav, index) => (
        <li key={index}>
          {nav.subItems ? (
            <button className={`menu-item group ${openSubmenu?.type === menuType && openSubmenu?.index === index ? 'menu-item-active' : 'menu-item-inactive'} cursor-pointer ${!isExpanded && !isHovered ? 'lg:justify-center' : 'lg:justify-start'}`}>
              <span className={`menu-item-icon-size  ${openSubmenu?.type === menuType && openSubmenu?.index === index ? 'menu-item-icon-active' : 'menu-item-icon-inactive'}`}>{nav.icon}</span>
              {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{nav.name}</span>}
              {(isExpanded || isHovered || isMobileOpen) && <ChevronDownIcon className={`ml-auto w-5 h-5 transition-transform duration-200 ${openSubmenu?.type === menuType && openSubmenu?.index === index ? 'rotate-180 text-brand-500' : ''}`} />}
            </button>
          ) : (
            nav.path &&
            // <Link to={nav.path} className={`menu-item group ${isActive(nav.path) ? 'menu-item-active' : 'menu-item-inactive'}`}>
            //   <span className={`menu-item-icon-size ${isActive(nav.path) ? 'menu-item-icon-active' : 'menu-item-icon-inactive'}`}>{nav.icon}</span>
            //   {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{nav.name}</span>}
            // </Link>
            22
          )}
        </li>
      ))}
    </ul>
  )
  return (
    <div>
      {renderMenuItems(navItems, 'main')}
      <Link to="/userProfiles">UserProfiles</Link>
    </div>
  )
}
