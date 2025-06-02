import { QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { queryClient } from "./api/queryClient";
import { Account } from "./components/Account/Account";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <Account />
      </div>
    </QueryClientProvider>
  );
}

export default App;
