import Header from './Header';
import Content from './Content';
import { data } from './fetch_data';
let base_url ="http://localhost:3000/";
function App(){
    return (
        <>
            <Header base_url={base_url}/>
            <Content base_url={base_url} data={data}/>
        </>
    )
}

export default App;