import * as yup from 'yup';
import { usersService } from '../services/users.service';
export const registerSchema = yup.object().shape({
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
		.max(16, 'Password is too long')
		.required('Password is required'),
	vpassword: yup.string()
		.min(6, 'Password is too short')
		.max(16, 'Password is too long')
		.required('Password is required')
		.oneOf([yup.ref('password')],'Passwords must match')
});




async function isEmailUnique(value) {
	const result = await usersService.checkEmail(value)
	return result
}
