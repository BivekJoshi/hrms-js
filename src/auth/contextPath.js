const contextPath = () => {
    return window.location.pathname.substring(
      0,
      window.location.pathname.indexOf("/", 2)
    );
  };
  
  export default contextPath;