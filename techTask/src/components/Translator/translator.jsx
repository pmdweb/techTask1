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
import { detectLanguage, getLanguages, translateText } from '../../services/gtApi'
export default function Translator() {

	const [targetLanguage, setTargetLanguage] = useState('en')
	const [languageList, setLanguageList] = useState([])
	const [translated, setTranslated] = useState('')
	const [text,setText] = useState('')
	const [origin,setOrigin] = useState('en')

	const handleTargetLanguage = async (event) => {
		try {
			setTargetLanguage(event.target.value)
		} catch (error) {
			console.log(error)
		}
	};

	const handleTranslated = async (event) => {
		try {
			//console.log(event.target)
			const result = await detectLanguage(text)
			setTranslated(await translateText(text,targetLanguage))
			setOrigin(result.language.toUpperCase())
		} catch (error) {
			console.log(error)
		}
	};

	useEffect(() => {
		async function fetchData() {
			try {
				setLanguageList(await getLanguages())
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
								) : (<MenuItem id={0} key={0} value={en} selected > Loading... </MenuItem>)
							}
						</Select>
					</Grid>
					<Grid item xs={3}>
						<TextField
							fullWidth
							label={'Please insert an text to be translated here...'}
							multiline
							rows={4}
							value={text}
  							onChange={(event) => setText(event.target.value)}
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
					<Grid item xs={3}></Grid>
					<Grid item xs={3}></Grid>
					<Grid item xs={3}>
						<Typography>Origin Language: {origin.toLocaleUpperCase()}</Typography>
					</Grid>
					<Grid item xs={3}>
						<Typography>Target Language: {targetLanguage.toLocaleUpperCase()}</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	)
}
