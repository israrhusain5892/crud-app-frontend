import Nav from './Nav';
import Dashboard from './Dashboard';

const Home=()=>{
    
     return(
        <div
           style={{
              background:'white',
              height:'100%',
              position:'absolute',
              width:'100%',
              marginRight:'0px',
              right:0

           }}
        
        >
            <Nav></Nav>
            <Dashboard/>

      </div>
        
      
      
     )
}
export default Home;
