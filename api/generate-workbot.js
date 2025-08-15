/**
 * UNICHATIA BACKEND - GENERATE WORKBOT API
 * Endpoint: POST /api/generate-workbot
 * Función serverless para Vercel - Versión Multi-Sector Dinámica
 */

// =====================================================
// DATASETS POR SECTOR - PLACEHOLDER SECTION
// =====================================================

/* 
 * TODO: INSERTAR AQUÍ EL DATASET GYM_SECTOR_DATA COMPLETO
 * Formato: const GYM_SECTOR_DATA = { ... };
 */
// [DATASET_GYM_PLACEHOLDER]
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

/* 
 * TODO: INSERTAR AQUÍ EL DATASET ECOMMERCE_SECTOR_DATA COMPLETO  
 * Formato: const ECOMMERCE_SECTOR_DATA = { ... };
 */
// [DATASET_ECOMMERCE_PLACEHOLDER]
const ECOMMERCE_SECTOR_DATA = {
    "sector": "ecommerce",
    "sectorName": "Tienda Online",
    "description": "WorkBot especializado para tiendas online, e-commerce y venta por internet",
    "icon": "🛒",
    "features": [
        "Gestión de envíos y entregas",
        "Información de stock y productos", 
        "Devoluciones y cambios automáticos",
        "Soporte de pagos y facturación",
        "Atención al cliente 24/7"
    ],
    "faqs": [
        // ===== ENVÍOS Y LOGÍSTICA (Priority 1) =====
        {
            "id": "envios_tiempos_1",
            "keywords": ["envio", "envío", "entrega", "cuando llega", "cuándo llega", "tiempo", "plazo"],
            "response": "Los envíos tardan {{SHIPPING_TIME}} desde que procesas tu pedido. Envío gratuito en pedidos superiores a {{FREE_SHIPPING_MINIMUM}}. {{SHIPPING_ZONES}}",
            "category": "envios",
            "priority": 1
        },
        {
            "id": "envios_costes_1",
            "keywords": ["coste envio", "coste envío", "precio envio", "gastos envío", "cuanto cuesta"],
            "response": "Gastos de envío: {{SHIPPING_COSTS}}. ¡Envío GRATIS en pedidos superiores a {{FREE_SHIPPING_MINIMUM}}! {{SHIPPING_ZONES}}",
            "category": "envios",
            "priority": 1
        },
        {
            "id": "envios_seguimiento_1",
            "keywords": ["seguimiento", "tracking", "rastrear", "localizar pedido", "donde esta"],
            "response": "Recibirás un email con el número de seguimiento cuando enviemos tu pedido. También puedes consultarlo en {{WEBSITE}}/mi-cuenta o contactarnos al {{EMAIL}}.",
            "category": "envios",
            "priority": 1
        },
        {
            "id": "envios_zonas_1",
            "keywords": ["envio internacional", "envío internacional", "paises", "países", "europa", "mundial"],
            "response": "Enviamos a: {{SHIPPING_ZONES}}. Los plazos internacionales son {{INTERNATIONAL_SHIPPING_TIME}}. Consulta tarifas en el checkout.",
            "category": "envios",
            "priority": 2
        },
        {
            "id": "envios_urgente_1",
            "keywords": ["envio urgente", "envío urgente", "express", "rapido", "rápido", "24h", "hoy"],
            "response": "{{EXPRESS_SHIPPING}} Para pedidos urgentes, contacta al {{PHONE}} antes de las {{CUTOFF_TIME}} y te ayudamos.",
            "category": "envios",
            "priority": 2
        },
        {
            "id": "envios_direccion_1",
            "keywords": ["cambiar direccion", "cambiar dirección", "direccion incorrecta", "dirección incorrecta"],
            "response": "Si necesitas cambiar la dirección, contacta INMEDIATAMENTE al {{EMAIL}} o {{PHONE}}. Solo podemos modificarla antes del envío.",
            "category": "envios",
            "priority": 2
        },
        {
            "id": "envios_no_llega_1",
            "keywords": ["no llega", "no ha llegado", "perdido", "extraviado", "donde esta mi pedido"],
            "response": "Si tu pedido no llega en {{SHIPPING_TIME}}, contacta al {{EMAIL}} con tu número de pedido. Gestionamos la incidencia con la empresa de transporte.",
            "category": "envios",
            "priority": 1
        },
        {
            "id": "envios_dañado_1",
            "keywords": ["paquete dañado", "producto roto", "llegó roto", "llegó dañado", "mal estado"],
            "response": "Si recibes el producto dañado, NO lo devuelvas. Haz fotos y contacta al {{EMAIL}} en 48h. Te enviamos reposición gratuita.",
            "category": "envios",
            "priority": 1
        },

        // ===== DEVOLUCIONES Y CAMBIOS (Priority 1) =====
        {
            "id": "devoluciones_como_1",
            "keywords": ["devolver", "devolución", "devolucion", "como devolver", "cómo devolver"],
            "response": "Tienes {{RETURN_PERIOD}} días para devolver. Entra en {{WEBSITE}}/devoluciones, indica motivo y te generamos etiqueta prepagada. {{RETURN_CONDITIONS}}",
            "category": "devoluciones",
            "priority": 1
        },
        {
            "id": "devoluciones_coste_1",
            "keywords": ["coste devolucion", "coste devolución", "quien paga", "gratis devolver"],
            "response": "{{RETURN_COSTS}} Si el producto tiene defecto o error nuestro, la devolución es gratuita.",
            "category": "devoluciones",
            "priority": 1
        },
        {
            "id": "devoluciones_tiempo_1",
            "keywords": ["cuanto tardan", "plazo devolucion", "plazo devolución", "cuando cobro"],
            "response": "Procesamos devoluciones en {{RETURN_PROCESSING_TIME}} desde que recibimos el producto. El reembolso tarda {{REFUND_TIME}} adicionales.",
            "category": "devoluciones",
            "priority": 1
        },
        {
            "id": "cambios_talla_1",
            "keywords": ["cambiar talla", "talla incorrecta", "no me queda", "cambio", "intercambio"],
            "response": "{{EXCHANGE_POLICY}} Para cambios rápidos, contacta al {{EMAIL}} o inicia devolución en {{WEBSITE}}/devoluciones.",
            "category": "devoluciones",
            "priority": 1
        },
        {
            "id": "devoluciones_condiciones_1",
            "keywords": ["condiciones devolucion", "que se puede devolver", "etiquetas", "usado"],
            "response": "Puedes devolver productos sin usar, con etiquetas originales. {{RETURN_CONDITIONS}} No se aceptan: {{NON_RETURNABLE_ITEMS}}",
            "category": "devoluciones",
            "priority": 2
        },
        {
            "id": "desistimiento_1",
            "keywords": ["desistimiento", "derecho desistimiento", "14 dias", "cancelar compra"],
            "response": "Tienes 14 días naturales para desistir sin dar explicaciones (Ley de Consumidores). Contacta al {{EMAIL}} para ejercer este derecho.",
            "category": "devoluciones",
            "priority": 2
        },

        // ===== PAGOS Y FACTURACIÓN (Priority 1) =====
        {
            "id": "metodos_pago_1",
            "keywords": ["formas de pago", "metodos pago", "métodos pago", "como pagar", "cómo pagar"],
            "response": "Aceptamos: {{PAYMENT_METHODS}}. Todos los pagos son 100% seguros con encriptación SSL.",
            "category": "pagos",
            "priority": 1
        },
        {
            "id": "pago_seguro_1",
            "keywords": ["pago seguro", "seguridad", "ssl", "datos tarjeta", "proteccion"],
            "response": "Sí, es 100% seguro. Usamos encriptación SSL y nunca almacenamos datos de tarjetas. {{SECURITY_CERTIFICATIONS}}",
            "category": "pagos",
            "priority": 1
        },
        {
            "id": "factura_1",
            "keywords": ["factura", "recibo", "justificante", "comprobante"],
            "response": "Recibes la factura por email tras la compra. También disponible en {{WEBSITE}}/mi-cuenta. Para facturas con IVA empresas, contacta {{EMAIL}}.",
            "category": "pagos",
            "priority": 2
        },
        {
            "id": "precios_iva_1",
            "keywords": ["precios", "iva", "impuestos", "precio final", "con iva"],
            "response": "Todos los precios mostrados incluyen IVA ({{VAT_RATE}}%). El precio que ves es el precio final sin sorpresas.",
            "category": "pagos",
            "priority": 2
        },
        {
            "id": "descuentos_cupones_1",
            "keywords": ["descuento", "cupon", "cupón", "codigo descuento", "oferta", "promocion"],
            "response": "{{CURRENT_OFFERS}} Introduce el código en el checkout. Síguenos en redes para ofertas exclusivas: {{SOCIAL_MEDIA}}",
            "category": "pagos",
            "priority": 2
        },
        {
            "id": "reembolso_1",
            "keywords": ["reembolso", "devolucion dinero", "devolución dinero", "cuando cobro"],
            "response": "Los reembolsos tardan {{REFUND_TIME}} en aparecer en tu cuenta, tras procesar la devolución. Depende de tu banco.",
            "category": "pagos",
            "priority": 1
        },

        // ===== STOCK Y DISPONIBILIDAD (Priority 1) =====
        {
            "id": "stock_disponible_1",
            "keywords": ["stock", "disponible", "hay", "quedan", "agotado"],
            "response": "Si está disponible aparece el botón 'Añadir al carrito'. Si está agotado, puedes activar 'Avísame cuando esté disponible' y te notificamos.",
            "category": "stock",
            "priority": 1
        },
        {
            "id": "reposicion_stock_1",
            "keywords": ["cuando reponen", "reposicion", "reposición", "vuelve stock", "avísame"],
            "response": "{{RESTOCKING_POLICY}} Activa las notificaciones en el producto y serás el primero en saberlo.",
            "category": "stock",
            "priority": 2
        },
        {
            "id": "reserva_producto_1",
            "keywords": ["reservar", "apartar", "guardar producto"],
            "response": "{{RESERVATION_POLICY}} Añádelo al carrito para reservarlo temporalmente mientras compras.",
            "category": "stock",
            "priority": 3
        },
        {
            "id": "stock_tienda_fisica_1",
            "keywords": ["tienda fisica", "tienda física", "local", "en tienda"],
            "response": "{{PHYSICAL_STORES}} Para consultar stock en tienda, llama a {{PHONE}} con la referencia del producto.",
            "category": "stock",
            "priority": 3
        },

        // ===== PRODUCTOS Y TALLAS (Priority 2) =====
        {
            "id": "guia_tallas_1",
            "keywords": ["tallas", "guia tallas", "guía tallas", "que talla", "medidas"],
            "response": "Consulta nuestra guía de tallas en cada producto o en {{WEBSITE}}/guia-tallas. {{SIZE_GUIDE_TIPS}}",
            "category": "productos",
            "priority": 2
        },
        {
            "id": "producto_info_1",
            "keywords": ["caracteristicas", "características", "especificaciones", "detalles", "informacion"],
            "response": "Todas las especificaciones están en la ficha del producto. Para dudas específicas, contacta {{EMAIL}} con la referencia.",
            "category": "productos",
            "priority": 2
        },
        {
            "id": "cuidado_productos_1",
            "keywords": ["cuidado", "lavar", "mantenimiento", "instrucciones", "etiqueta"],
            "response": "Las instrucciones de cuidado aparecen en la ficha del producto y en la etiqueta. {{CARE_INSTRUCTIONS}}",
            "category": "productos",
            "priority": 3
        },
        {
            "id": "garantia_productos_1",
            "keywords": ["garantia", "garantía", "defecto", "roto", "no funciona"],
            "response": "Todos los productos tienen {{WARRANTY_PERIOD}} de garantía legal. Para defectos, contacta {{EMAIL}} con fotos y número de pedido.",
            "category": "productos",
            "priority": 2
        },
        {
            "id": "productos_personalizados_1",
            "keywords": ["personalizar", "grabado", "bordado", "personalizado"],
            "response": "{{PERSONALIZATION_SERVICES}} Los productos personalizados no admiten devolución salvo defecto de fabricación.",
            "category": "productos",
            "priority": 3
        },

        // ===== CUENTA Y REGISTRO (Priority 2) =====
        {
            "id": "crear_cuenta_1",
            "keywords": ["crear cuenta", "registrarse", "registro", "usuario", "alta"],
            "response": "Es fácil: ve a {{WEBSITE}}/registro, completa tus datos y ¡listo! {{ACCOUNT_BENEFITS}}",
            "category": "cuenta",
            "priority": 2
        },
        {
            "id": "login_problemas_1",
            "keywords": ["no puedo entrar", "login", "contraseña", "password", "olvidé"],
            "response": "Si olvidaste tu contraseña, usa 'Recuperar contraseña' en {{WEBSITE}}/login. Si persiste, contacta {{EMAIL}}.",
            "category": "cuenta",
            "priority": 2
        },
        {
            "id": "compra_sin_registro_1",
            "keywords": ["sin registro", "compra invitado", "guest", "no quiero cuenta"],
            "response": "{{GUEST_CHECKOUT}} Te recomendamos crear cuenta para tracking de pedidos y futuras compras más rápidas.",
            "category": "cuenta",
            "priority": 3
        },
        {
            "id": "datos_personales_1",
            "keywords": ["cambiar datos", "actualizar datos", "direccion", "dirección", "teléfono"],
            "response": "Modifica tus datos en {{WEBSITE}}/mi-cuenta o contacta {{EMAIL}}. Según GDPR, tienes derecho a rectificar tus datos.",
            "category": "cuenta",
            "priority": 2
        },

        // ===== CONTACTO Y ATENCIÓN (Priority 1) =====
        {
            "id": "contacto_1",
            "keywords": ["contacto", "telefono", "teléfono", "email", "hablar"],
            "response": "Contáctanos por: Email {{EMAIL}}, Teléfono {{PHONE}} ({{SUPPORT_HOURS}}) o chat en vivo en nuestra web.",
            "category": "contacto",
            "priority": 1
        },
        {
            "id": "horarios_atencion_1",
            "keywords": ["horarios atencion", "horarios atención", "cuando atienden", "disponible"],
            "response": "Nuestro horario de atención: {{SUPPORT_HOURS}}. El chat y email están disponibles 24/7 con respuesta en {{RESPONSE_TIME}}.",
            "category": "contacto",
            "priority": 1
        },
        {
            "id": "tiempo_respuesta_1",
            "keywords": ["cuanto tardan", "tiempo respuesta", "cuando contestan"],
            "response": "Respondemos emails en {{RESPONSE_TIME}} máximo. Para urgencias, llama al {{PHONE}} en {{SUPPORT_HOURS}}.",
            "category": "contacto",
            "priority": 2
        },

        // ===== LEGAL Y PRIVACIDAD (Priority 2) =====
        {
            "id": "cookies_1",
            "keywords": ["cookies", "privacidad", "datos", "gdpr", "rgpd"],
            "response": "Usamos cookies para mejorar tu experiencia. Puedes configurarlas en nuestra política de cookies: {{WEBSITE}}/cookies",
            "category": "legal",
            "priority": 2
        },
        {
            "id": "datos_personales_gdpr_1",
            "keywords": ["mis datos", "borrar datos", "gdpr", "proteccion datos"],
            "response": "Tus datos están seguros según GDPR. Puedes ejercer tus derechos (acceso, rectificación, supresión) contactando {{EMAIL}}.",
            "category": "legal",
            "priority": 2
        },
        {
            "id": "aviso_legal_1",
            "keywords": ["aviso legal", "condiciones", "terminos", "términos", "legal"],
            "response": "Consulta nuestro aviso legal y condiciones en {{WEBSITE}}/legal. Para dudas legales, contacta {{EMAIL}}.",
            "category": "legal",
            "priority": 3
        },

        // ===== PROBLEMAS TÉCNICOS (Priority 2) =====
        {
            "id": "problema_web_1",
            "keywords": ["no funciona", "error", "problema web", "no carga", "lento"],
            "response": "Si la web no funciona: 1) Actualiza la página 2) Borra caché 3) Prueba otro navegador. Si persiste, contacta {{EMAIL}}.",
            "category": "tecnico",
            "priority": 2
        },
        {
            "id": "carrito_problemas_1",
            "keywords": ["carrito", "no añade", "no funciona carrito", "no puedo comprar"],
            "response": "Si tienes problemas con el carrito: 1) Acepta cookies 2) Desactiva bloqueadores 3) Usa otro navegador. Ayuda: {{EMAIL}}",
            "category": "tecnico",
            "priority": 2
        },
        {
            "id": "pago_falla_1",
            "keywords": ["pago no funciona", "tarjeta rechazada", "error pago", "no puedo pagar"],
            "response": "Si el pago falla: 1) Verifica datos tarjeta 2) Comprueba límites 3) Contacta tu banco 4) Prueba otro método. Ayuda: {{PHONE}}",
            "category": "tecnico",
            "priority": 1
        },

        // ===== FAQs ESPECÍFICAS E-COMMERCE AVANZADAS =====
        {
            "id": "productos_digitales_1",
            "keywords": ["producto digital", "descarga", "software", "ebook", "digital"],
            "response": "{{DIGITAL_PRODUCTS}} Recibes el enlace de descarga por email tras el pago. No aplica derecho de desistimiento para productos digitales.",
            "category": "productos",
            "priority": 3
        },
        {
            "id": "lista_deseos_1",
            "keywords": ["lista deseos", "favoritos", "wishlist", "guardar"],
            "response": "Crea tu lista de deseos en {{WEBSITE}}/mi-cuenta. Añade productos con el ❤️ y recibe notificaciones de ofertas.",
            "category": "cuenta",
            "priority": 3
        },
        {
            "id": "programa_fidelidad_1",
            "keywords": ["puntos", "fidelidad", "loyalty", "descuentos cliente"],
            "response": "{{LOYALTY_PROGRAM}} Gana puntos con cada compra y canjéalos por descuentos exclusivos.",
            "category": "promociones",
            "priority": 3
        },
        {
            "id": "envio_regalo_1",
            "keywords": ["regalo", "envoltorio", "tarjeta regalo", "envio regalo"],
            "response": "{{GIFT_SERVICES}} Selecciona 'Es un regalo' en el checkout y añadimos envoltorio especial y tarjeta personalizada.",
            "category": "envios",
            "priority": 3
        },
        {
            "id": "comparar_productos_1",
            "keywords": ["comparar", "diferencias", "cual elegir", "comparativa"],
            "response": "Usa nuestro comparador en {{WEBSITE}}/comparar o contacta {{EMAIL}} para asesoramiento personalizado gratuito.",
            "category": "productos",
            "priority": 3
        },
        {
            "id": "newsletter_1",
            "keywords": ["newsletter", "boletin", "boletín", "noticias", "ofertas email"],
            "response": "Suscríbete en {{WEBSITE}}/newsletter para ofertas exclusivas y novedades. Cancelable en cualquier momento.",
            "category": "marketing",
            "priority": 3
        },
        {
            "id": "precios_competencia_1",
            "keywords": ["precio mas barato", "precio más barato", "igualamos precio", "mejor precio"],
            "response": "{{PRICE_MATCHING}} Si encuentras el mismo producto más barato, contacta {{EMAIL}} con el enlace y estudiamos igualarlo.",
            "category": "pagos",
            "priority": 3
        },
        {
            "id": "envio_empresas_1",
            "keywords": ["envio empresas", "envío empresas", "factura empresa", "pedido empresa"],
            "response": "Para pedidos empresariales contacta {{BUSINESS_EMAIL}} o {{PHONE}}. Ofrecemos condiciones especiales y facturación personalizada.",
            "category": "envios",
            "priority": 3
        },
        {
            "id": "productos_segunda_mano_1",
            "keywords": ["segunda mano", "outlet", "liquidacion", "liquidación", "descatalogado"],
            "response": "{{OUTLET_INFO}} Consulta nuestra sección outlet en {{WEBSITE}}/outlet para productos con descuentos especiales.",
            "category": "productos",
            "priority": 3
        },
        {
            "id": "afiliados_1",
            "keywords": ["afiliados", "colaborar", "comision", "comisión", "partner"],
            "response": "{{AFFILIATE_PROGRAM}} Únete a nuestro programa de afiliados en {{WEBSITE}}/afiliados y gana comisiones por ventas.",
            "category": "colaboracion",
            "priority": 4
        },

        // ===== HORARIOS Y UBICACIÓN =====
        {
            "id": "horarios_1",
            "keywords": ["horarios", "horario", "abierto", "cerrado", "cuando", "cuándo"],
            "response": "Nuestra tienda online está disponible 24/7. Atención al cliente: {{SUPPORT_HOURS}}. {{PHYSICAL_STORE_HOURS}}",
            "category": "horarios",
            "priority": 1
        },
        {
            "id": "ubicacion_1",
            "keywords": ["donde", "dónde", "ubicacion", "ubicación", "dirección", "como llegar"],
            "response": "{{PHYSICAL_STORES}} Tienda online: {{WEBSITE}}. Para dudas: {{EMAIL}} o {{PHONE}}",
            "category": "ubicacion",
            "priority": 2
        }
    ],
    "styling": {
        "primaryColor": "#3b82f6",
        "secondaryColor": "#1d4ed8", 
        "accentColor": "#fbbf24",
        "fontFamily": "'Inter', sans-serif",
        "borderRadius": "8px",
        "sectorTheme": "modern"
    },
    "customFields": [
        {
            "id": "shippingTime",
            "label": "Tiempo de envío estándar",
            "type": "text",
            "placeholder": "Ej: 24-48h, 2-3 días laborables"
        },
        {
            "id": "freeShippingMinimum",
            "label": "Pedido mínimo envío gratis",
            "type": "text",
            "placeholder": "Ej: 50€, 75€"
        },
        {
            "id": "shippingCosts",
            "label": "Costes de envío",
            "type": "text",
            "placeholder": "Ej: 4.95€ península, 9.95€ Baleares"
        },
        {
            "id": "shippingZones",
            "label": "Zonas de envío",
            "type": "text",
            "placeholder": "Ej: España, Europa, Mundial"
        },
        {
            "id": "returnPeriod",
            "label": "Período de devolución",
            "type": "text",
            "placeholder": "Ej: 14 días, 30 días"
        },
        {
            "id": "returnCosts",
            "label": "Política costes devolución",
            "type": "text",
            "placeholder": "Ej: Devoluciones gratuitas, Cliente paga 3.95€"
        },
        {
            "id": "paymentMethods",
            "label": "Métodos de pago",
            "type": "text",
            "placeholder": "Ej: Tarjeta, PayPal, Bizum, Transferencia"
        },
        {
            "id": "supportHours",
            "label": "Horarios atención cliente",
            "type": "text",
            "placeholder": "Ej: L-V 9:00-18:00, S 10:00-14:00"
        },
        {
            "id": "responseTime",
            "label": "Tiempo respuesta emails",
            "type": "text",
            "placeholder": "Ej: 24h máximo, mismo día laborable"
        },
        {
            "id": "warrantyPeriod",
            "label": "Período garantía",
            "type": "text",
            "placeholder": "Ej: 2 años garantía legal, 1 año comercial"
        },
        {
            "id": "stockPolicy",
            "label": "Política de stock",
            "type": "text",
            "placeholder": "Ej: Stock en tiempo real, Reposición semanal"
        },
        {
            "id": "specialOffers",
            "label": "Ofertas actuales",
            "type": "textarea",
            "placeholder": "Ej: -20% primera compra con BIENVENIDO20, Envío gratis Black Friday"
        }
    ]
};

// Función auxiliar para procesar FAQs específicas de e-commerce
function processEcommerceFaqs(formData) {
    const faqs = [...ECOMMERCE_SECTOR_DATA.faqs];
    
    return faqs.map(faq => {
        let response = faq.response;
        
        // Variables específicas de e-commerce
        const ecommerceReplacements = {
            'BUSINESS_NAME': formData.businessName || 'Nuestra tienda',
            'PHONE': formData.phone || '',
            'EMAIL': formData.email || '',
            'WEBSITE': formData.website || '',
            'SHIPPING_TIME': formData.shippingTime || '2-3 días laborables',
            'FREE_SHIPPING_MINIMUM': formData.freeShippingMinimum || '50€',
            'SHIPPING_COSTS': formData.shippingCosts || '4.95€ península',
            'SHIPPING_ZONES': formData.shippingZones || 'España península y Baleares',
            'INTERNATIONAL_SHIPPING_TIME': formData.internationalShippingTime || '5-7 días laborables',
            'EXPRESS_SHIPPING': formData.expressShipping || 'Disponible envío 24h por 9.95€',
            'CUTOFF_TIME': formData.cutoffTime || '14:00h',
            'RETURN_PERIOD': formData.returnPeriod || '30 días',
            'RETURN_COSTS': formData.returnCosts || 'Devoluciones gratuitas',
            'RETURN_PROCESSING_TIME': formData.returnProcessingTime || '3-5 días laborables',
            'REFUND_TIME': formData.refundTime || '5-7 días laborables',
            'EXCHANGE_POLICY': formData.exchangePolicy || 'Cambios gratuitos',
            'RETURN_CONDITIONS': formData.returnConditions || 'Producto sin usar con etiquetas',
            'NON_RETURNABLE_ITEMS': formData.nonReturnableItems || 'productos personalizados e higiene personal',
            'PAYMENT_METHODS': formData.paymentMethods || 'Tarjeta, PayPal, Bizum, Transferencia',
            'SECURITY_CERTIFICATIONS': formData.securityCertifications || 'Certificado SSL y Verified by Visa',
            'VAT_RATE': formData.vatRate || '21',
            'CURRENT_OFFERS': formData.specialOffers || '¡Envío gratis en pedidos +50€!',
            'SOCIAL_MEDIA': formData.socialMedia || '@nuestratienda',
            'SUPPORT_HOURS': formData.supportHours || 'L-V 9:00-18:00',
            'RESPONSE_TIME': formData.responseTime || '24h máximo',
            'RESTOCKING_POLICY': formData.restockPolicy || 'Reponemos productos populares semanalmente',
            'RESERVATION_POLICY': formData.reservationPolicy || 'No reservamos productos, stock limitado',
            'PHYSICAL_STORES': formData.physicalStores || 'Solo tienda online',
            'SIZE_GUIDE_TIPS': formData.sizeGuideTips || 'Si dudas entre tallas, elige la mayor',
            'CARE_INSTRUCTIONS': formData.careInstructions || 'Sigue las instrucciones de la etiqueta',
            'WARRANTY_PERIOD': formData.warrantyPeriod || '2 años garantía legal',
            'PERSONALIZATION_SERVICES': formData.personalizationServices || 'Servicio de personalización disponible',
            'ACCOUNT_BENEFITS': formData.accountBenefits || 'Envíos más rápidos y tracking de pedidos',
            'GUEST_CHECKOUT': formData.guestCheckout || 'Puedes comprar sin registro',
            'DIGITAL_PRODUCTS': formData.digitalProducts || 'Productos digitales disponibles',
            'LOYALTY_PROGRAM': formData.loyaltyProgram || 'Programa de puntos disponible',
            'GIFT_SERVICES': formData.giftServices || 'Servicio de regalo disponible',
            'PRICE_MATCHING': formData.priceMatching || 'Igualamos precios de la competencia',
            'BUSINESS_EMAIL': formData.businessEmail || formData.email || '',
            'OUTLET_INFO': formData.outletInfo || 'Sección outlet con ofertas especiales',
            'AFFILIATE_PROGRAM': formData.affiliateProgram || 'Programa de afiliados disponible',
            'PHYSICAL_STORE_HOURS': formData.physicalStoreHours || ''
        };
        
        // Aplicar reemplazos
        Object.keys(ecommerceReplacements).forEach(key => {
            const placeholder = `{{${key}}}`;
            response = response.replace(new RegExp(placeholder, 'g'), ecommerceReplacements[key]);
        });
        
        return {
            ...faq,
            response: response
        };
    });
}
/* 
 * TODO: INSERTAR AQUÍ FUTUROS DATASETS
 * Ejemplos: RESTAURANT_SECTOR_DATA, CLINIC_SECTOR_DATA, etc.
 */
// [DATASET_FUTURE_SECTORS_PLACEHOLDER]

// =====================================================
// SISTEMA DINÁMICO DE SECTORES
// =====================================================

/**
 * Obtener datos del sector especificado
 * @param {string} sector - Nombre del sector (gym, ecommerce, restaurant, etc.)
 * @returns {Object} Datos del sector o null si no existe
 */
function getSectorData(sector) {
    const sectorMap = {
        'gym': typeof GYM_SECTOR_DATA !== 'undefined' ? GYM_SECTOR_DATA : null,
        'ecommerce': typeof ECOMMERCE_SECTOR_DATA !== 'undefined' ? ECOMMERCE_SECTOR_DATA : null,
        // 'restaurant': typeof RESTAURANT_SECTOR_DATA !== 'undefined' ? RESTAURANT_SECTOR_DATA : null,
        // 'clinic': typeof CLINIC_SECTOR_DATA !== 'undefined' ? CLINIC_SECTOR_DATA : null,
        // 'lawyer': typeof LAWYER_SECTOR_DATA !== 'undefined' ? LAWYER_SECTOR_DATA : null,
        // 'dentist': typeof DENTIST_SECTOR_DATA !== 'undefined' ? DENTIST_SECTOR_DATA : null,
    };

    const sectorData = sectorMap[sector.toLowerCase()];
    
    if (!sectorData) {
        console.error(`❌ Sector '${sector}' no encontrado o no configurado`);
        return null;
    }
    
    console.log(`✅ Sector data loaded for: ${sector}`);
    return sectorData;
}

/**
 * Procesar FAQs reemplazando variables con datos reales - VERSIÓN DINÁMICA
 * @param {Object} formData - Datos del formulario
 * @param {string} sector - Sector especificado
 * @returns {Array} FAQs procesadas con variables reemplazadas
 */
function processFaqs(formData, sector) {
    const sectorData = getSectorData(sector);
    
    if (!sectorData || !sectorData.faqs) {
        console.error(`❌ No se encontraron FAQs para el sector: ${sector}`);
        return [];
    }
    
    const faqs = [...sectorData.faqs];
    
    return faqs.map(faq => {
        let response = faq.response;
        
        // Variables estándar (aplican a todos los sectores)
        const standardReplacements = {
            'BUSINESS_NAME': formData.businessName || `Nuestro ${sectorData.sectorName.toLowerCase()}`,
            'PHONE': formData.phone || '',
            'EMAIL': formData.email || '',
            'ADDRESS': formData.address || '',
            'WEBSITE': formData.website || '',
            'WEEKDAY_HOURS': formData.weekdayHours || '',
            'WEEKEND_HOURS': formData.weekendHours || '',
            'HOLIDAYS': formData.holidays || ''
        };

        // Variables específicas por sector - dinámico basado en formData
        const sectorSpecificReplacements = {};
        
        // Iterar sobre todos los campos del formData para crear reemplazos dinámicos
        Object.keys(formData).forEach(key => {
            // Convertir camelCase a UPPER_CASE para las variables
            const variableName = key.replace(/([A-Z])/g, '_$1').toUpperCase();
            sectorSpecificReplacements[variableName] = formData[key];
        });

        // Combinar todos los reemplazos
        const allReplacements = {
            ...standardReplacements,
            ...sectorSpecificReplacements
        };

        // Reemplazar todas las variables
        Object.keys(allReplacements).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            response = response.replace(regex, allReplacements[key] || '');
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
 * Generar configuración del WorkBot - VERSIÓN DINÁMICA
 * @param {Object} formData - Datos del formulario
 * @param {Array} processedFaqs - FAQs procesadas
 * @param {string} sector - Sector especificado
 * @returns {Object} Configuración completa del WorkBot
 */
function generateWorkBotConfig(formData, processedFaqs, sector) {
    const sectorData = getSectorData(sector);
    
    if (!sectorData) {
        throw new Error(`Sector '${sector}' no configurado`);
    }

    return {
        businessName: formData.businessName,
        sector: sector,
        sectorName: sectorData.sectorName,
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
            primaryColor: formData.primaryColor || sectorData.styling.primaryColor,
            secondaryColor: formData.secondaryColor || sectorData.styling.secondaryColor,
            accentColor: formData.accentColor || sectorData.styling.accentColor,
            fontFamily: formData.fontFamily || sectorData.styling.fontFamily,
            borderRadius: formData.borderRadius || parseInt(sectorData.styling.borderRadius),
            workbotSize: formData.workbotSize || 'medium',
            workbotPosition: formData.workbotPosition || 'bottom-right'
        },
        messages: {
            greeting: formData.greeting || `¡Hola! Soy el WorkBot de ${formData.businessName}`,
            welcomeMessage: formData.welcomeMessage || `¿En qué puedo ayudarte? Puedes preguntarme sobre nuestros servicios o cualquier consulta.`,
            closingMessage: formData.closingMessage || `¡Esperamos verte pronto!`,
            offlineMessage: formData.offlineMessage || 'Estamos cerrados ahora, pero puedes escribirnos y te responderemos pronto.'
        },
        faqs: processedFaqs,
        metadata: {
            installationService: formData.installationService || false,
            timestamp: new Date().toISOString(),
            sector: sector,
            sectorName: sectorData.sectorName
        }
    };
}

/**
 * Generar HTML completo del WorkBot - VERSIÓN DINÁMICA
 * @param {Object} config - Configuración del WorkBot
 * @param {Object} formData - Datos del formulario
 * @param {string} sector - Sector especificado
 * @returns {string} HTML completo del WorkBot
 */
function generateHTMLTemplate(config, formData, sector) {
    const timestamp = new Date().toLocaleString('es-ES');
    const sectorData = getSectorData(sector);
    
    if (!sectorData) {
        throw new Error(`Sector '${sector}' no configurado`);
    }

    const sizeMap = {
        'small': '320px',
        'medium': '350px',
        'large': '400px'
    };
    const workbotWidth = sizeMap[config.styling.workbotSize];

    // Obtener emoji dinámico del sector
    const sectorEmoji = sectorData.icon || '🤖';
    
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
                <p>${sectorEmoji} WorkBot Asistente</p>
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

            console.log('✅ WorkBot inicializado para ${config.businessName} (${config.sectorName})');
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
                sector: WORKBOT_CONFIG.sector,
                sectorName: WORKBOT_CONFIG.sectorName,
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
                    sector_name: WORKBOT_CONFIG.sectorName,
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
    <!-- Sector: ${config.sector} (${config.sectorName}) -->
    <!-- Business: ${config.businessName} -->
    <!-- Visit unichatia.com for updates -->

</body>
</html>`;
}

/**
 * Validar datos del formulario - VERSIÓN DINÁMICA
 * @param {Object} formData - Datos del formulario
 * @param {string} sector - Sector especificado
 * @returns {Array} Array de errores (vacío si todo OK)
 */
function validateFormData(formData, sector) {
    const errors = [];
    const sectorData = getSectorData(sector);
    
    if (!sectorData) {
        errors.push(`Sector '${sector}' no es válido o no está configurado`);
        return errors;
    }
    
    if (!formData.businessName || formData.businessName.trim().length < 2) {
        errors.push(`Nombre del ${sectorData.sectorName.toLowerCase()} es obligatorio`);
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
 * *** VERSIÓN MULTI-SECTOR DINÁMICA ***
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
        const sector = formData.sector || 'gym'; // Default a gym si no se especifica
        
        console.log(`🎯 Processing sector: ${sector}`);
        
        // Validar que el sector existe
        const sectorData = getSectorData(sector);
        if (!sectorData) {
            return res.status(400).json({
                success: false,
                error: `Sector '${sector}' no está disponible`,
                availableSectors: ['gym', 'ecommerce'] // Lista dinámica basada en sectores configurados
            });
        }
        
        // Validar datos
        const validationErrors = validateFormData(formData, sector);
        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                error: 'Validation errors',
                details: validationErrors
            });
        }
        
        // Procesar FAQs dinámicamente
        const processedFaqs = processFaqs(formData, sector);
        
        // Generar configuración
        const workbotConfig = generateWorkBotConfig(formData, processedFaqs, sector);
        
        // Generar HTML completo
        const workbotHTML = generateHTMLTemplate(workbotConfig, formData, sector);
        
        // Generar nombre de archivo
        const filename = `${formData.businessName.replace(/\s+/g, '-').toLowerCase()}-workbot.html`;
        
        console.log('✅ WorkBot generated successfully');
        console.log(`📄 Filename: ${filename}`);
        console.log(`🎯 Sector: ${sector} (${sectorData.sectorName})`);
        console.log(`📊 FAQs: ${processedFaqs.length}`);
        console.log(`📝 HTML size: ${workbotHTML.length} characters`);
        
        // Respuesta con HTML generado
        return res.status(200).json({
            success: true,
            message: 'WorkBot generado correctamente',
            data: {
                html: workbotHTML,
                filename: filename,
                businessName: formData.businessName,
                sector: sector,
                sectorName: sectorData.sectorName,
                timestamp: new Date().toISOString(),
                metadata: {
                    faqsCount: processedFaqs.length,
                    installationService: formData.installationService || false,
                    version: '3.0',
                    features: sectorData.features || []
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
