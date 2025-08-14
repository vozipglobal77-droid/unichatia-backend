export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Solo acepta POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('📋 Request body:', req.body);
    
    const formData = req.body;
    
    // Validar datos obligatorios
    if (!formData.businessName || !formData.phone || !formData.email) {
      return res.status(400).json({ 
        error: 'Faltan campos obligatorios: businessName, phone, email' 
      });
    }

    console.log('✅ Datos validados para:', formData.businessName);

    // Respuesta de éxito (por ahora básica)
    return res.status(200).json({
      success: true,
      message: 'WorkBot generado y enviado por email',
      businessName: formData.businessName,
      email: formData.email
    });

  } catch (error) {
    console.error('❌ Error:', error);
    return res.status(500).json({ 
      error: error.message 
    });
  }
}
