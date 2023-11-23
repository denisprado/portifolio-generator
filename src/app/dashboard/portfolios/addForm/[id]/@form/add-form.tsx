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

const NEW: string = 'new'

interface ThemeData {
	id: string; // ou o tipo apropriado para o ID
	// outros campos necessários
}

interface ThemeProps {
	tableName: string;
	data?: ThemeData[];
	selected?: string | null;
	setData?: React.Dispatch<React.SetStateAction<ThemeData[]>>;
	setSelected?: React.Dispatch<React.SetStateAction<string | null>>;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState = {
	message: '',

}

function SubmitButton() {
	const { pending } = useFormStatus()

	return (
		<Button component="a" href="#"
			className='my-4 w-full text-blue-800' type="submit" variant='contained' aria-disabled={pending}>
			Salvar
		</Button>
	)
}

const PORTFOLIO = 'portfolio'

export function AddForm({ params: { id } }: { params: { id: string } }) {

	const [editState, editFormAction] = useFormState(editPortfolio, initialState)
	const [focusedField, setFocusedField] = useState("");
	const [colorThemeData, setColorThemeData] = useState<ThemeData[]>([]);
	const [colorThemeSelected, setColorThemeSelected] = useState<string | null>(null);
	const [spacingThemeData, setSpacingThemeData] = useState<ThemeData[]>([]);
	const [spacingThemeSelected, setSpacingThemeSelected] = useState<string | null>(null);
	const [typographyThemeData, setTypographyThemeData] = useState<ThemeData[]>([]);
	const [typographyThemeSelected, setTypographyThemeSelected] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		console.log(portfolioValues)
		id === NEW && create(portfolioValues)
	}, [])


	const [portfolioValues, setPortfolioValues] = useState<PortifolioType>({
		id: id,
		title: null,
		created_at: null,
		download_count: null,
		image_1_src: null,
		image_2_src: null,
		updated_at: null,
		use_profile_info: null,
		description: null,
		contact: null,
		bio: null,
		cv: null,
		image_1: null,
		image_2: null,
		page_layout: 'portrait',
		color_theme_id: null,
		typography_theme_id: null,
		spacing_theme_id: null,
		user_id: null,
		work_id: []
	});

	const handleInputChange = (
		fieldName: string,
	) => (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		console.log(name, value, fieldName)
		setFocusedField(name);
		setPortfolioValues((portfolioAtual) => {
			const spacing = name === 'spacing_theme_id' ? value : portfolioAtual['spacing_theme_id'] ?? spacingThemeSelected;
			const color = name === 'color_theme_id' ? value : portfolioAtual['color_theme_id'] ?? colorThemeSelected;
			const typography = name === 'typography_theme_id' ? value : portfolioAtual['typography_theme_id'] ?? typographyThemeSelected;

			const updatedPortfolio = {
				...portfolioAtual, [name]: value, 'spacing_theme_id': spacing, 'color_theme_id': color, 'typography_theme_id': typography
			};

			console.log(updatedPortfolio)
			return updatedPortfolio;
		});
	};



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
	}, [portfolioValues?.work_id])


	const handleCheckboxChange = (id: string) => {
		setWorksSelecteds((worksSelecteds: any) => {
			return worksSelecteds.includes(id) ? worksSelecteds.filter((workId: string) => workId !== id) : [...worksSelecteds, id]
		});
	};

	const workIsChecked = (id: string) => worksSelecteds ? worksSelecteds.includes(id) : false


	/** Themes */

	const useThemeEffect = ({ tableName, setData, setSelected, setLoading }: ThemeProps) => {
		useEffect(() => {
			const fetchData = async () => {
				const { data } = await supabaseClient
					.from(tableName)
					.select('*');

				if (setData && data) {
					setData(data);
				}

				if (setSelected && data && data.length > 0) {
					const selectedTheme = portfolioValues[`${tableName}_id` as keyof PortifolioType];
					if (selectedTheme === null) {
						setSelected(data[0].id);
					}
					setLoading(false);
				};
			}
			fetchData();
		}, [tableName, setData, setSelected, setLoading])
	};

	// Efeitos customizados para cada tabela
	useThemeEffect({
		tableName: 'color_theme',
		setData: setColorThemeData,
		setSelected: setColorThemeSelected,
		setLoading: setIsLoading,
	});

	useThemeEffect({
		tableName: 'spacing_theme',
		setData: setSpacingThemeData,
		setSelected: setSpacingThemeSelected,
		setLoading: setIsLoading,
	});

	useThemeEffect({
		tableName: 'typography_theme',
		setData: setTypographyThemeData,
		setSelected: setTypographyThemeSelected,
		setLoading: setIsLoading,
	});


	const editForm = async (formData: FormData) => {
		id !== NEW && editFormAction(formData);
	}

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
						{renderWorkCards()}
					</Box>

					{/* Orientação */}
					{renderPageLayoutSelection()}

					{renderThemeSelection('Tema de cores', 'color_theme_id', colorThemeData, portfolioValues['color_theme_id'], handleInputChange('color_theme_id'))}
					{renderThemeSelection('Tema de tipografia', 'typography_theme_id', typographyThemeData, portfolioValues['typography_theme_id'], handleInputChange('typography_theme_id'))}
					{renderThemeSelection('Espaçamento', 'spacing_theme_id', spacingThemeData, portfolioValues['spacing_theme_id'], handleInputChange('spacing_theme_id'))}

				</Box>
			</Box>
			<SubmitButton />
			<p aria-live="polite" className="sr-only" role="status">
				{id && editState?.message}
			</p>
		</form >
	) : <div className='h-52 flex justify-center items-center w-full'><LoadingDots></LoadingDots></div>


	function renderPageLayoutSelection() {
		return <FormControl>
			<FormGroup
				aria-labelledby="Orientação"
				sx={{ paddingY: 2 }}
			>
				<FormLabel id="page_layout_label">
					Orientação da página
				</FormLabel>
				<RadioGroup
					row
					aria-labelledby="Orientation"
					defaultValue="portrait"
					name="page_layout"
					id="page_layout"
					value={portfolioValues.page_layout}
					onChange={handleInputChange('page_layout')}
				>
					<FormControlLabel value="portrait" control={<Radio />} label="Retrato" />
					<FormControlLabel value="landscape" control={<Radio />} label="Paisagem" />
				</RadioGroup>
			</FormGroup>
		</FormControl>
	}

	function renderWorkCards() {
		return <>
			<FormLabel id="works_id">Trabalhos neste portfolio</FormLabel>
			<FormGroup
				aria-labelledby="Works"
				sx={{ display: 'flex', gap: 4, flexDirection: 'row', paddingY: 2 }}
			>

				{works && works.map((work: any) => {
					return (
						workCard(work)
					)
				})}
			</FormGroup>
		</>
	}

	function workCard(work: any): React.JSX.Element {
		return <Card sx={{ display: 'flex' }} key={work.id}>
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
				alt={work.title} />
		</Card>
	}

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
			onChange={handleInputChange(fieldId)}
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

	function renderThemeSelection(label: string,
		fieldName: string,
		themeData: ThemeData[],
		selectedTheme: string | null,
		handleChange: (e: ChangeEvent<HTMLInputElement>) => void) {
		return (
			<FormControl>
				<FormGroup aria-labelledby={`${fieldName} ID`} sx={{ paddingY: 2 }}>
					<FormLabel id={`${fieldName}_label`}>{label}</FormLabel>
					<RadioGroup
						aria-labelledby={fieldName}
						name={fieldName}
						id={fieldName}
						value={portfolioValues[fieldName as keyof PortifolioType]}
						onChange={handleChange}
						sx={{ display: 'flex', gap: 4, flexDirection: 'row' }}
					>
						{themeData?.map((theme: any) => (
							<Card
								sx={{ display: 'flex', backgroundColor: 'transparent', flexDirection: 'row', flexGrow: '0' }}
								key={theme.id}
							>
								<Box sx={{ display: 'flex', flexDirection: 'row', backgroundColor: 'transparent' }}>
									<FormControlLabel value={theme.id} control={<Radio />} label={theme.title} sx={{ marginLeft: 1 }} />
									{fieldName === 'color_theme_id' &&
										<>
											<Box sx={{ flexDirection: 'row', backgroundColor: theme.background_primary_color, width: '64px', height: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
												<Typography sx={{ color: theme.text_primary_color }}>{theme.title}</Typography>
											</Box>
											<Box sx={{ flexDirection: 'row', backgroundColor: theme.background_secondary_color, width: '64px', height: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
												<Typography sx={{ color: theme.text_secondary_color }}>{theme.title}</Typography>
											</Box>
										</>}
								</Box>
							</Card>
						))}
					</RadioGroup>
				</FormGroup>
			</FormControl>
		)
	}
}


