import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/ui/Toast';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
            <Navbar />
            <main className="grow">
              <AppRoutes />
            </main>
            <Footer />
          </div>
          <ToastProvider />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;