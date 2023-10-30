import nodemailer from 'nodemailer'

export function useNodemailer() {
	const { email } = useRuntimeConfig()
	const transporter = nodemailer.createTransport({
		// service: 'mail.163',
		host: 'smtp.163.com',
		port: 25,
		auth: {
			user: email.user, // 发送方的邮箱地址
			pass: email.pass // 发送方的邮箱密码或授权码
		}
	});

	const mailOptions = {
		from: email.user, // 发送方的邮箱地址
		to: "zzh1586169624@163.com", // 接收方的邮箱地址
		subject: "Hello from Node.js", // 邮件主题
		text: "This is a test email sent from Node.js." // 邮件正文
	};

	return () => {
		transporter.sendMail(mailOptions)
	}
}