// Mock userStore.js for development purposes
const useUserStore = () => {
    return {
      user: {
        name: "John Doe",
        email: "johndoe@example.com",
        
      },
      loadUser: () => {},
      setUser: () => {},
      logout: () => {}
    };
  };
  
  export default useUserStore;
  