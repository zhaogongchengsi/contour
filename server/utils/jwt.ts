import jwt from 'jsonwebtoken'
import ms from 'ms'

export function issueToken(payload: string) {

	const config = useRuntimeConfig()
	const iss = Date.now()
	const exp = iss + ms(config.jwt.exp as string || '1h') 

	const token = jwt.sign({
		exp: exp,
		data: payload
	}, config.jwt.key, {
		issuer: 'contour-app'
	});

	return {
		token,
		exp,
		iss
	}
}


