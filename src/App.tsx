import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppLayout } from './layout/AppLayout'
import { Home } from './pages/Home'
import { UserProfiles } from './components/UserProfile/UserProfiles'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function AppRouter() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/profile" element={<UserProfiles />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}
// 将 QueryClient 移到组件外部，避免每次渲染都重新创建
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 默认不在窗口聚焦时重新请求
      refetchOnMount: true, // 组件挂载时重新请求（如果需要最新数据）
      retry: 1, // 默认失败时只重试 1 次
      staleTime: 5 * 60 * 1000 // 默认数据在 5 分钟内视为新鲜
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  )
}

export default App
