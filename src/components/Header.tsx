const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 shadow-sm">
      
      <div>
        <h1 className="text-2xl font-semibold text-black">Welcome Back, Marci</h1>
        <p className="text-sm text-gray-500">Here is the information about all your orders</p>
      </div>

    
      <div className="flex items-center space-x-4">
      

        
        <div className="flex items-center space-x-2">
          <img
            src="https://i.pravatar.cc/40?img=3" // Заменить на нужный URL
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium text-black">Marci Fumons</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
