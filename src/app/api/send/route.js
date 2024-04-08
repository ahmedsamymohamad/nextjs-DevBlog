import { EmailTemplate } from '../../components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req,res) {
  const body = await req.json();
  try {
    if (!body || !body.email || !body.message) {
      throw new Error('Email or message missing in request body');
    }

    const data = await resend.emails.send({
      from: 'DevBlog <onboarding@resend.dev>',
      to: ['ahmed01223330@gmail.com'],
      subject: 'Contact Form',
      react: EmailTemplate({ email: body.email, message: body.message }),
      reply_to:body.email,
    });
    
    return Response.json(data);
  } catch (error) {
    console.log('Error sending email: ', error);
    return Response.json({ error: error.message });
  }
}
