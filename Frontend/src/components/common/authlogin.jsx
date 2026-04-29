import React from 'react'

const authlogin = () => {
    return (
        <div className="relative rounded-t-2xl bg-gradient-to-r from-gray-900 to-pink-500 p-6 text-white">
            <button className="absolute right-4 top-4 text-white text-xl">×</button>
            <div className="flex items-center gap-3">
                <div className="text-3xl">{/*Here logo comes*/}</div>
                <h1 className="text-2xl font-bold">bookMyScreen</h1>
            </div>
            <p className="mt-2 text-sm text-gray-200">
                Where movies meet magic.
            </p>
        </div>
    );
}

export default authlogin


//Yhaa pe sequence mai val krenge bari bari 1st emaail and then otp and then createAcc