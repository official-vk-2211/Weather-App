import { LogOut, CloudSun } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

function Navbar() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <CloudSun size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">
              Weather App
            </h1>

            <p className="text-xs text-slate-500">
              Weather Dashboard
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-800">
              {user?.name}
            </p>

            <p className="text-xs text-slate-500">
              {user?.email}
            </p>
          </div>

          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar  

