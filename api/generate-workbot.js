/**
 * UNICHATIA BACKEND - GENERATE WORKBOT API
 * Endpoint: POST /api/generate-workbot
 * Función serverless para Vercel
 */

// Datos del sector gym embebidos (hasta tener base de datos)
const GYM_SECTOR_DATA = {
    "sector": "gym",
    "sectorName": "Gimnasio",
    "description": "WorkBot especializado para gimnasios, centros fitness y centros deportivos",
    "icon": "💪",
    "features": [
        "Gestión de consultas 24/7",
        "Información de horarios y clases",
        "Precios y promociones automáticas",
        "Info de equipamiento e instalaciones",
        "Gestión de pruebas gratuitas"
    ],
    "faqs": [
        {
            "id": "horarios_1",
            "keywords": ["horarios", "horario", "abierto", "cerrado", "cuando", "cuándo", "horas"],
            "response": "Nuestros horarios son: {{WEEKDAY_HOURS}} de lunes a viernes, y {{WEEKEND_HOURS}} los fines de semana.",
            "category": "horarios",
            "priority": 1
        },
        {
            "id": "precios_1",
            "keywords": ["precio", "precios", "cuota", "mensual", "cuesta", "coste", "tarifa"],
            "response": "Nuestras cuotas son: {{PRICE_RANGE}}. {{SPECIAL_OFFERS}} ¡Llámanos al {{PHONE}} para conocer nuestras promociones actuales!",
            "category": "precios",
            "priority": 1
        },
        {
            "id": "clases_1",
            "keywords": ["clases", "clase", "dirigidas", "actividades", "zumba", "spinning", "yoga", "pilates"],
            "response": "Nuestras clases dirigidas incluyen: {{CLASSES}}. {{CLASS_SCHEDULE}} ¡Consulta nuestros horarios!",
            "category": "clases",
            "priority": 1
        },
        {
            "id": "instalaciones_1",
            "keywords": ["instalaciones", "equipamiento", "maquinas", "piscina", "sauna", "vestuarios"],
            "response": "Nuestras instalaciones: {{FACILITIES}}. Contamos con {{EQUIPMENT}}.",
            "category": "instalaciones",
            "priority": 2
        },
        {
            "id": "ubicacion_1",
            "keywords": ["donde", "dónde", "ubicacion", "ubicación", "dirección", "como llegar"],
            "response": "Estamos en {{ADDRESS}}. {{PARKING_INFO}} {{TRANSPORT}}",
            "category": "ubicacion",
            "priority": 1
        },
        {
            "id": "contacto_1",
            "keywords": ["contacto", "telefono", "teléfono", "email", "llamar"],
            "response": "Puedes contactarnos en el {{PHONE}} o escribirnos a {{EMAIL}}. ¡Estaremos encantados de ayudarte!",
            "category": "contacto",
            "priority": 1
        },
        {
            "id": "promociones_1",
            "keywords": ["promocion", "promoción", "oferta", "descuento", "matricula", "matrícula"],
            "response": "{{SPECIAL_OFFERS}} ¡Pregunta por nuestras promociones actuales al {{PHONE}}!",
            "category": "promociones",
            "priority": 2
        },
        {
            "id": "entrenamiento_personal_1",
            "keywords": ["entrenamiento personal", "entrenador personal", "personal trainer"],
            "response": "{{PERSONAL_TRAINING}} Nuestros entrenadores certificados te ayudarán a alcanzar tus objetivos.",
            "category": "servicios",
            "priority": 2
        },
        {
            "id": "principiantes_1",
            "keywords": ["principiante", "empezar", "nuevo", "primera vez"],
            "response": "¡Perfecto para principiantes! {{BEGINNER_PROGRAMS}} Te ayudamos a empezar de forma segura.",
            "category": "principiantes",
            "priority": 2
        },
        {
            "id": "pago_1",
            "keywords": ["pago", "formas de pago", "tarjeta", "efectivo", "domiciliacion"],
            "response": "Aceptamos: {{PAYMENT_METHODS}}. {{CANCELLATION}}",
            "category": "pago",
            "priority": 3
        }
    ],
    "styling": {
        "primaryColor": "#2E8B57",
        "secondaryColor": "#1e40af", 
        "accentColor": "#FFD700",
        "fontFamily": "'Poppins', sans-serif",
        "borderRadius": "15px",
        "sectorTheme": "energetic"
    }
};

/**
 * Procesar FAQs reemplazando variables con datos reales
 */
function processFaqs(formData) {
    const faqs = [...GYM_SECTOR_DATA.faqs];
    
    return faqs.map(faq => {
        let response = faq.response;
        
        // Reemplazar variables estándar
        const replacements = {
            'BUSINESS_NAME': formData.businessName || 'Nuestro gimnasio',
            'PHONE': formData.phone || '',
            'EMAIL': formData.email || '',
            'ADDRESS': formData.address || '',
            'WEBSITE': formData.website || '',
            'WEEKDAY_HOURS': formData.weekdayHours || '6:00-24:00',
            'WEEKEND_HOURS': formData.weekendHours || '8:00-22:00',
            'CLASSES': formData.classes || 'Consulta nuestras clases disponibles',
            'CLASS_SCHEDULE': formData.classSchedule || 'Horarios disponibles en recepción',
            'FACILITIES': formData.facilities || 'Modernas instalaciones',
            'EQUIPMENT': formData.equipment || 'Equipamiento de última generación',
            'PRICE_RANGE': formData.priceRange || 'Consulta nuestras tarifas',
            'SPECIAL_OFFERS': formData.specialOffers || '',
            'PARKING_INFO': formData.parkingInfo || '',
            'TRANSPORT': formData.transport || '',
            'PERSONAL_TRAINING': formData.personalTraining === 'available' ? 'Ofrecemos entrenamiento personal.' : 
                               formData.personalTraining === 'certified' ? 'Tenemos entrenadores personales certificados.' : 
                               'Consulta disponibilidad de entrenamiento personal.',
            'BEGINNER_PROGRAMS': formData.beginnerPrograms || 'Tenemos programas especiales para principiantes.',
            'PAYMENT_METHODS': formData.paymentMethods || 'efectivo, tarjeta, domiciliación bancaria',
            'CANCELLATION': formData.cancellation || 'Consulta nuestra política de cancelación'
        };

        // Reemplazar todas las variables
        Object.keys(replacements).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            response = response.replace(regex, replacements[key]);
        });

        // Limpiar variables no reemplazadas
        response = response.replace(/\{\{[^}]+\}\}/g, '');

        return {
            ...faq,
            response: response
        };
    });
}

/**
 * Generar configuración del WorkBot
 */
function generateWorkBotConfig(formData, processedFaqs) {
    return {
        businessName: formData.businessName,
        sector: 'gym',
        sectorName: 'Gimnasio',
        version: '3.0',
        generated: new Date().toISOString(),
        contactInfo: {
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            website: formData.website
        },
        schedule: {
            weekdays: formData.weekdayHours,
            weekends: formData.weekendHours,
            holidays: formData.holidays
        },
        styling: {
            primaryColor: formData.primaryColor || GYM_SECTOR_DATA.styling.primaryColor,
            secondaryColor: formData.secondaryColor || GYM_SECTOR_DATA.styling.secondaryColor,
            accentColor: formData.accentColor || GYM_SECTOR_DATA.styling.accentColor,
            fontFamily: formData.fontFamily || GYM_SECTOR_DATA.styling.fontFamily,
            borderRadius: formData.borderRadius || parseInt(GYM_SECTOR_DATA.styling.borderRadius),
            workbotSize: formData.workbotSize || 'medium',
            workbotPosition: formData.workbotPosition || 'bottom-right'
        },
        messages: {
            greeting: formData.greeting || `¡Hola! Soy el WorkBot de ${formData.businessName}`,
            welcomeMessage: formData.welcomeMessage || '¿En qué puedo ayudarte? Puedes preguntarme sobre horarios, clases, precios o cualquier consulta.',
            closingMessage: formData.closingMessage || '¡Esperamos verte pronto entrenando con nosotros!',
            offlineMessage: formData.offlineMessage || 'Estamos cerrados ahora, pero puedes escribirnos y te responderemos pronto.'
        },
        faqs: processedFaqs,
        metadata: {
            installationService: formData.installationService || false,
            timestamp: new Date().toISOString(),
            sector: 'gym'
        }
    };
}

/**
 * Generar HTML completo del WorkBot
 */
function generateHTMLTemplate(config, formData) {
    const timestamp = new Date().toLocaleString('es-ES');
    const sizeMap = {
        'small': '320px',
        'medium': '350px',
        'large': '400px'
    };
    const workbotWidth = sizeMap[config.styling.workbotSize];

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WorkBot - ${config.businessName}</title>
    <style>
        /* WORKBOT STYLES */
        .workbot-container {
            position: fixed;
            ${config.styling.workbotPosition.includes('right') ? 'right: 20px;' : 'left: 20px;'}
            ${config.styling.workbotPosition.includes('bottom') ? 'bottom: 20px;' : 'top: 20px;'}
            z-index: 9999;
            font-family: ${config.styling.fontFamily};
        }

        .workbot-toggle {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, ${config.styling.primaryColor} 0%, ${config.styling.secondaryColor} 100%);
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .workbot-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }

        .workbot-window {
            position: absolute;
            ${config.styling.workbotPosition.includes('right') ? 'right: 0;' : 'left: 0;'}
            ${config.styling.workbotPosition.includes('bottom') ? 'bottom: 70px;' : 'top: 70px;'}
            width: ${workbotWidth};
            height: 500px;
            background: white;
            border-radius: ${config.styling.borderRadius}px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            display: none;
            flex-direction: column;
            overflow: hidden;
            animation: workbotSlideIn 0.3s ease;
        }

        .workbot-window.open {
            display: flex;
        }

        @keyframes workbotSlideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .workbot-header {
            background: linear-gradient(135deg, ${config.styling.primaryColor} 0%, ${config.styling.secondaryColor} 100%);
            color: white;
            padding: 20px;
            text-align: center;
        }

        .workbot-header h3 {
            margin: 0 0 5px 0;
            font-size: 18px;
        }

        .workbot-header p {
            margin: 0;
            opacity: 0.9;
            font-size: 14px;
        }

        .workbot-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .workbot-message {
            max-width: 85%;
            padding: 12px 16px;
            border-radius: ${config.styling.borderRadius}px;
            font-size: 14px;
            line-height: 1.4;
            animation: messageSlide 0.3s ease;
        }

        .workbot-message.bot {
            background: #f1f3f5;
            color: #333;
            align-self: flex-start;
            border-bottom-left-radius: 5px;
        }

        .workbot-message.user {
            background: linear-gradient(135deg, ${config.styling.primaryColor} 0%, ${config.styling.secondaryColor} 100%);
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 5px;
        }

        @keyframes messageSlide {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .typing-indicator {
            background: #f1f3f5;
            padding: 12px 16px;
            border-radius: ${config.styling.borderRadius}px;
            border-bottom-left-radius: 5px;
            max-width: 85%;
            align-self: flex-start;
            display: none;
        }

        .typing-dots {
            display: flex;
            gap: 3px;
        }

        .typing-dot {
            width: 6px;
            height: 6px;
            background: #999;
            border-radius: 50%;
            animation: typing 1.4s infinite;
        }

        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typing {
            0%, 60%, 100% { transform: scale(1); opacity: 0.7; }
            30% { transform: scale(1.2); opacity: 1; }
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
            border-radius: ${Math.floor(config.styling.borderRadius * 1.5)}px;
            outline: none;
            font-size: 14px;
            transition: border-color 0.3s ease;
        }

        .workbot-input input:focus {
            border-color: ${config.styling.primaryColor};
        }

        .workbot-input button {
            padding: 12px 20px;
            background: linear-gradient(135deg, ${config.styling.primaryColor} 0%, ${config.styling.secondaryColor} 100%);
            color: white;
            border: none;
            border-radius: ${Math.floor(config.styling.borderRadius * 1.5)}px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .workbot-input button:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
            .workbot-container {
                right: 10px;
                bottom: 10px;
            }
            
            .workbot-window {
                width: 90vw;
                max-width: 350px;
            }
        }
    </style>
</head>
<body>
    <!-- WorkBot Container -->
    <div class="workbot-container" id="workbotContainer">
        <!-- Toggle Button -->
        <button class="workbot-toggle" id="workbotToggle">
            💬
        </button>

        <!-- WorkBot Window -->
        <div class="workbot-window" id="workbotWindow">
            <!-- Header -->
            <div class="workbot-header">
                <h3>${config.businessName}</h3>
                <p>💪 WorkBot Asistente</p>
            </div>

            <!-- Messages Area -->
            <div class="workbot-messages" id="workbotMessages">
                <div class="workbot-message bot">
                    ${config.messages.greeting} 👋
                </div>
                <div class="workbot-message bot">
                    ${config.messages.welcomeMessage}
                </div>
            </div>

            <!-- Typing Indicator -->
            <div class="typing-indicator" id="typingIndicator">
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>

            <!-- Input Area -->
            <div class="workbot-input">
                <input type="text" id="workbotInput" placeholder="Escribe tu mensaje...">
                <button onclick="sendMessage()">Enviar</button>
            </div>
        </div>
    </div>

    <script>
        // Configuración del WorkBot
        const WORKBOT_CONFIG = ${JSON.stringify(config, null, 8)};

        const API_CONFIG = {
            leadEndpoint: 'https://unichatia-backend.vercel.app/api/send-lead',
            fallbackEmail: '${config.contactInfo.email}'
        };

        // Variables globales
        let isWorkbotOpen = false;
        let isTyping = false;
        let leadCaptured = false;
        let currentContext = null;

        // Inicializar WorkBot
        document.addEventListener('DOMContentLoaded', function() {
            initializeWorkBot();
        });

        function initializeWorkBot() {
            const toggle = document.getElementById('workbotToggle');
            const window = document.getElementById('workbotWindow');
            const input = document.getElementById('workbotInput');

            toggle.addEventListener('click', toggleWorkBot);
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });

            console.log('✅ WorkBot inicializado para ${config.businessName}');
        }

        function toggleWorkBot() {
            const window = document.getElementById('workbotWindow');
            isWorkbotOpen = !isWorkbotOpen;
            
            if (isWorkbotOpen) {
                window.classList.add('open');
                document.getElementById('workbotInput').focus();
                trackEvent('workbot_opened');
            } else {
                window.classList.remove('open');
                trackEvent('workbot_closed');
            }
        }

        function sendMessage() {
            const input = document.getElementById('workbotInput');
            const message = input.value.trim();
            
            if (!message) return;
            
            addMessage(message, true);
            input.value = '';
            
            showTyping();
            
            // Simular delay de respuesta
            setTimeout(() => {
                hideTyping();
                const response = findResponse(message);
                addMessage(response, false);
                checkLeadCapture(message, response);
                trackEvent('message_sent', { message: message });
            }, 1000 + Math.random() * 1000);
        }

        function addMessage(text, isUser = false) {
            const messagesContainer = document.getElementById('workbotMessages');
            const messageDiv = document.createElement('div');
            messageDiv.className = \`workbot-message \${isUser ? 'user' : 'bot'}\`;
            messageDiv.textContent = text;
            messagesContainer.appendChild(messageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function findResponse(userMessage) {
            const lowerMessage = userMessage.toLowerCase();
            const faqs = WORKBOT_CONFIG.faqs;
            
            // Buscar respuesta en FAQs
            for (const faq of faqs) {
                for (const keyword of faq.keywords) {
                    if (lowerMessage.includes(keyword.toLowerCase())) {
                        return faq.response;
                    }
                }
            }
            
            // Respuesta por defecto
            const defaultResponses = [
                \`Gracias por tu consulta. Para información más específica, puedes llamarnos al \${WORKBOT_CONFIG.contactInfo.phone} o escribirnos a \${WORKBOT_CONFIG.contactInfo.email}. ¡Estaremos encantados de ayudarte! 😊\`,
                \`¡Excelente pregunta! Si necesitas información detallada, no dudes en contactarnos al \${WORKBOT_CONFIG.contactInfo.phone}. Nuestro equipo te dará toda la información que necesitas.\`,
                \`Me alegra que te intereses por \${WORKBOT_CONFIG.businessName}. Para consultas específicas, puedes llamarnos al \${WORKBOT_CONFIG.contactInfo.phone}. ¡Te esperamos!\`
            ];
            
            return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
        }

        function checkLeadCapture(userMessage, botResponse) {
            if (leadCaptured) return;

            const leadKeywords = ['precio', 'cuánto', 'cuesta', 'contacto', 'llamar', 'horario', 'visita', 'prueba'];
            const hasLeadIntent = leadKeywords.some(keyword => 
                userMessage.toLowerCase().includes(keyword)
            );

            if (hasLeadIntent) {
                setTimeout(() => {
                    requestContactInfo();
                }, 2000);
            }
        }

        function requestContactInfo() {
            const leadMessage = \`¡Perfecto! 😊 Si quieres que te contactemos personalmente para darte más información, déjanos tu email o teléfono y nuestro equipo se pondrá en contacto contigo.\`;
            
            addMessage(leadMessage, false);
            currentContext = 'lead_capture';
        }

        function captureLead(contactInfo) {
            if (leadCaptured) return;
            
            leadCaptured = true;
            
            const leadData = {
                contactInfo: contactInfo,
                businessName: WORKBOT_CONFIG.businessName,
                timestamp: new Date().toISOString(),
                context: currentContext,
                userAgent: navigator.userAgent,
                referrer: document.referrer || 'direct'
            };

            // Send to API
            sendLeadToAPI(leadData);

            // Confirmation message
            const confirmationMessage = WORKBOT_CONFIG.messages.closingMessage || \`¡Genial! 🎉 Hemos recibido tu información. Nuestro equipo de \${WORKBOT_CONFIG.businessName} se pondrá en contacto contigo pronto.\`;
            
            addMessage(confirmationMessage, false);
            trackEvent('lead_captured', leadData);
        }

        async function sendLeadToAPI(leadData) {
            try {
                const response = await fetch(API_CONFIG.leadEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(leadData)
                });

                if (response.ok) {
                    console.log('✅ Lead enviado correctamente');
                } else {
                    console.error('❌ Error enviando lead');
                }
            } catch (error) {
                console.error('❌ Error de red enviando lead:', error);
            }
        }

        function showTyping() {
            if (isTyping) return;
            isTyping = true;
            document.getElementById('typingIndicator').style.display = 'block';
            document.getElementById('workbotMessages').scrollTop = document.getElementById('workbotMessages').scrollHeight;
        }

        function hideTyping() {
            isTyping = false;
            document.getElementById('typingIndicator').style.display = 'none';
        }

        function trackEvent(eventName, data = {}) {
            // Google Analytics 4
            if (typeof gtag !== 'undefined') {
                gtag('event', eventName, {
                    business_name: WORKBOT_CONFIG.businessName,
                    sector: WORKBOT_CONFIG.sector,
                    ...data
                });
            }

            // Console log para debugging
            console.log(\`📊 Event: \${eventName}\`, data);
        }

        // Detectar intención de lead en input
        const input = document.getElementById('workbotInput');
        if (input && currentContext === 'lead_capture') {
            const handleLeadInput = (e) => {
                if (e.key === 'Enter') {
                    const contactInfo = e.target.value.trim();
                    if (contactInfo && (contactInfo.includes('@') || /\d{9}/.test(contactInfo))) {
                        captureLead(contactInfo);
                    }
                }
            };
            
            input.addEventListener('keypress', handleLeadInput);
        }
    </script>

    <!-- Unichatia Signature Comment -->
    <!-- Unichatia WorkBot v${config.version} -->
    <!-- Generated: ${timestamp} -->
    <!-- Sector: ${config.sector} -->
    <!-- Business: ${config.businessName} -->
    <!-- Visit unichatia.com for updates -->

</body>
</html>`;
}

/**
 * Validar datos del formulario
 */
function validateFormData(formData) {
    const errors = [];
    
    if (!formData.businessName || formData.businessName.trim().length < 2) {
        errors.push('Nombre del gimnasio es obligatorio');
    }
    
    if (!formData.phone || formData.phone.trim().length < 9) {
        errors.push('Teléfono válido es obligatorio');
    }
    
    if (!formData.email || !formData.email.includes('@')) {
        errors.push('Email válido es obligatorio');
    }
    
    return errors;
}

/**
 * FUNCIÓN PRINCIPAL - Endpoint serverless
 * *** CORREGIDO A COMMONJS ***
 */
module.exports = async (req, res) => {
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Manejar preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // Solo permitir POST
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            success: false, 
            error: 'Method not allowed' 
        });
    }
    
    try {
        console.log('🚀 Generate WorkBot Request received');
        console.log('📋 Data:', req.body);
        
        const formData = req.body;
        
        // Validar datos
        const validationErrors = validateFormData(formData);
        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                error: 'Validation errors',
                details: validationErrors
            });
        }
        
        // Procesar FAQs
        const processedFaqs = processFaqs(formData);
        
        // Generar configuración
        const workbotConfig = generateWorkBotConfig(formData, processedFaqs);
        
        // Generar HTML completo
        const workbotHTML = generateHTMLTemplate(workbotConfig, formData);
        
        // Generar nombre de archivo
        const filename = `${formData.businessName.replace(/\s+/g, '-').toLowerCase()}-workbot.html`;
        
        console.log('✅ WorkBot generated successfully');
        console.log(`📄 Filename: ${filename}`);
        console.log(`📏 HTML size: ${workbotHTML.length} characters`);
        
        // Respuesta con HTML generado
        return res.status(200).json({
            success: true,
            message: 'WorkBot generado correctamente',
            data: {
                html: workbotHTML,
                filename: filename,
                businessName: formData.businessName,
                sector: 'gym',
                timestamp: new Date().toISOString(),
                metadata: {
                    faqsCount: processedFaqs.length,
                    installationService: formData.installationService || false,
                    version: '3.0'
                }
            }
        });
        
    } catch (error) {
        console.error('❌ Error generating WorkBot:', error);
        
        return res.status(500).json({
            success: false,
            error: 'Error interno del servidor',
            message: error.message
        });
    }
};
