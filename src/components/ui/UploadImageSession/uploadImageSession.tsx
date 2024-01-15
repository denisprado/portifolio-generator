import React, { ChangeEvent } from "react";
import { imageFieldsTypes, imagesFiles, imagesSrcs } from "../../../app/dashboard/types";
import Image from 'next/image'

const ShowImageUploaded = ({ src }: { src: string | null }): React.JSX.Element | null => {
	if (!src) {
		return null
	}
	return (
		<div className='border border-dashed border-primary p-4 rounded-md'>

			<Image
				key={src}
				className={'rounded-sm'}
				src={src}
				width={250}
				height={500}
				alt={''}
			/>
		</div>
	)
}

const UploadImageSession = ({ imageFields }: { imageFields: imageFieldsTypes }) => {
	return (
		<div className='flex flex-col flex-1 gap-2'>
			{imageFields ? imageFields.map(({
				file,
				src,
				labelButton,
				handleInputChange
			}) => imageUpload({
				file,
				src,
				labelButton,
				handleInputChange
			})) : <p>Sem Imagem</p>}
		</div>);
};

const imageUpload = (
	{
		file,
		src,
		labelButton, handleInputChange
	}: {
		file: imagesFiles;
		src: string;
		labelButton: string;
		handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void
	}
): React.JSX.Element | null => {

	return (
		<div className='flex flex-col gap-4' key={src} >
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text">{labelButton}</span>
				</div>
				<input
					className="file-input file-input-bordered file-input-primary w-full max-w-xs"
					type="file"
					id={file}
					name={file}
					accept="image/*"
					onChange={handleInputChange}
				/>
			</label>
			<ShowImageUploaded src={src} />
		</div>
	);
};

export default UploadImageSession;