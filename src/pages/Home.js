import { useState } from "react";

import AddTransaction from "./AddTransaction";


export default function Home() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-2xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8 border border-blue-200">
        <h1 className="text-3xl font-extrabold text-blue-700 text-center mb-6 tracking-tight">
          💰 Personal Finance Tracker
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Track your income and expenses easily and visually.
        </p>
    
      <AddTransaction onSuccess={() => setRefresh(!refresh)} />
          <hr className="my-4" />
     
    </div>
      <footer className="text-center mt-10 text-gray-500 text-sm">
        Made with ❤️ using React & Spring Boot
      </footer>
    </div>
  );
}
