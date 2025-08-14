// /api/send-email.js - Función serverless para envío de emails
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    // *** HEADERS CORS PRIMERO - ANTES DE CUALQUIER VALIDACIÓN ***
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Manejar preflight OPTIONS
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // LUEGO validar que sea POST
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            success: false, 
            error: 'Method not allowed' 
        });
    }

    try {
        const { 
            customerEmail, 
            customerName, 
            businessName, 
            workbotHtml, 
            sector = 'gym',
            includeInstallation = false 
        } = req.body;

        // Validaciones básicas
        if (!customerEmail || !customerName || !businessName || !workbotHtml) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: customerEmail, customerName, businessName, workbotHtml'
            });
        }

        // Configurar transporter para Mailhostbox
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.mailhostbox.com',
            port: parseInt(process.env.SMTP_PORT) || 587,
            secure: false, // false para 587, true para 465
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Verificar conexión SMTP
        await transporter.verify();
        console.log('📧 SMTP connection verified');

        // Generar nombre del archivo
        const sanitizedBusinessName = businessName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
        const filename = `workbot_${sanitizedBusinessName}.html`;

        // HTML del email principal
        const emailHTML = generateEmailTemplate({
            customerName,
            businessName,
            sector,
            includeInstallation
        });

        // Configurar email principal al cliente
        const mailOptions = {
            from: `"Unichatia WorkBot" <${process.env.SMTP_USER}>`,
            to: customerEmail,
            subject: `🎉 Tu WorkBot para ${businessName} está listo! - Unichatia`,
            html: emailHTML,
            attachments: [
                {
                    filename: filename,
                    content: workbotHtml,
                    contentType: 'text/html'
                }
            ]
        };

        // Enviar email principal
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent to customer:', info.messageId);

        // Si incluye instalación asistida, enviar email al equipo
        if (includeInstallation) {
            await sendInstallationEmail(transporter, {
                customerEmail,
                customerName,
                businessName,
                sector,
                workbotHtml
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Email sent successfully',
            messageId: info.messageId
        });

    } catch (error) {
        console.error('❌ Email error:', error);
        return res.status(500).json({
            success: false,
            error: 'Failed to send email',
            details: error.message
        });
    }
}

// Función para generar template del email principal
function generateEmailTemplate({ customerName, businessName, sector, includeInstallation }) {
    const sectorEmojis = {
        gym: '💪',
        restaurant: '🍽️',
        clinic: '🏥',
        lawyer: '⚖️',
        ecommerce: '🛒',
        dentist: '🦷'
    };

    const sectorNames = {
        gym: 'Gimnasio',
        restaurant: 'Restaurante',
        clinic: 'Clínica',
        lawyer: 'Despacho',
        ecommerce: 'Tienda Online',
        dentist: 'Clínica Dental'
    };

    const emoji = sectorEmojis[sector] || '🤖';
    const sectorName = sectorNames[sector] || 'Negocio';
    
    // Definir sanitizedBusinessName aquí
    const sanitizedBusinessName = businessName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();

    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tu WorkBot está listo</title>
        <style>
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                line-height: 1.6; 
                color: #333; 
                margin: 0; 
                padding: 0; 
                background: #f8f9fa; 
            }
            .container { 
                max-width: 600px; 
                margin: 0 auto; 
                background: white; 
                border-radius: 12px; 
                overflow: hidden; 
                box-shadow: 0 4px 20px rgba(0,0,0,0.1); 
            }
            .header { 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                color: white; 
                padding: 30px; 
                text-align: center; 
            }
            .header h1 { 
                margin: 0; 
                font-size: 28px; 
                font-weight: 600; 
            }
            .content { 
                padding: 30px; 
            }
            .success-box { 
                background: #d4edda; 
                border: 1px solid #c3e6cb; 
                padding: 20px; 
                border-radius: 8px; 
                margin: 20px 0; 
                text-align: center; 
            }
            .feature-list { 
                background: #f8f9fa; 
                padding: 20px; 
                border-radius: 8px; 
                margin: 20px 0; 
            }
            .feature-list ul { 
                margin: 0; 
                padding-left: 20px; 
            }
            .feature-list li { 
                margin: 8px 0; 
            }
            .installation-note { 
                background: #fff3cd; 
                border: 1px solid #ffeaa7; 
                padding: 20px; 
                border-radius: 8px; 
                margin: 20px 0; 
            }
            .cta-button { 
                display: inline-block; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                color: white; 
                padding: 15px 30px; 
                text-decoration: none; 
                border-radius: 25px; 
                font-weight: 600; 
                margin: 10px 0; 
            }
            .footer { 
                background: #f8f9fa; 
                padding: 20px; 
                text-align: center; 
                color: #666; 
                font-size: 14px; 
            }
            .instructions { 
                background: #e3f2fd; 
                padding: 20px; 
                border-radius: 8px; 
                margin: 20px 0; 
            }
            .step { 
                margin: 10px 0; 
                padding: 10px 0; 
                border-bottom: 1px solid #ddd; 
            }
            .step:last-child { 
                border-bottom: none; 
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>${emoji} ¡Tu WorkBot está Listo!</h1>
                <p>WorkBot profesional para ${businessName}</p>
            </div>
            
            <div class="content">
                <p>Hola <strong>${customerName}</strong>,</p>
                
                <div class="success-box">
                    <h3>🎉 ¡Generación Completada!</h3>
                    <p>Tu WorkBot para <strong>${businessName}</strong> ha sido generado exitosamente y está adjunto a este email.</p>
                </div>

                <div class="feature-list">
                    <h4>${emoji} Tu WorkBot ${sectorName} incluye:</h4>
                    <ul>
                        <li>✅ <strong>30+ FAQs específicas</strong> para ${sectorNames[sector] || 'tu sector'}</li>
                        <li>✅ <strong>Funciona 24/7</strong> sin mantenimiento</li>
                        <li>✅ <strong>Responsive</strong> - perfecto en móvil y desktop</li>
                        <li>✅ <strong>Colores personalizados</strong> de tu marca</li>
                        <li>✅ <strong>Captura de leads</strong> automática por email</li>
                        <li>✅ <strong>Listo para instalar</strong> en tu sitio web</li>
                    </ul>
                </div>

                <div class="instructions">
                    <h4>🔧 Cómo Instalar tu WorkBot:</h4>
                    
                    <div class="step">
                        <strong>1. Descargar:</strong> Guarda el archivo HTML adjunto en tu ordenador
                    </div>
                    
                    <div class="step">
                        <strong>2. Subir a tu web:</strong> Sube el archivo a tu hosting via FTP, cPanel, o tu gestor de archivos
                    </div>
                    
                    <div class="step">
                        <strong>3. Vincular:</strong> Agrega este código antes del &lt;/body&gt; de tu web:
                        <div style="background: #f1f3f4; padding: 10px; border-radius: 4px; margin: 10px 0; font-family: monospace; font-size: 13px;">
                            &lt;script src="workbot_${sanitizedBusinessName}.html"&gt;&lt;/script&gt;
                        </div>
                    </div>
                    
                    <div class="step">
                        <strong>4. ¡Listo!</strong> Tu WorkBot aparecerá automáticamente en la esquina inferior derecha
                    </div>
                </div>

                ${includeInstallation ? `
                <div class="installation-note">
                    <h4>🛠️ Instalación Asistida Incluida</h4>
                    <p><strong>¡No te preocupes por la instalación!</strong> Nuestro equipo técnico se encargará de todo:</p>
                    <ul>
                        <li>✅ Instalaremos tu WorkBot en menos de 24 horas</li>
                        <li>✅ Te confirmaremos cuando esté funcionando</li>
                        <li>✅ Testing completo en móvil y desktop</li>
                        <li>✅ Soporte técnico incluido</li>
                    </ul>
                    <p>Te contactaremos pronto para coordinar la instalación.</p>
                </div>
                ` : ''}

                <div style="text-align: center; margin: 30px 0;">
                    <a href="https://unichatia.com/soporte" class="cta-button">
                        📞 ¿Necesitas Ayuda?
                    </a>
                </div>

                <p><strong>¿Quieres modificar algo?</strong> Ve a <a href="https://unichatia.com/${sector}.html">unichatia.com/${sector}.html</a>, haz click en "Actualizar Existente", pega tu código y modifica lo que necesites por solo 5€.</p>

                <p>¡Gracias por elegir Unichatia! 🚀</p>
                
                <p>Saludos,<br>
                <strong>El equipo de Unichatia</strong></p>
            </div>

            <div class="footer">
                <p>© 2025 Unichatia - WorkBot Generator Profesional</p>
                <p>🌐 <a href="https://unichatia.com">unichatia.com</a> | 📧 <a href="mailto:soporte@unichatia.com">soporte@unichatia.com</a></p>
            </div>
        </div>
    </body>
    </html>`;
}

// Función para enviar email al equipo sobre instalación asistida
async function sendInstallationEmail(transporter, { customerEmail, customerName, businessName, sector, workbotHtml }) {
    const teamEmailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #ff6b35; color: white; padding: 20px; border-radius: 8px; }
            .info-box { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .urgent { background: #fff3cd; padding: 15px; border-radius: 8px; margin: 15px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>🛠️ NUEVA INSTALACIÓN ASISTIDA - WorkBot</h2>
            </div>
            
            <div class="urgent">
                <h3>⏰ ACCIÓN REQUERIDA - SLA: 24 horas</h3>
                <p><strong>Cliente:</strong> ${customerName}</p>
                <p><strong>Email:</strong> ${customerEmail}</p>
                <p><strong>Negocio:</strong> ${businessName}</p>
                <p><strong>Sector:</strong> ${sector}</p>
            </div>

            <div class="info-box">
                <h4>📋 Información del Cliente:</h4>
                <p><strong>Nombre:</strong> ${customerName}</p>
                <p><strong>Email:</strong> ${customerEmail}</p>
                <p><strong>Negocio:</strong> ${businessName}</p>
                <p><strong>Sector:</strong> ${sector}</p>
                <p><strong>Fecha solicitud:</strong> ${new Date().toLocaleString('es-ES')}</p>
            </div>

            <div class="info-box">
                <h4>⚡ Próximos Pasos:</h4>
                <ol>
                    <li>Contactar cliente en 2-4 horas</li>
                    <li>Solicitar URL del sitio web</li>
                    <li>Instalar WorkBot en menos de 24h</li>
                    <li>Testing móvil/desktop</li>
                    <li>Confirmar instalación al cliente</li>
                </ol>
            </div>

            <p><strong>El WorkBot HTML está adjunto a este email.</strong></p>
            
            <p>Saludos,<br>Sistema Unichatia</p>
        </div>
    </body>
    </html>`;

    const teamMailOptions = {
        from: `"Unichatia System" <${process.env.SMTP_USER}>`,
        to: process.env.TEAM_EMAIL || process.env.SMTP_USER,
        subject: `🚨 INSTALACIÓN ASISTIDA: ${businessName} - ${sector} - SLA 24h`,
        html: teamEmailHTML,
        attachments: [
            {
                filename: `workbot_${businessName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}.html`,
                content: workbotHtml,
                contentType: 'text/html'
            }
        ]
    };

    const teamInfo = await transporter.sendMail(teamMailOptions);
    console.log('✅ Team notification sent:', teamInfo.messageId);
}
