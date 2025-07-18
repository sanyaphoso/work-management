// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


import { useEffect } from 'react'
import { supabase } from './lib/supabase'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('users').select('*')
      console.log('Data:', data)
    }

    fetchData()
  }, [])

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 bg-white overflow-auto p-4">
          <div className="text-xl font-bold">🚀 Hello Work Tracker</div>
        </main>
      </div>
    </div>
  )
}

export default App
