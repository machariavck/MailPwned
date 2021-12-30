// custom imports
import Results from './Result'

// external libraries
import { useState } from 'react'
import { Button, Icon, TextField } from "@mui/material"
import { Box } from "@mui/system"


const App = () => {

	const [ data, updateData ] = useState(null)


	// submit handler
	const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	
		const res = await fetch(`http://localhost:5000/breaches?query={user(email:"${e.currentTarget.email.value}"){Name}}`)
		const { data: { user }} = await res.json()
		// console.log(user)
		updateData(user)
	};

	return data ? <Results datum={data} /> :
	// return data ? <div>it worked</div> :
		<>
			{/* Check if your email or phone is in a data breach */}
			<Box
				component="form"
				sx={{'& > :not(style)': { m: 1, width: '25ch'}}}
				style={{display: 'flex', flexDirection: 'column'}}
				autoComplete='off'
				onSubmit={(e: any) => submitHandler(e)}
			>
				<TextField type='email' id="email" label="Email address" variant="standard" helperText="e.g. bro@hey.com" />
			
				<Button type='submit' variant="contained" color="primary">
					SUBMIT
					<Icon>send</Icon>
				</Button>
			</Box>
		</>
}

export default App;