import React from 'react'
import {useDispatch} from "react-redux";

const App = () => {
    const dispatch = useDispatch()

    return (
        <div>
            <button onClick={()=> dispatch({type: 'LOAD_PEOPLE_AND_PLANETS'})}>
                Записать в store людей и планеты
            </button>
        </div>
    )
}

export default App