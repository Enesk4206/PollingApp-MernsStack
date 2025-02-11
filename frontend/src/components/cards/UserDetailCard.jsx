import React from 'react'

const StatsInfo = ({ label, value }) => {
  return <div className='text-center'>
    <p className='font-medium text-gray-900'>{value}</p>
    <p className='text-xs text-slate-600 mt-[2px]'>{label}</p>
  </div>
}

const UserDetailCard = ({ profileImageUrl, fullName, totalPollsVotes, totalPollsBookmarked, totalPollsCreated, username }) => {
  return (
    <div className='bg-slate-100/50 rounded-lg mt-16 overflow-hidden'>
      <div className='w-full h-32 bg-profile-bg--img bg-cover flex justify-center bg-sky-500 relative'>
        <div className='absolute -bottom-10 rounded-full overflow-hidden border-2 border-blue-500'>
          <img src={profileImageUrl || ""} alt="Profile Image" className='w-20 h-20  bg-slate-400  rounded-full' />
        </div>
      </div>

      <div className='mt-12 px-5'>
        <div className='text-center pt-1'>
          <h5 className='text-lg text-gray-950 font-medium leading-6'>{fullName}</h5>
          <span className='text-[13px] font-medium text-slate-700/60'>@{username}</span>
        </div>
      </div>

      <div className='flex justify-center items-center gap-5 flex-wrap my-6 px-2 '>
        <StatsInfo label="Polls Created" value={totalPollsCreated || 0} />
        <StatsInfo label="Polls Voted" value={totalPollsVotes || 0} />
        <StatsInfo label="Polls Booksmarked" value={totalPollsBookmarked || 0} />
      </div>


    </div>
  )
}

export default UserDetailCard