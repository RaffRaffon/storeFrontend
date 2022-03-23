import * as yup from 'yup';
import { usersService } from '../services/users.service';
export const checkoutSchema = yup.object().shape({
	flname: yup.string()
		.min(2, 'Name is too short')
		.required('Name is required'),
	email: yup.string()
		.email('Email is invalid')
		.required('Email is required')
		.test('isUnique', 'Email is in use', (value) => isEmailUnique(value)),
	streetname: yup.string()
		.min(2, 'Street name is too short')
		.required('Street name is required'),
	hnumber: yup.number()
		.required('House number is required'),
	anumber: yup.number()
		.required('Apartment number is required'),
	city: yup.string()
		.min(2, 'Too short')
		.required('Required'),
	zipcode: yup.string()
		.matches(/^[0-9]+$/, "Only numbers are allowed for this field ")
		.min(7, 'Too short')
		.max(7, 'Too long')
		.required('Required'),
	pnumber: yup.string()
		.matches(/^[0-9]+$/, "Only numbers are allowed for this field ")
		.min(10, 'Too short')
		.max(10, 'Too long')
		.required('Required'),
	cnumber: yup.string()
		.matches(/^[0-9]+$/, "Only numbers are allowed for this field ")
		.min(16, 'Too short')
		.required('Required'),
	edated: yup.string()
		.matches(/^[0-9]+$/, "Only numbers are allowed for this field ")
		.required('Required'),
	edatem: yup.string()
		.matches(/^[0-9]+$/, "Only numbers are allowed for this field ")
		.required('Required'),
	cvv: yup.string()
		.matches(/^[0-9]+$/, "Only numbers are allowed for this field ")
		.min(1, 'Too short')
		.required('Required')
});




async function isEmailUnique(value) {
	const result = await usersService.checkEmail(value)
	return result
}
