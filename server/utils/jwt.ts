import dayjs from 'dayjs';
import jwt from 'jsonwebtoken'

export function issueToken(payload: string) {

	const config = useRuntimeConfig()
	// const iss = dayjs(Date.now())

	const token = jwt.sign(payload, config.jwt.key, {
		expiresIn: config.jwt.exp,
		issuer: 'contour-app'
	});

	return token
}


