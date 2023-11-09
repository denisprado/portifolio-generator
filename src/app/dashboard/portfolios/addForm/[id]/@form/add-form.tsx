'use client'
import { createTodo } from '@/app/dashboard/portfolios/actions'
import { supabaseClient } from '@/utils/supabase'
import { Box, Button, Card, CardContent, CardMedia, Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

const initialState = {
	message: '',
}

function SubmitButton() {
	const { pending } = useFormStatus()

	return (
		<Button type="submit" aria-disabled={pending}>
			Criar
		</Button>
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
		page_layout: 'portrait',
		color_theme_id: '',
		typography_theme_id: '',
		spacing_theme_id: '',
		user_id: '',
		work_id: ''

	});
	const [focusedField, setFocusedField] = useState("");
	const [colorThemeData, setcolorThemeData] = useState<any>()
	const [spacingThemeData, setSpacingThemeData] = useState<any>()
	const [typographyThemeData, setTypographyThemeData] = useState<any>()


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

	useEffect(() => {
		const fetchcolorTheme = async () => {
			const { data: colorThemeData } = await supabaseClient
				.from('color_theme')
				.select('*')


			setcolorThemeData(colorThemeData)
			setIsLoading(false)
		}
		fetchcolorTheme()
	}, [])


	useEffect(() => {
		const fetchSpacingTheme = async () => {
			const { data: spacingThemeData } = await supabaseClient
				.from('spacing_theme')
				.select('*')


			setSpacingThemeData(spacingThemeData)
			setIsLoading(false)
		}
		fetchSpacingTheme()
	}, [])

	useEffect(() => {
		const fetchTypographyTheme = async () => {
			const { data: typographyThemeData } = await supabaseClient
				.from('typography_theme')
				.select('*')


			setTypographyThemeData(typographyThemeData)
			setIsLoading(false)
		}
		fetchTypographyTheme()
	}, [])

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


	return (
		<form action={formAction}>
			<input id='user_id' name='user_id' hidden defaultValue={userId} />
			<input type='hidden' value={workCheckedArray()} name='work_id' id="work_id"></input>
			<Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>

				<Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
					{/** Campos de texto*/}
					<Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', gap: 2 }}>
						<Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
							<TextField
								label="Título"
								variant="outlined"
								type="text"
								id="title"
								name="title"
								required
								value={formData.title}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => { handleChangeValue(event) }}
								autoFocus={focusedField === "title"}
							/>
							<TextField label='Descrição' variant="outlined" type="text" id="description" name="description" value={formData.description} onChange={handleChangeValue} required
								autoFocus={focusedField === "description"} multiline
								rows={3}
							/>

							<TextField variant="outlined" label='Mini Bio' type="text" id="bio" name="bio" value={formData.bio} onChange={handleChangeValue} autoFocus={focusedField === "bio"} multiline
								rows={3} />
							<TextField variant="outlined" label="Curriculum Vitae" type="text" id="cv" name="cv" value={formData.cv} onChange={handleChangeValue} autoFocus={focusedField === "cv"} multiline
								rows={3} />
							<TextField variant="outlined" label='Contato' type="text" id="contact" name="contact" value={formData.contact} onChange={handleChangeValue} autoFocus={focusedField === "contact"} multiline
								rows={3} />
						</Box>
					</Box>

					{/** Upload de imagens */}
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

					{/* Works */}
					<Box>
						<FormLabel id="page_layout_label">Trabalhos neste portfolio</FormLabel>
						<FormGroup
							aria-labelledby="Works"
							sx={{ display: 'flex', gap: 4, flexDirection: 'row', paddingY: 2 }}
						>

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
													inputProps={{ 'aria-label': 'controlled' }} value={work.id} />
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
					</Box>

					{/* Orientação */}
					<FormControl>
						<FormGroup
							aria-labelledby="Works"
							sx={{ paddingY: 2 }}
						>
							<FormLabel id="page_layout_label">Orientação da página</FormLabel>
							<RadioGroup
								row
								aria-labelledby="Orientation"
								defaultValue="portrait"
								name="page_layout"
								id="page_layout"

								value={formData.page_layout} onChange={handleChangeValue}
							>
								<FormControlLabel value="portrait" control={<Radio />} label="Retrato" />
								<FormControlLabel value="landscape" control={<Radio />} label="Paisagem" />
							</RadioGroup>
						</FormGroup>
					</FormControl>

					{/** Color Themes */}
					<FormControl>
						<FormGroup
							aria-labelledby="Works"
							sx={{ paddingY: 2 }}
						>
							<FormLabel id="page_layout_label">Tema de cores</FormLabel>
							<RadioGroup
								aria-labelledby="Orientation"
								name="color_theme_id"
								id="color_theme_id"
								value={formData.color_theme_id} onChange={handleChangeValue}
								sx={{ display: 'flex', gap: 4, flexDirection: 'row' }}
							>
								{colorThemeData?.map((colorTheme: any, i: number) => {
									return (
										<Card sx={{ display: 'flex', backgroundColor: 'transparent', flexDirection: 'row', flexGrow: '0' }} key={colorTheme.id}>
											<Box sx={{ display: 'flex', flexDirection: 'row', backgroundColor: 'transparent' }}>
												<FormControlLabel value={colorTheme.id} control={<Radio />} label={colorTheme.title} sx={{ marginLeft: 1 }} />
												<Box sx={{ flexDirection: 'row', backgroundColor: colorTheme.background_primary_color, width: "64px", height: "64px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Typography sx={{ color: colorTheme.text_primary_color }}>{colorTheme.title}</Typography></Box>
												<Box sx={{ flexDirection: 'row', backgroundColor: colorTheme.background_secondary_color, width: "64px", height: "64px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Typography sx={{ color: colorTheme.text_secondary_color }}>{colorTheme.title}</Typography></Box>
											</Box>
										</Card>
									)
								})}
							</RadioGroup>
						</FormGroup>
					</FormControl>

					{/** Typography Themes */}
					<Box>
						<FormGroup
							aria-labelledby="Works"
							sx={{ paddingY: 2 }}
						>
							<FormLabel id="page_layout_label">Tema de tipografia</FormLabel>
							<RadioGroup
								aria-labelledby="Orientation"
								defaultValue="portrait"
								name="typography_theme_id"
								id="typography_theme_id"
								value={formData.typography_theme_id} onChange={handleChangeValue}
								sx={{ display: 'flex', gap: 4, flexDirection: 'row' }}
							>
								{typographyThemeData?.map((typographyTheme: any, i: number) => {
									return (
										<Card sx={{ display: 'flex', backgroundColor: 'transparent', flexDirection: 'row', flexGrow: '0' }} key={typographyTheme.id}>
											<Box sx={{ display: 'flex', flexDirection: 'row', backgroundColor: 'transparent' }}>
												<FormControlLabel value={typographyTheme.id} control={<Radio />} label={typographyTheme.title} sx={{ marginLeft: 1 }} />
											</Box>
										</Card>
									)
								})}
							</RadioGroup>
						</FormGroup>
					</Box>

					{/** Spacing Themes */}
					<Box>
						<FormGroup
							aria-labelledby="Works"
							sx={{ paddingY: 2 }}
						>


							<FormLabel id="page_layout_label">Espaçamento</FormLabel>
							<RadioGroup
								aria-labelledby="Spacing Thme"
								name="spacing_theme_id"
								id="spacing_theme_id"
								value={formData.spacing_theme_id} onChange={handleChangeValue}
								sx={{ display: 'flex', gap: 4, flexDirection: 'row' }}
							>
								{spacingThemeData?.map((spacingTheme: any, i: number) => {
									return (
										<Card sx={{ display: 'flex', backgroundColor: 'transparent', flexDirection: 'row', flexGrow: '0' }} key={spacingTheme.id}>
											<Box sx={{ display: 'flex', flexDirection: 'row', backgroundColor: 'transparent' }}>
												<FormControlLabel value={spacingTheme.id} control={<Radio />} label={spacingTheme.title} sx={{ marginLeft: 1 }} />
											</Box>
										</Card>
									)
								})}
							</RadioGroup>
						</FormGroup>
					</Box>

				</Box>
			</Box>
			<SubmitButton />
			<p aria-live="polite" className="sr-only" role="status">
				{state?.message}
			</p>
		</form >
	)

	function workCheckedArray(): readonly string[] {
		const checkedWorks = works.filter((w: { checked: boolean; id: string }) => w.checked).map((w: any) => w.id)
		if (!checkedWorks) {
			throw Error
		}
		console.log(checkedWorks.toString())
		return checkedWorks
	}
}