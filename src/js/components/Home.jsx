import React from "react";
import { useEffect,useState } from "react";


//create your first component
const Home = () => {

	
	const [data, setData] = useState("");
	const [id, setId] = useState("");
	const [store, setStore] = useState([]);

	const getDataFunction = async () => {
		try{
			const getFectch = await fetch("https://playground.4geeks.com/todo/users");
			const getData = await getFectch.json();
				setStore(getData.users)

		}catch(error){
			console.log(error)
		}
	}



	useEffect(() => {
		getDataFunction();
	}, []);


	return (
		<div>
			<h1 className="text-center p-3">My TodoList with React & Fetch</h1>
			<table className="justificado">
				<thead>
					<tr>
						<th>id</th>
						<th>name</th>
						<th>actions</th>
					</tr>
				
				</thead>
				<tbody>
					{store.map(el => <tr key={el.id}><td>{el.id}</td><td>{el.name}</td><td><button>Modificar</button><button>Borrar</button></td></tr>)}
					<tr><td></td><td><input type="text" placeholder="your name"></input></td><td><button>Crear</button></td></tr>
				</tbody>
			</table>
		</div>
	);
};

export default Home;