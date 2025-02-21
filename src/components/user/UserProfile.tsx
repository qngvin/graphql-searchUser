import { GET_USER } from '@/queries'
import { UserData } from '@/types'
import { useQuery } from '@apollo/client'
import UserCard from './UserCard'
import StatsContainer from './StatsContainer'
import ForkedRepos from '../charts/ForkedRepos'
import PopularRepos from '../charts/PopularRepos'
import UsedLanguages from '../charts/UsedLanguages'
import Loading from './Loading'

type UserProfileProps = {
  userName: string
}
const UserProfile = ({ userName }: UserProfileProps) => {
  const { data, loading, error } = useQuery<UserData>(GET_USER, {
    variables: { login: userName }
  })
  if (loading) return <Loading />
  if (error) return <h2 className='text-2xl'>{error.message}</h2>
  if (!data) return <h2 className='text-2xl'>User not found</h2>
  return (
    <div>
      <UserCard avatarUrl={data.user.avatarUrl} name={data.user.name} bio={data.user.bio} url={data.user.url} />
      <StatsContainer
        totalRepos={data.user.repositories.totalCount}
        followers={data.user.followers.totalCount}
        following={data.user.following.totalCount}
        gists={data.user.gists.totalCount}
      />
      {data.user.repositories.totalCount > 0 && (
        <div className='grid md:grid-cols-2 gap-4'>
          <ForkedRepos repositories={data.user.repositories.nodes} />
          <PopularRepos repositories={data.user.repositories.nodes} />
          <UsedLanguages repositories={data.user.repositories.nodes} />
        </div>
      )}
    </div>
  )
}

export default UserProfile
