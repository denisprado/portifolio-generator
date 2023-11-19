'use client'

import { create, editPortfolio } from '@/app/dashboard/portfolios/actions'
import { PortifolioType, WorkType } from '@/components/pdf/styles'
import LoadingDots from '@/components/ui/LoadingDots'
import { supabaseClient } from '@/utils/supabase'
import { Box, Button, Card, CardContent, CardMedia, Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { redirect } from 'next/navigation'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { v4 } from 'uuid'

const NEW = 'new'

const initialState = {
	message: '',
	id: NEW
}

function SubmitButton() {
	const { pending } = useFormStatus()

	return (
		<Button component="a" href="#"
			className='my-4 w-full' type="submit" variant='contained' aria-disabled={pending}>
			Salvar
		</Button>
	)
}

const PORTFOLIO = 'portfolio'

export function AddForm({ params: { id } }: { params: { id: string } }) {

	const [editState, editFormAction] = useFormState(editPortfolio, initialState)

	const [isLoading, setIsLoading] = useState(true)
	const [userId, setUserId] = useState<any>('')
	const [focusedField, setFocusedField] = useState("");
	const [colorThemeData, setcolorThemeData] = useState<any>()
	const [spacingThemeData, setSpacingThemeData] = useState<any>()
	const [typographyThemeData, setTypographyThemeData] = useState<any>()

	useEffect(() => {
		id === 'new' && create()
	}, [])


	const [portfolioValues, setPortfolioValues] = useState<PortifolioType>({
		id: id,
		title: '',
		created_at: '',
		download_count: 0,
		image_1_src: '',
		image_2_src: '',
		updated_at: '',
		use_profile_info: true,
		description: '',
		contact: '',
		bio: '',
		cv: '',
		image_1: '',
		image_2: '',
		page_layout: 'portrait',
		color_theme_id: '',
		typography_theme_id: '',
		spacing_theme_id: '',
		user_id: '',
		work_id: []
	});




	useEffect(() => {
		const fetchPortfolioValues = async () => {
			if (id !== NEW) {
				const { data: portfolioDetails } = await supabaseClient
					.from(PORTFOLIO)
					.select('*')
					.match({ id: id })
					.single();
				setPortfolioValues(portfolioDetails as PortifolioType)
			}
		}
		id !== NEW && fetchPortfolioValues()
	}, [])

	/* Edit works 
		
	- Lista completa de trabalhos - gravar no estado works */
	const [works, setWorks] = useState<WorkType[] | null>([])

	useEffect(() => {
		const fetchWorks = async () => {
			const { data: workData } = await supabaseClient
				.from('work')
				.select('*')
			setWorks(workData)
		}
		fetchWorks()
	}, [])

	const [worksSelecteds, setWorksSelecteds] = useState<string[]>(portfolioValues?.work_id as string[])
	/*
		- Listar quais trabalhos estão selecionados no portfolio - portfolioValues.work_id
	*/
	useEffect(() => {

		worksSelecteds && worksSelecteds?.map((id: string) => {
			setWorks((prevState: any) =>
				prevState.map((work: any) =>
					work.id === id ? { ...work, checked: true } : { ...work, checked: false }
				)
			);
		})
	}, [worksSelecteds])


	/*
		- Sempre que clicar em um trabalho, gravar em portfoliosValues.work_id
	*/
	useEffect(() => {
		setPortfolioValues({ ...portfolioValues, work_id: worksSelecteds });
	}, [worksSelecteds])

	useEffect(() => {
		if (!portfolioValues.work_id) {
			return
		}
		setWorksSelecteds(portfolioValues.work_id);
	}, [portfolioValues.work_id])


	const handleCheckboxChange = (id: string) => {
		setWorksSelecteds((worksSelecteds: any) => {
			return worksSelecteds.includes(id) ? worksSelecteds.filter((workId: string) => workId !== id) : [...worksSelecteds, id]
		});
	};

	const workIsChecked = (id: string) => worksSelecteds.includes(id)



	const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFocusedField(name)
		setPortfolioValues((portfolioAtual) => {
			const updatedPortfolio = { ...portfolioAtual, [name]: value };

			return updatedPortfolio;
		})
	};

	// useEffect(() => {
	// 	// Editar o formulário após a atualização do estado
	// 	editForm(objectToFormData(portfolioValues));
	// }, [portfolioValues]);

	/** Themes */

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


	/** User */

	useEffect(() => {
		const fetchUserId = async () => {
			const { data: userDetails } = await supabaseClient
				.from('users')
				.select('*')
				.single();
			if (userDetails) {
				setUserId(userDetails.id)
			}
			setIsLoading(false)
		}
		fetchUserId()
	}, [])

	const editForm = async (formData: FormData) => {
		editFormAction(formData);
	}

	// useEffect(() => {
	// 	portfolioValues.id !== NEW && editState.id !== NEW && redirect(`/dashboard/portfolios/addForm/${portfolioValues.id}`)

	// }, [editState.id, portfolioValues.id])

	useEffect(() => {
		setPortfolioValues((portfolioValues: PortifolioType) => {
			console.log(editState.id)
			return { ...portfolioValues, id: editState.id != NEW ? editState.id : portfolioValues.id }
		})

	}, [editState, editState.id])

	return !isLoading ? (
		<form action={editForm} id="portfolioForm">
			<input id='id' name='id' hidden defaultValue={id} />
			<input type='hidden' value={portfolioValues.work_id!} name='work_id' id="work_id"></input>
			<Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
				<Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>

					{/** Campos de texto*/}
					<Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', gap: 2 }}>
						<Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
							{MuiTextField("Título", "title", 1)}
							{MuiTextField("Descrição", "description", 3)}
							{MuiTextField("Mini Bio", "bio", 3)}
							{MuiTextField("Curriculum Vitae", "cv", 3)}
							{MuiTextField("Contact", "contact", 3)}
						</Box>
					</Box>

					{/** Upload de imagens */}
					<Box>
						<Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', gap: 2 }}>
							{imageUpload("image_1", "image_1", "Upload da Capa")}
							{imageUpload("image_2", "image_2", "Upload da contra capa")}
						</Box>
					</Box>

					{/* Works */}
					<Box>
						<FormLabel id="page_layout_label">Trabalhos neste portfolio</FormLabel>
						<FormGroup
							aria-labelledby="Works"
							sx={{ display: 'flex', gap: 4, flexDirection: 'row', paddingY: 2 }}
						>

							{works && works.map((work: any) => {
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
												<Checkbox checked={workIsChecked(work.id)}
													onChange={() => handleCheckboxChange(work.id)}
													inputProps={{ 'aria-label': 'controlled' }} value={work.id} required />
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
								value={portfolioValues.page_layout}
								onChange={handleChangeValue}
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
								value={portfolioValues.color_theme_id} onChange={handleChangeValue}
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
								value={portfolioValues.typography_theme_id} onChange={handleChangeValue}
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
								value={portfolioValues.spacing_theme_id} onChange={handleChangeValue}
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
				{id && editState?.message}
			</p>
		</form >
	) : <div className='h-52 flex justify-center items-center w-full'><LoadingDots></LoadingDots></div>


	function imageUpload(imageId: string, index: "image_1" | "image_2", labelButton: string) {
		const src = portfolioValues[index]
		if (!index) {
			return null
		}
		return <Box sx={{ display: 'flex', flexDirection: 'column' }}>
			<Button
				variant="contained"
				component="label"
				className='my-4 w-full'
			>
				{labelButton}
				<input
					type="file"
					hidden
					id={imageId} name={imageId} accept="image/*"
					onChange={() => {
						editForm(objectToFormData(portfolioValues))
					}} />
			</Button>
			{src && <img className={'rounded-sm'} src={src} width={'250px'} />}
		</Box>
	}

	function objectToFormData(obj: { [s: string]: any } | ArrayLike<unknown>) {
		const formData = new FormData();

		Object.entries(obj).forEach(([key, value]) => {
			formData.append(key, value);
		});

		return formData;
	}

	function MuiTextField(label: string, fieldId: keyof PortifolioType, rows: number) {
		return <TextField
			label={label}
			variant="outlined"
			type="text"
			id={fieldId}
			name={fieldId}
			required
			value={portfolioValues[fieldId]}
			onChange={(event: React.ChangeEvent<HTMLInputElement>) => { handleChangeValue(event) }}
			autoFocus={focusedField === fieldId}
			multiline={rows > 1}
			rows={rows}
			inputProps={{
				onBlur: () => {
					editForm(objectToFormData(portfolioValues))
				}
			}}

		/>

	}
}


