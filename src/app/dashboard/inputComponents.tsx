"use client";

import { SearchRounded } from "@mui/icons-material";
import React, { InputHTMLAttributes, KeyboardEvent, RefObject, TextareaHTMLAttributes, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";
import { Textarea } from 'react-daisyui'

type InputWrapperProps = {
	label: ReactNode;
	children: ReactNode;
	isHorizontal?: boolean;
	isRequired?: boolean;
};

export const InputWrapper = ({ label, children, isHorizontal, isRequired }: InputWrapperProps) => {
	const className = isHorizontal ? "mb-6 flex gap-2" : "mb-6";
	const labelClassName = isHorizontal ? "w-2/5 text-right text-primary" : "mb-1 text-primary";

	return (
		<div className={className}>
			<div className={labelClassName}>
				{isRequired && <span className="mr-1 text-error">*</span>}
				{label}
			</div>
			<div className="w-full">{children}</div>
		</div>
	);
};

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value"> & {
	status?: "error" | "warning" | "success" | "";
	onPressEnter?: (value: any, event: KeyboardEvent<HTMLInputElement>) => void;
	inputRef?: RefObject<HTMLInputElement>;
	value: string | number | string[] | null;
	validate?: (value: any) => boolean;
	inputClassName?: string;
	invalidMessage?: string;
};
const Input = ({
	className,
	status,
	onPressEnter,
	inputRef,
	value,
	validate,
	inputClassName,
	invalidMessage,
	...rest
}: InputProps) => {
	const statusClass =
		status === "error"
			? "input-error"
			: status === "warning"
				? "input-warning"
				: status === "success"
					? "input-success"
					: "";
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (onPressEnter && e.key === "Enter") onPressEnter(e.currentTarget.value, e);
	};
	return (
		<div className={twMerge("w-full", className)}>
			<input
				{...rest}
				ref={inputRef}
				value={value === null ? undefined : value}
				onKeyDown={handleKeyDown}
				className={twMerge(
					" input input-bordered duration-300 focus:outline-none text-base-content placeholder:text-base-content/30 w-full bg-[#EFF2F9]",
					statusClass,
					inputClassName
				)}
			/>

			{invalidMessage && typeof validate !== "undefined" && (
				<div
					className={twMerge(
						`text-xs  text-red-500 text-end duration-300`,
						validate && value && !(typeof value === "string" && !value.length) && !validate(value)
							? " opacity-100 "
							: " opacity-0"
					)}
				>
					{invalidMessage}
				</div>
			)}
		</div>
	);
};

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
	onPressEnter?: (value: string, event: KeyboardEvent<HTMLTextAreaElement>) => void;
};
const TextArea = ({ className, onPressEnter, ...rest }: TextAreaProps): ReactNode => {

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (onPressEnter && e.key === "Enter") onPressEnter(e.currentTarget.value as any, e);
	};
	return (
		<textarea
			{...rest}
			onKeyDown={handleKeyDown}
			className={twMerge("textarea textarea-bordered focus:outline-none", className)}
		/>
	);
};
Input.TextArea = TextArea;

type PasswordProps = InputHTMLAttributes<HTMLInputElement> & {
	status?: "error" | "warning" | "success" | "";
	onPressEnter?: (value: string, event: KeyboardEvent<HTMLInputElement>) => void;
	validate?: (value: any) => boolean;
	inputClassName?: string;
	invalidMessage?: string;
};
const Password = ({
	className,
	status,
	validate,
	value,
	onPressEnter,
	inputClassName,
	invalidMessage,
	...rest
}: PasswordProps) => {
	const statusClass =
		status === "error"
			? "input-error"
			: status === "warning"
				? "input-warning"
				: status === "success"
					? "input-success"
					: "";
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (onPressEnter && e.key === "Enter") onPressEnter(e.currentTarget.value, e);
	};

	return (
		<div className={twMerge("", className)}>
			<input
				{...rest}
				value={value ?? ""}
				type="password"
				onKeyDown={handleKeyDown}
				className={twMerge(
					" input input-bordered duration-300 focus:outline-none text-base-content placeholder:text-base-content/30",
					statusClass,
					inputClassName
				)}
			/>
			{invalidMessage && typeof validate !== "undefined" && (
				<div
					className={twMerge(
						`text-xs text-red-500 text-end duration-300`,
						validate && value && !(typeof value === "string" && !value.length) && !validate(value)
							? " opacity-100 "
							: " opacity-0"
					)}
				>
					{invalidMessage}
				</div>
			)}
		</div>
	);
};
Input.Password = Password;

type InputNumberProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
	onPressEnter?: (value: number, event: KeyboardEvent<HTMLInputElement>) => void;
	onChange: (value: number) => void;
};
Input.Number = ({ className, onPressEnter, onChange, ...rest }: InputNumberProps) => {
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		e.key === "Enter" && onPressEnter?.(e.currentTarget.valueAsNumber, e);
	};
	const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
		const inputVal = parseFloat(e.target.value);
		if (!isNaN(inputVal)) onChange(inputVal);
	};
	return (
		<input
			{...rest}
			type="number"
			onKeyDown={handleKeyDown}
			onChange={handleChange}
			className={twMerge("input input-bordered", className)}
		/>
	);
};

type SearchProps = InputHTMLAttributes<HTMLInputElement> & {
	enterButton?: boolean;
	onSearch: (value: string) => void;
	buttonClassName?: string;
};
const Search = ({ className, onSearch, buttonClassName, enterButton, ...rest }: SearchProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") onSearch(inputRef.current?.value || "");
	};
	return (
		<div className="flex">
			<input
				{...rest}
				ref={inputRef}
				type="text"
				className={twMerge("input input-bordered rounded-r-none focus:outline-none", className)}
				onKeyDown={handleKeyDown}
			/>
			<button
				onClick={() => onSearch(inputRef.current?.value || "")}
				className={twMerge("px-4 align-middle rounded-l-none btn btn-primary", buttonClassName)}
			>
				<SearchRounded />
			</button>
		</div>
	);
};
Input.Search = Search;

export const MemoInput = Input
export const MemoTextArea = Textarea