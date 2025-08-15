// api/stripe-webhook.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');

// Configuración SMTP
const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// Función para generar WorkBot (reutilizando lógica existente)
function generateWorkBotHTML(formData) {
    const {
        businessName = 'Mi Gimnasio',
        phone = '',
        email = '',
        address = '',
        website = '',
        weekdayHours = '',
        weekendHours = '',
        holidays = '',
        services = '',
        monthlyFee = '',
        dayPassPrice = '',
        classTypes = '',
        equipment = '',
        paymentMethods = '',
        parkingInfo = '',
        primaryColor = 'ff6b35',
        secondaryColor = 'f7931e',
        accentColor = 'ffd23f',
        fontFamily = 'Arial, sans-serif',
        borderRadius = '15',
        greeting = '',
        welcomeMessage = '',
        sector = 'gym',
        isUpdate = false
    } = formData;

    // FAQs específicas para gimnasios
    const gymFaqs = [
        {
            keywords: ['horarios', 'horario', 'abierto', 'cerrado', 'cuando'],
            response: `Nuestros horarios son: ${weekdayHours || 'Lunes a viernes de 6:00 a 23:00'} y ${weekendHours || 'fines de semana de 8:00 a 21:00'}. ${holidays || ''}`,
            category: 'horarios'
        },
        {
            keywords: ['precio', 'precios', 'cuota', 'mensualidad', 'cuesta'],
            response: `Nuestra cuota mensual es de ${monthlyFee || 'consultar precios'}. También ofrecemos pases diarios por ${dayPassPrice || 'consultar'}. ¡Pregunta por nuestras promociones!`,
            category: 'precios'
        },
        {
            keywords: ['clases', 'actividades', 'dirigidas', 'spinning', 'yoga'],
            response: `Ofrecemos: ${classTypes || 'spinning, yoga, pilates, zumba, crossfit'}. ¡Consulta horarios y apúntate en recepción!`,
            category: 'clases'
        },
        {
            keywords: ['equipamiento', 'maquinas', 'peso', 'cardio'],
            response: `Contamos con: ${equipment || 'zona de cardio completa, máquinas de peso, zona de peso libre, functional training'}. ¡Todo el equipamiento más moderno!`,
            category: 'equipment'
        },
        {
            keywords: ['ubicacion', 'donde', 'dirección', 'como llegar'],
            response: `Estamos en ${address || 'consulta nuestra ubicación'}. ${parkingInfo || 'Fácil acceso y parking disponible'}.`,
            category: 'ubicacion'
        },
        {
            keywords: ['pago', 'tarjeta', 'efectivo', 'domiciliacion'],
            response: `Aceptamos: ${paymentMethods || 'efectivo, tarjeta, domiciliación bancaria'}. ¡Elige la forma que prefieras!`,
            category: 'pago'
        }
    ];

    const workbotHtml = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${businessName} - WorkBot Asistente</title>
    <!-- Unichatia WorkBot v3.1 -->
    <!-- Generated: ${new Date().toISOString()} -->
    <!-- Sector: gym -->
    <!-- Business: ${businessName} -->
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        .workbot-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 999999;
            font-family: ${fontFamily};
        }
        
        .workbot-toggle {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #${primaryColor} 0%, #${secondaryColor} 100%);
            border: none;
            border-radius: ${borderRadius}px;
            color: white;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .workbot-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        }
        
        .workbot-window {
            position: absolute;
            bottom: 80px;
            right: 0;
            width: 350px;
            height: 500px;
            background: white;
            border-radius: ${borderRadius}px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            display: none;
            flex-direction: column;
            overflow: hidden;
        }
        
        .workbot-header {
            background: linear-gradient(135deg, #${primaryColor} 0%, #${secondaryColor} 100%);
            color: white;
            padding: 20px;
            text-align: center;
        }
        
        .workbot-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .message {
            max-width: 80%;
            padding: 12px 16px;
            border-radius: ${borderRadius}px;
            font-size: 14px;
            line-height: 1.4;
        }
        
        .message.bot {
            background: #f1f3f5;
            color: #333;
            align-self: flex-start;
            border-bottom-left-radius: 5px;
        }
        
        .message.user {
            background: linear-gradient(135deg, #${primaryColor} 0%, #${secondaryColor} 100%);
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 5px;
        }
        
        .workbot-input {
            padding: 20px;
            border-top: 1px solid #eee;
            display: flex;
            gap: 10px;
        }
        
        .workbot-input input {
            flex: 1;
            padding: 12px 16px;
            border: 2px solid #eee;
            border-radius: 25px;
            outline: none;
            font-size: 14px;
        }
        
        .workbot-input button {
            padding: 12px 20px;
            background: linear-gradient(135deg, #${primaryColor} 0%, #${secondaryColor} 100%);
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-size: 14px;
        }
        
        @media (max-width: 480px) {
            .workbot-window {
                width: 90vw;
                height: 80vh;
                bottom: 90px;
                right: 5vw;
            }
        }
    </style>
</head>
<body>
    <div class="workbot-container">
        <button class="workbot-toggle" onclick="toggleWorkBot()">
            💪
        </button>
        
        <div class="workbot-window" id="workbotWindow">
            <div class="workbot-header">
                <h3>💪 ${businessName}</h3>
                <p>WorkBot Asistente</p>
            </div>
            
            <div class="workbot-messages" id="messages">
                <div class="message bot">
                    ${greeting || `¡Hola! 👋 Soy el WorkBot de ${businessName}.`} ${welcomeMessage || '¿En qué puedo ayudarte? Puedes preguntarme sobre horarios, precios, clases o cualquier consulta.'}
                </div>
            </div>
            
            <div class="workbot-input">
                <input type="text" id="messageInput" placeholder="Escribe tu mensaje...">
                <button onclick="sendMessage()">Enviar</button>
            </div>
        </div>
    </div>

    <script>
        const WORKBOT_CONFIG = {
            businessName: "${businessName}",
            contactInfo: {
                phone: "${phone}",
                email: "${email}",
                address: "${address}",
                website: "${website}"
            },
            schedule: {
                weekdays: "${weekdayHours}",
                weekends: "${weekendHours}",
                holidays: "${holidays}"
            },
            services: "${services}".split(',').map(s => s.trim()).filter(s => s),
            monthlyFee: "${monthlyFee}",
            dayPassPrice: "${dayPassPrice}",
            classTypes: "${classTypes}",
            equipment: "${equipment}",
            paymentMethods: "${paymentMethods}".split(',').map(s => s.trim()).filter(s => s),
            parkingInfo: "${parkingInfo}",
            greeting: "${greeting}",
            welcomeMessage: "${welcomeMessage}",
            styling: {
                primaryColor: "#${primaryColor}",
                secondaryColor: "#${secondaryColor}",
                accentColor: "#${accentColor}",
                fontFamily: "${fontFamily}",
                borderRadius: "${borderRadius}px"
            },
            faqs: ${JSON.stringify(gymFaqs)},
            lastModified: "${new Date().toISOString()}",
            version: "3.1",
            sector: "gym"
        };

        const API_CONFIG = {
            endpoint: "${process.env.API_BASE_URL || 'https://unichatia-backend.vercel.app'}/api/send-lead",
            analyticsEndpoint: "${process.env.API_BASE_URL || 'https://unichatia-backend.vercel.app'}/api/analytics"
        };

        let isOpen = false;

        function toggleWorkBot() {
            const window = document.getElementById('workbotWindow');
            isOpen = !isOpen;
            window.style.display = isOpen ? 'flex' : 'none';
            
            if (isOpen) {
                document.getElementById('messageInput').focus();
            }
            
            // Analytics
            trackEvent('workbot_toggle', { action: isOpen ? 'open' : 'close' });
        }

        function addMessage(text, isUser = false) {
            const messagesContainer = document.getElementById('messages');
            const messageDiv = document.createElement('div');
            messageDiv.className = \`message \${isUser ? 'user' : 'bot'}\`;
            messageDiv.textContent = text;
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function findResponse(message) {
            const lowerMessage = message.toLowerCase();
            
            for (const faq of WORKBOT_CONFIG.faqs) {
                for (const keyword of faq.keywords) {
                    if (lowerMessage.includes(keyword)) {
                        return faq.response;
                    }
                }
            }
            
            return \`Gracias por tu consulta. Para información más específica, puedes llamarnos al \${WORKBOT_CONFIG.contactInfo.phone} o escribirnos a \${WORKBOT_CONFIG.contactInfo.email}. ¡Estaremos encantados de ayudarte! 💪\`;
        }

        function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value.trim();
            
            if (!message) return;
            
            addMessage(message, true);
            input.value = '';
            
            // Simular typing delay
            setTimeout(() => {
                const response = findResponse(message);
                addMessage(response, false);
                
                // Enviar lead si parece una consulta seria
                if (message.length > 10) {
                    sendLead(message, response);
                }
            }, 1000);
            
            // Analytics
            trackEvent('message_sent', { message_length: message.length });
        }

        function sendLead(userMessage, botResponse) {
            fetch(API_CONFIG.endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    businessName: WORKBOT_CONFIG.businessName,
                    sector: 'gym',
                    userMessage,
                    botResponse,
                    contactInfo: WORKBOT_CONFIG.contactInfo,
                    timestamp: new Date().toISOString(),
                    userAgent: navigator.userAgent,
                    source: 'workbot_${sector}'
                })
            }).catch(err => console.log('Lead sending failed:', err));
        }

        function trackEvent(event, data = {}) {
            fetch(API_CONFIG.analyticsEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    event,
                    business: WORKBOT_CONFIG.businessName,
                    sector: 'gym',
                    ...data,
                    timestamp: new Date().toISOString()
                })
            }).catch(err => console.log('Analytics failed:', err));
        }

        // Enter key support
        document.getElementById('messageInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Initial analytics
        trackEvent('workbot_loaded', { business: WORKBOT_CONFIG.businessName });
    </script>
</body>
</html>`;

    return workbotHtml;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        // Verificar la firma del webhook
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log('✅ Webhook signature verified');
    } catch (err) {
        console.error('❌ Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Procesar el evento
    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        console.log('💳 Payment successful:', paymentIntent.id);

        try {
            // Extraer datos del metadata
            const {
                businessName,
                phone,
                email,
                sector,
                isUpdate,
                installationService,
                formDataJson
            } = paymentIntent.metadata;

            // Parsear formData
            let formData;
            try {
                formData = JSON.parse(formDataJson);
            } catch (parseError) {
                console.error('❌ Error parsing formData:', parseError);
                formData = {
                    businessName,
                    phone,
                    email,
                    sector
                };
            }

            console.log('📋 Processing WorkBot for:', businessName);

            // Generar WorkBot HTML
            const workbotHtml = generateWorkBotHTML(formData);
            const fileName = `${businessName.replace(/[^a-zA-Z0-9]/g, '_')}_workbot.html`;

            // Preparar email
            const isUpdateMode = isUpdate === 'true';
            const hasInstallation = installationService === 'true';

            const subject = isUpdateMode 
                ? `✅ Tu WorkBot actualizado está listo - ${businessName}`
                : `🎉 Tu WorkBot está listo - ${businessName}`;

            const htmlContent = `
                <h2>${isUpdateMode ? '🔄 WorkBot Actualizado' : '🎉 Tu WorkBot está Listo'}</h2>
                
                <p>Hola,</p>
                
                <p>¡Excelentes noticias! ${isUpdateMode ? 'Hemos actualizado' : 'Hemos creado'} tu WorkBot para <strong>${businessName}</strong>.</p>

                <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3>✅ ${isUpdateMode ? 'Actualización' : 'Creación'} Completada:</h3>
                    <p><strong>✅ WorkBot generado</strong> - Especializado para ${sector}</p>
                    <p><strong>✅ Optimizado para móvil</strong> - Funciona perfecto en todos los dispositivos</p>
                    <p><strong>✅ FAQs incluidas</strong> - Respuestas automáticas a consultas frecuentes</p>
                    <p><strong>✅ Emails automáticos</strong> - Los leads llegan directamente a ${email}</p>
                    ${hasInstallation ? '<p><strong>🛠️ Instalación asistida</strong> - Lo instalaremos en tu web en 24h</p>' : ''}
                </div>

                ${!hasInstallation ? `
                <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3>📋 Instrucciones de Instalación:</h3>
                    <ol>
                        <li><strong>Descarga</strong> el archivo HTML adjunto</li>
                        <li><strong>Sube</strong> el archivo a tu servidor web</li>
                        <li><strong>Incluye</strong> este código en todas las páginas donde quieras el WorkBot:</li>
                    </ol>
                    <code style="background: #f5f5f5; padding: 10px; display: block; margin: 10px 0;">
                        &lt;script src="/${fileName}"&gt;&lt;/script&gt;
                    </code>
                    <p><strong>💡 ¡Ya está!</strong> Tu WorkBot aparecerá en la esquina inferior derecha.</p>
                </div>
                ` : `
                <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3>🛠️ Instalación Asistida</h3>
                    <p>Nuestro equipo técnico instalará tu WorkBot en las próximas 24 horas.</p>
                    <p>Te contactaremos si necesitamos algún acceso adicional a tu web.</p>
                    <p><strong>¡Relájate, nosotros nos encargamos de todo!</strong></p>
                </div>
                `}

                <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3>🔄 ¿Necesitas Cambios?</h3>
                    <p>Si quieres modificar algo (horarios, teléfono, precios, etc.):</p>
                    <ol>
                        <li>Ve a <a href="https://unichatia.com/${sector}.html">unichatia.com/${sector}.html</a></li>
                        <li>Click en "Actualizar WorkBot Existente"</li>
                        <li>Pega el código de tu WorkBot</li>
                        <li>Haz los cambios y paga 5€</li>
                    </ol>
                    <p><strong>✅ Actualizaciones ilimitadas por solo 5€ cada una</strong></p>
                </div>

                <p><strong>¡Tu WorkBot ya está trabajando para ti! 🚀</strong></p>
                
                <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
                
                <p>¡Gracias por elegir Unichatia!</p>
                
                <p>Saludos,<br>
                El equipo de Unichatia</p>
            `;

            // Enviar email con WorkBot adjunto
            const mailOptions = {
                from: process.env.SMTP_USER,
                to: email,
                subject: subject,
                html: htmlContent,
                attachments: [
                    {
                        filename: fileName,
                        content: workbotHtml,
                        contentType: 'text/html'
                    }
                ]
            };

            await transporter.sendMail(mailOptions);
            console.log('✅ Email sent successfully to:', email);

            // Log del éxito para analytics
            console.log(`🎉 WorkBot ${isUpdateMode ? 'updated' : 'created'} for ${businessName} (${sector})`);

        } catch (error) {
            console.error('❌ Error processing successful payment:', error);
            // No devolvemos error a Stripe para evitar reintentos
        }
    }

    // Responder a Stripe que el webhook fue procesado
    res.json({ received: true });
}
