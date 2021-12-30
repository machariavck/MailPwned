import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Icon, Input } from "@mui/material"
import { useState } from 'react';


export default function Result({ datum }: { datum: [{Name: string}]}) {

	const [count, updateCount] = useState(0)
	const size = 10;

	const [data, updateData] = useState([...datum])


	let tcell = []
	for (let i = count; i < (count+size) && i < data.length; i++) {
		tcell.push(
			<TableRow
				key={i}
				sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
			>
				<TableCell component='td' scope='row' align="center">
					{i+1}
				</TableCell>
				<TableCell component="td" scope="row" align="center" >
					{data[i].Name}
				</TableCell>
			</TableRow>
		)
	}

	return (
		<>
			<Input
				type='search'
				id="search"
				placeholder='search a site here'
				onInput={(e: React.FormEvent<HTMLDivElement> & { target: { value: string}}) => {
					let regex = new RegExp(`${e.target.value}`, 'i')
					updateData(datum.filter((x: { Name: string}) => regex.test(x.Name)))
					updateCount(0);
				}}
			/>

			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 500 }} aria-label="Results table">
					<TableHead>
						<TableRow>
							<TableCell component='th' align="center">Count</TableCell>
							<TableCell align="center">Site Found</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tcell.map(x => x)}
					</TableBody>
				</Table>
			</TableContainer>
			<Button
				variant="contained"
				color="primary"
				onClick={() => window.location.reload()}
			>
				<Icon>reply</Icon>
			</Button>
			{ count + size < data.length &&
				<Button
					variant="contained"
					color="secondary"
					onClick={() => updateCount(count+size) }
				>
					Next<Icon>fastforward</Icon>
				</Button>
			}
			{ count > 0 &&
				<Button
					variant="contained"
					color="secondary"
					onClick={() => updateCount(count-size) }
				>
					Back<Icon>fastrewind</Icon>
				</Button>
			}
		</>
	)
} 