const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: '*'
}));
app.use(express.json());

app.post('/send-initiation', async (req, res) => {
    const { plan_name, plan_price, payment_method, user_email } = req.body;

    const transporter = nodemailer.createTransport({
        host: "mail.enterthevelvetorder.com", 
        port: 465, // usually 465 for secure SMTP
        secure: true,
        auth: {
        user: 'support@enterthevelvetorder.com',
        pass: '.W-cbqWJmdd7',
        },
    });

    const mailOptions = {
        from: `"Velvet Order" <support@enterthevelvetorder.com>`,
        to: user_email,
        subject: `🕯️ New Initiation: ${plan_name} Membership`,
        html: `
            <div style="background: #0e0b16; color: #e0d4b7; font-family: 'Georgia', serif; padding: 2rem; border: 1px solid #8a0303; border-radius: 10px; max-width: 600px; margin: auto;">
            <h1 style="color: #d4af37; font-family: 'Cinzel', serif; font-size: 28px; text-align: center;">Welcome, Initiate of the Velvet Order</h1>

            <p style="font-size: 16px; line-height: 1.6; margin-top: 2rem;">
                Greetings <strong style="color: #f8c471;">${user_email}</strong>,
            </p>

            <p style="font-size: 16px; line-height: 1.6;">
                The sacred Ritual of Entry has been completed on your behalf.
                You have chosen the <strong style="color: #d4af37;">${plan_name}</strong> membership at <strong>${plan_price}</strong>, opting to use <strong>${payment_method}</strong> as your payment vessel.
            </p>

            <p style="font-size: 16px; line-height: 1.6;">
                The Order acknowledges your devotion and seeks to guide you further into the Veil. Your presence has been felt in the chambers.
            </p>

            <blockquote style="margin-top: 2rem; font-style: italic; color: #ccc; border-left: 3px solid #8a0303; padding-left: 1rem;">
                “Those who dare step into the shadows shall awaken in the light.”
            </blockquote>

            <hr style="margin: 2rem 0; border: none; border-top: 1px solid #8a0303;" />

            <p style="margin-top: 2rem; font-size: 14px; color: #999;">
                🔮 This message was divined by the High Seers of the Order.<br/>
                If you received this in error, the spirits may have erred — or you may be chosen still.
            </p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Email sent" });
    } catch (error) {
        console.error("Email sending error:", error);
        res.status(500).send({ error: "Email not sent" });
    }

});

app.post('/send_welcome_mail', async(req, res) => {
    const { ritualName, email } = req.body;

    const transporter = nodemailer.createTransport({
        host: "mail.enterthevelvetorder.com", 
        port: 465, // usually 465 for secure SMTP
        secure: true,
        auth: {
        user: 'support@enterthevelvetorder.com',
        pass: '.W-cbqWJmdd7',
        },
    });

    // HTML Email Template Function
    function getWelcomeEmailHTML(ritualName) {
        return `
            <div style="background: #0e0b16; color: #e0d4b7; font-family: Georgia, serif; padding: 2rem; border: 1px solid #8a0303; border-radius: 10px; max-width: 600px; margin: auto;">
            <h1 style="color: #d4af37; font-family: Cinzel, serif; font-size: 28px; text-align: center;">Welcome to the Velvet Order</h1>
            <p style="font-size: 16px; line-height: 1.6;">Dear <strong style="color: #f8c471;">${ritualName}</strong>,</p>
            <p style="font-size: 16px; line-height: 1.6;">You have taken your first step toward an ancient path, where mysticism and eroticism converge beneath the Veil. The Velvet Order welcomes you with reverence.</p>
            <p style="font-size: 16px; line-height: 1.6;">To proceed with your Initiation, choose your path of ascension:</p>
            <h2 style="color: #d4af37; font-size: 20px; margin-top: 1.5rem;">🔹 Regular Membership</h2>
            <ul style="font-size: 16px; line-height: 1.6; padding-left: 1rem;">
                <li><strong>Sacred Rituals:</strong> Join private ceremonies weaving spiritual and sensual awakening.</li>
                <li><strong>Elite Inner Circle:</strong> Commune with our most devoted initiates in a discreet sanctuary.</li>
                <li><strong>Esoteric Teachings:</strong> Access mystical knowledge for inner transformation.</li>
                <li><strong>Priority Event Access:</strong> Receive invitations to clandestine gatherings.</li>
            </ul>
            <h2 style="color: #d4af37; font-size: 20px; margin-top: 1.5rem;">🔸 Premium Membership</h2>
            <ul style="font-size: 16px; line-height: 1.6; padding-left: 1rem;">
                <li><strong>Everything in Regular, plus:</strong></li>
                <li><strong>Premium Mentorship:</strong> Receive direct guidance from our High Mystics.</li>
                <li><strong>Secret Archives:</strong> Unlock rare, sacred texts on mystic-erotic traditions.</li>
            </ul>
            <blockquote style="margin-top: 2rem; font-style: italic; color: #ccc; border-left: 3px solid #8a0303; padding-left: 1rem;">
                “The Veil lifts for those who are willing to see beyond.”
            </blockquote>
            <p style="margin-top: 2rem; font-size: 14px; color: #999;">
                🔮 This message was conjured by the High Seers of the Order.<br/>
                If you received this in error, the Shadows may still be calling.
            </p>
            </div>
        `;
    }

    const mailOptions = {
        from: `"Velvet Order" <support@enterthevelvetorder.com>`,
        to: email,
        subject: `🕯️ Your Velvet Order Initiation Awaits`,
        html: getWelcomeEmailHTML(ritualName)
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Email sent" });
    } catch (error) {
        console.error("Email sending error:", error);
        res.status(500).send({ error: "Email not sent" });
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))