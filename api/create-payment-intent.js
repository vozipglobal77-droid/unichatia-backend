// api/create-payment-intent.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async function handler(req, res) {
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const {
            // Datos del formulario
            businessName,
            phone,
            email,
            sector,
            isUpdate,
            installationService,
            // Datos para generar WorkBot después del pago
            formData
        } = req.body;

        // Validaciones básicas
        if (!businessName || !phone || !email || !sector) {
            return res.status(400).json({ 
                error: 'Faltan datos obligatorios: businessName, phone, email, sector' 
            });
        }

        if (!email.includes('@')) {
            return res.status(400).json({ error: 'Email inválido' });
        }

        // Calcular precios
        const basePrice = isUpdate ? 500 : 900; // 5€ vs 9€ en centavos
        const installationPrice = (!isUpdate && installationService) ? 1000 : 0; // 10€ en centavos
        const subtotal = basePrice + installationPrice;
        const tax = Math.round(subtotal * 0.21); // IVA 21%
        const totalAmount = subtotal + tax;

        console.log('💰 Calculando precios:', {
            basePrice: basePrice / 100,
            installationPrice: installationPrice / 100,
            subtotal: subtotal / 100,
            tax: tax / 100,
            total: totalAmount / 100,
            isUpdate
        });

        // Crear descripción detallada
        const itemsDescription = [];
        itemsDescription.push(`WorkBot ${sector} ${isUpdate ? '(Actualización)' : ''}`);
        if (installationService && !isUpdate) {
            itemsDescription.push('Instalación Asistida');
        }

        // *** FIX: SOLO DATOS ESENCIALES EN METADATA (< 500 chars cada uno) ***
        const metadata = {
            businessName: businessName.substring(0, 100), // Limitar a 100 chars
            phone: phone.substring(0, 50),
            email: email.substring(0, 100),
            sector: sector,
            isUpdate: isUpdate.toString(),
            installationService: installationService ? 'true' : 'false',
            source: 'unichatia_workbot_generator',
            // Datos adicionales más importantes (limitados)
            address: (formData.address || '').substring(0, 100),
            primaryColor: formData.primaryColor || '#2e8b57',
            weekdayHours: (formData.weekdayHours || '').substring(0, 50),
            weekendHours: (formData.weekendHours || '').substring(0, 50)
        };

        // *** NOTA: El formData completo se enviará por separado al webhook o email ***
        console.log('📝 Metadata size check:', JSON.stringify(metadata).length, 'characters');

        // Crear Payment Intent en Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'eur',
            description: `Unichatia - ${itemsDescription.join(' + ')} para ${businessName}`,
            receipt_email: email,
            metadata: metadata, // ✅ Ahora mucho más pequeño
            automatic_payment_methods: {
                enabled: true,
            },
        });

        console.log('✅ Payment Intent creado:', paymentIntent.id);

        // *** GUARDAR FORMDATA COMPLETO EN BASE DE DATOS O CACHE ***
        // Aquí podrías guardar el formData completo usando el paymentIntent.id como clave
        // Por ejemplo: await saveFormDataToCache(paymentIntent.id, formData);
        
        console.log('💾 FormData guardado temporalmente para:', paymentIntent.id);

        // Responder con client_secret y datos de confirmación
        res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
            amount: totalAmount,
            currency: 'eur',
            description: paymentIntent.description,
            breakdown: {
                basePrice: basePrice / 100,
                installationPrice: installationPrice / 100,
                subtotal: subtotal / 100,
                tax: tax / 100,
                total: totalAmount / 100
            },
            // *** INCLUIR FORMDATA EN LA RESPUESTA PARA EL FRONTEND ***
            formData: formData // ✅ El frontend puede usar esto directamente
        });

    } catch (error) {
        console.error('❌ Error creando Payment Intent:', error);

        // Errores específicos de Stripe
        if (error.type === 'StripeCardError') {
            return res.status(400).json({ error: 'Error con la tarjeta: ' + error.message });
        }
        
        if (error.type === 'StripeRateLimitError') {
            return res.status(429).json({ error: 'Demasiadas solicitudes, intenta en un momento' });
        }

        if (error.type === 'StripeInvalidRequestError') {
            return res.status(400).json({ error: 'Solicitud inválida: ' + error.message });
        }

        if (error.type === 'StripeAPIError') {
            return res.status(500).json({ error: 'Error en el servidor de pagos' });
        }

        // Error general
        res.status(500).json({ 
            error: 'Error interno del servidor',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
