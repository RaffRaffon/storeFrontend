import * as yup from 'yup';
import { usersService } from '../services/users.service';
export const personalinfoSchema = yup.object().shape({
	flname: yup.string()
		.min(2, 'Name is too short')
		.max(40, 'Name is too long')
		.required('Name is required'),
	email: yup.string()
		.email('Email is invalid')
		.required('Email is required')
		.test('isUnique', 'Email is in use', (value) => isEmailUnique(value)),
	password: yup.string()
		.min(6, 'Password is too short')
		.max(16, 'Password is too long'),
	vpassword: yup.string()
		.min(6, 'Password is too short')
		.max(16, 'Password is too long')
		.oneOf([yup.ref('password')],'Passwords must match'),
	address: yup.string()
		.min(2, 'Address is too short')
		.max(40, 'Address is too long')
		.required('Address is required'),
	hnumber: yup.number()
		.required('House number is required'),
	anumber: yup.number()
		.required('Apartment number is required'),
	city: yup.string()
		.min(2, 'Too short')
		.required('Required'),
	zipcode: yup.string()
		.min(7, 'Too short')
		.max(7, 'Too long')
		.required('Required'),
	pnumber: yup.string()
		.min(10, 'Too short')
		.max(10, 'Too long')
		.required('Required')
});




async function isEmailUnique(value) {
	const result = await usersService.checkEmail(value)
	return result
}
