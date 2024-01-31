export default function HomePage({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <title>WhatThinksAI</title> 
        <body>
    <div className='flex flex-row h-full w-full'>
      <div>
      </div>
      <div className='w-full'>
        {children}
      </div>
    </div>
  </body>
      </html>
    )
  }
  