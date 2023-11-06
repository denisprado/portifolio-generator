'use client'
import { useFormState, useFormStatus } from 'react-dom'
import { createTodo } from '@/app/dashboard/portfolios/[id]/actions'
import { FormControlLabel, Input, Radio, RadioGroup, Select } from '@mui/material'
import { supabaseClient } from '@/utils/supabase'

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

export function AddForm() {
	const [state, formAction] = useFormState(createTodo, initialState)

	return (
		<form action={formAction} >
			<div className='flex flex-col gap-4 '>
				<label htmlFor="title">Título</label>
				<input type="text" id="title" name="title" required />
				<label htmlFor="description">Descrição</label>
				<input type="text" id="description" name="description" required />
				<label htmlFor="image_1">Imagem</label>
				<input type='file' id="image_1" name="image_1" accept="image/*" />
				<label htmlFor="bio">Biografia</label>
				<input type="text" id="bio" name="bio" />
				<label htmlFor="cv">Curriculum Vitae</label>
				<input type="text" id="cv" name="cv" />
				<label htmlFor="contact">Contato</label>
				<input type="text" id="contact" name="contact" />
				<RadioGroup
					aria-labelledby="Orientation"
					defaultValue="portrait"
					name="orientation"
				>
					<FormControlLabel value="portrait" control={<Radio />} label="Retrato" />
					<FormControlLabel value="landscape" control={<Radio />} label="Paisagem" />
				</RadioGroup>
				<SubmitButton />
				<p aria-live="polite" className="sr-only" role="status">
					{state?.message}
				</p>
			</div>
		</form>
	)
}