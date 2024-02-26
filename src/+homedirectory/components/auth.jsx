// import React from 'react';
// import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// // Example components representing different pages
// const HomePage = () => <div>Home Page</div>;
// const AdminPage = () => <div>Admin Page</div>;
// const LoginPage = () => <div>Login Page</div>;

// // Example authentication logic
// const isAuthenticated = () => {
//   // Implement your authentication logic here, e.g., check if the user is logged in
//   return true; // For demonstration purposes, always return true
// };

// // PrivateRoute component to handle access control
// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       isAuthenticated() ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to="/login" />
//       )
//     }
//   />
// );

// // Main App component
// const App = () => {
//   return (
//     <Router>
//       <Route path="/" exact component={HomePage} />
//       {/* Use PrivateRoute for protected routes */}
//       <PrivateRoute path="/admin" component={AdminPage} />
//       <Route path="/login" component={LoginPage} />
//     </Router>
//   );
// };

// export default App;




// import React from 'react';
// import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// // Example components representing different pages
// const HomePage = () => <div>Home Page</div>;
// const AdminPage = () => <div>Admin Page</div>;
// const ManufacturerPage = () => <div>Manufacturer Page</div>;
// const SysOwnerPage = () => <div>SysOwner Page</div>;
// const LoginPage = () => <div>Login Page</div>;

// // Example authentication logic
// const isAuthenticated = () => {
//   // Implement your authentication logic here, e.g., check if the user is logged in
//   return true; // For demonstration purposes, always return true
// };

// // Example authorization logic based on user role
// const getUserRole = () => {
//   // Implement your logic to get the user role
//   return 'manufacturer'; // For demonstration purposes, always return 'manufacturer'
// };

// // PrivateRoute component to handle access control
// const PrivateRoute = ({ component: Component, role, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       isAuthenticated() && role === getUserRole() ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to="/login" />
//       )
//     }
//   />
// );

// // Main App component
// const App = () => {
//   return (
//     <Router>
//       <Route path="/" exact component={HomePage} />
//       {/* Use PrivateRoute for protected routes */}
//       <PrivateRoute path="/admin" role="sysowner" component={AdminPage} />
//       <PrivateRoute path="/manufacturer" role="manufacturer" component={ManufacturerPage} />
//       <PrivateRoute path="/sysowner" role="sysowner" component={SysOwnerPage} />
//       <Route path="/login" component={LoginPage} />
//     </Router>
//   );
// };

// export default App;

