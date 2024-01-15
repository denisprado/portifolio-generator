import { MemoTextArea } from "@/app/dashboard/inputComponents";
import { PortfolioType, WorkType } from "@/app/dashboard/types";

export const TextAreaInput = ({ labelText, id, name, required, value, onChange, autoFocus }: { labelText: string, id: string, name: keyof PortfolioType | keyof WorkType, required: boolean, value: any, onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void, autoFocus: boolean }) => (
	<label className="form-control w-full max-w-6xl">
		<div className="label">
			<span className="label-text">{labelText}</span>
		</div>
		<MemoTextArea
			id={id}
			key={`memo-text-area-${name}`}
			name={name}
			required={required}
			value={value ?? ''}
			onChange={onChange}
			autoFocus={autoFocus}
			className='bg-[#EFF2F9] h-48'
		/>
	</label>
);