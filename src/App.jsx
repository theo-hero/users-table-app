import './styles/App.css'
import UserTable from './components/table/UserTable'
import { ErrorProvider } from './context/ErrorContext'
import ErrorModal from './components/modals/ErrorModal'

function MainPage() {

  return (
    <>
      <ErrorModal />
      <UserTable />
    </>
  )
}

function App() {
  return (
    <ErrorProvider>
      <MainPage />
    </ErrorProvider>
  )
}

export default App
