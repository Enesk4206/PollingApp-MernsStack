import React, { useContext } from 'react'
import Navbar from './Navbar'
import SideMenu from './SideMenu'
import { UserContext } from '../../context/UserProvider'
import UserDetailCard from '../cards/UserDetailCard'
const DashboardLayout = ({ children, activeMenu }) => {

    const { user } = useContext(UserContext)
    return (
        <div>
            <Navbar activeMenu={activeMenu } />

            {user && (<div className='flex'>
                <div className='max-[1080px]:hidden'>
                    <SideMenu activeMenu={activeMenu} />
                </div>
                <div className='grow mx-5'>{children}</div>

                <div className='hidden md:block mr-5'>
                    <UserDetailCard
                        profileImageUrl={user && user.profileImageUrl}
                        fullName={user && user.fullName}
                        totalPollsVotes={user && user.totalPollsVotes}
                        totalPollsCreated={user && user.totalPollsCreated}
                        totalPollsBookmarked={user && user.totalPollsBookmarked}
                        username={user && user.username}
                    />
                </div>
            </div>)}
        </div>
    )
}

export default DashboardLayout