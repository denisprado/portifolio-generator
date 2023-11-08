'use client'
import { createTodo } from '@/app/dashboard/portfolios/addForm/[id]/@form/actions'
import { supabaseClient } from '@/utils/supabase'
import { Box, Button, Card, CardContent, CardMedia, Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup, Tab, Tabs, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, SyntheticEvent, useEffect, useMemo, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

const initialState = {
	message: '',
}

function SubmitButton() {
	const { pending } = useFormStatus()

	return (
		<button type="submit" aria-disabled={pending}>
			Criar
		</button>
	)
}

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

export function AddForm() {
	const [state, formAction] = useFormState(createTodo, initialState)
	const [value, setValue] = useState(0);
	const [isLoading, setIsLoading] = useState(true)
	const [works, setWorks] = useState<any>([])
	const [userId, setUserId] = useState<any>('')
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		contact: '',
		bio: '',
		cv: '',
		image_1: '',
		page_layout: 'portrait'
	});

	const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
		setFocusedField(name)
	};


	const handleCheckboxChange = (id: string) => {
		setWorks((prevState: any) =>
			prevState.map((work: any) =>
				work.id === id ? { ...work, checked: !work.checked } : work
			)
		);
	};

	const [focusedField, setFocusedField] = useState("");



	useEffect(() => {
		const fetchUserId = async () => {
			const { data: userDetails } = await supabaseClient
				.from('users')
				.select('*')
				.single();

			setUserId(userDetails.id)
			setIsLoading(false)
		}
		fetchUserId()
	}, [])

	useEffect(() => {
		const fetchWorks = async () => {
			const { data: workData } = await supabaseClient
				.from('work')
				.select('*')

			setWorks(workData)
			setIsLoading(false)
		}
		fetchWorks()

	}, [])

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};


	function TabPanel(props: TabPanelProps) {
		const { children, value, index, ...other } = props;

		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`vertical-tabpanel-${index}`}
				aria-labelledby={`vertical-tab-${index}`}
				{...other}
			>
				{value === index && (
					<Box sx={{ p: 3 }}>
						<Typography>{children}</Typography>
					</Box>
				)}
			</div>
		);
	}

	return (
		<form action={formAction}>
			<Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column' }}>
				<Tabs
					variant="scrollable"
					value={value}
					onChange={handleChange}
					aria-label="Vertical tabs example"
					sx={{ borderRight: 1, borderColor: 'divider' }}
				>
					<Tab label="Informações" />
					<Tab label="Obras" />
					<Tab label="Configurações" />
				</Tabs>
				<TabPanel value={value} index={0}>
					<Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', flexDirection: 'row', gap: 2 }}>
						<Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', gap: 2 }}>
							<TextField
								label="Título"
								variant="filled"
								type="text"
								id="title"
								name="title"
								required
								value={formData.title}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => { handleChangeValue(event) }}
								autoFocus={focusedField === "title"}
							/>
							<TextField label='Descrição' variant="outlined" type="text" id="description" name="description" value={formData.description} onChange={handleChangeValue} required
								autoFocus={focusedField === "description"}
							/>

							<TextField variant="outlined" label='Mini Bio' type="text" id="bio" name="bio" value={formData.bio} onChange={handleChangeValue} />
							<TextField variant="outlined" label="Curriculum Vitae" type="text" id="cv" name="cv" value={formData.cv} onChange={handleChangeValue} />
							<TextField variant="outlined" label='Contato' type="text" id="contact" name="contact" value={formData.contact} onChange={handleChangeValue} />
						</Box>
						<Box>
							<Button
								variant="contained"
								component="label"
							>
								Upload de Imagem de Capa
								<input
									type="file"
									hidden
									id="image_1" name="image_1" accept="image/*"
								/>
							</Button>
						</Box>
					</Box>
				</TabPanel>
				<TabPanel value={value} index={1}>
					{/*  */}
					<FormGroup>
						{works?.map((work: any) => {
							return (
								<Card sx={{ display: 'flex' }} key={work.id}>
									<Box sx={{ display: 'flex', flexDirection: 'column' }}>
										<CardContent sx={{ flex: '1 0 auto' }}>
											<Typography component="div" variant="h5">
												{work.title}
											</Typography>
											<Typography variant="subtitle1" color="text.secondary" component="div">
												{work.description}
											</Typography>
											<Checkbox checked={work.checked || false}
												onChange={() => handleCheckboxChange(work.id)}
												inputProps={{ 'aria-label': 'controlled' }} value={work.id} name='work_id' id="work_id" />
										</CardContent>
									</Box>
									<CardMedia
										component="img"
										sx={{ width: 151 }}
										image={work.image_1_src}
										alt={work.title}
									/>
								</Card>
							)
						})}
					</FormGroup>
				</TabPanel>
				<TabPanel value={value} index={2}>
					<RadioGroup
						aria-labelledby="Orientation"
						defaultValue="portrait"
						name="page_layout"
						id="page_layout"
						value={formData.page_layout} onChange={handleChangeValue}
					>
						<FormControlLabel value="portrait" control={<Radio />} label="Retrato" />
						<FormControlLabel value="landscape" control={<Radio />} label="Paisagem" />
					</RadioGroup>
				</TabPanel>
			</Box>
			<SubmitButton />
			<p aria-live="polite" className="sr-only" role="status">
				{state?.message}
			</p>
		</form>
	)
}