import PgaeBreadCrum from '../../common/PageBreadCrum'
import { UserMetaCard } from './UserMetaCard'

type Props = {}
export const UserProfiles = ({}: Props) => {
  return (
    <div>
      <PgaeBreadCrum pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">Profiles</h3>
        <UserMetaCard />
      </div>
    </div>
  )
}
