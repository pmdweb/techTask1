import React, { useEffect, useState } from 'react'
import { Container } from './styles'
import {
	FormControl,
	MenuItem,
	Grid,
	Select,
	TextField,
	Typography,
	Button
} from '@mui/material'
import { getLanguages } from '../../services/gtApi'
export default function Translator() {

	const [targetLanguage, setTargetLanguage] = useState(['en'])
	const [languageList, setLanguageList] = useState([])
	const [translated, setTranslated] = useState('teste')
	const Origin = 'pt-br'

	const handleTargetLanguage = async (event) => {
		setTargetLanguage(event.target.value)
	};

	const handleTranslated = async (event) => {
		setTranslated(event.target.value)
	};

	useEffect(() => {
		async function fetchData() {
			try {
				setLanguageList(await getLanguages(targetLanguage))
			} catch (error) {
				console.log(error)
			}
		}
		Promise.all([fetchData()])
	}, []);

	return (
		<Container>
			<Grid container spacing={1} sx={{ textAlign: 'center', fontSize: '22px' }}>
				<Grid item xs={12}>
					<h3>Alchemy Cloud  - Technical Tasks</h3>
				</Grid>
				<Grid container spacing={2}>
					<Grid item xs={3}></Grid>
					<Grid item xs={3}>
						<Select size='small' fullWidth value={targetLanguage} onChange={handleTargetLanguage}>
							{
								languageList ? (
									languageList.map((list) => {
										return (
											<MenuItem
												id={list.code}
												key={list.code}
												value={list.code}
												selected
											> {list.name} </MenuItem>
										)
									})
								) : (<p>Loading...</p>)
							}
						</Select>
					</Grid>
					<Grid item xs={3}>
						<TextField
							fullWidth
							label={'Text to be translated'}
							multiline
							rows={4}
						/>
					</Grid>
					<Grid item xs={3}></Grid>
				</Grid>
				<Grid container spacing={2}>
					<Grid item xs={12} ></Grid>
					<Grid item xs={3} ></Grid>
					<Grid item xs={6}>
						<TextField
							fullWidth
							label={'Translated text'}
							multiline
							disabled
							rows={6}
							value={translated}
						/>
					</Grid>
					<Grid item xs={3} ></Grid>
					<Grid item xs={3} ></Grid>
					<Grid item xs={6}>
						<Button variant="contained" onClick={handleTranslated} fullWidth>Translate</Button>
					</Grid>
					<Grid item xs={6}>
						<Typography>Origin Language: {Origin}</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography>Target Language: {targetLanguage}</Typography>
					</Grid>
				</Grid>
			</Grid>

		</Container>

	)
}