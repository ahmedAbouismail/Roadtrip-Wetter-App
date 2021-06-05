import './App.css';
import {useState} from 'react';
import RouteEingeben from './components/RouteForm/routeForm'


function ListRoute({route}) {
  return(
    <div>
      <h3>{route.country}</h3>
      <h3>{route.city}</h3>
    </div>
  )
}
function App() {

  const [forms, setform] = useState(<RouteEingeben/>)

 
  function addOne(form) {
    setform([...forms], {country: "", city: ""});
  }
  
  return (
        <RouteEingeben />
    
    // <div className="App">
    //   <body>
    //     <nav>
    //       <h1>Navbar</h1>
    //     </nav>
    //     <main>
    //       <h1>Main</h1>
    //     </main>
    //   </body>
    //   <footer>
    //       <h1>Footer</h1>
    //   </footer>
    // </div>
  );
}

export default App;
