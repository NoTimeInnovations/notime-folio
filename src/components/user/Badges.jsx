import React from 'react'

const Badges=({userData})=>{
    
    return(<>
          <section className="mt-10">
        <h2 className="text-3xl font-semibold">Badges Earned</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {userData.badges.map((badge) => (
            <div
              key={badge.id}
              className="flex items-center space-x-2 bg-gray-800 p-3 rounded"
            >
              <span className="text-3xl">{badge.icon}</span>
              <span className="text-xl">{badge.title}</span>
            </div>
          ))}
        </div>
      </section>
    </>)
}


export default Badges;