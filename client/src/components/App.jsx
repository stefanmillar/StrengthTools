import React from 'react';
import './App.css';
import InputPanel from './InputPanel';

/*function App() {
	const [data, setData] = React.useState(null);

	React.useEffect(() => {
		fetch("/api")
			.then((res) => res.json())
			.then((data) => setData(data.message))
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className="App">
			<header className="App-header">
        		<img src={logo} className="App-logo" alt="logo" />
        			<p>
          				{!data ? 'Loading...' : data}
        			</p>
        		<a
          			className="App-link"
          			href="https://reactjs.org"
          			target="_blank"
          			rel="noopener noreferrer"
        		>
          			Learn React
        		</a>
      		</header>
    	</div>
  	);
}*/

function App() {
	return (
		<div className='App container'>
			<div className='row'>
				<h1>RPE Calculator</h1>
			</div>
			<div className='row'>
				<div className='links'>Link1 | Link2 | Link3 | Link4</div>
			</div>
			<div className='row'>
				<InputPanel />
			</div>
    	</div>
  	);
}

export default App;
