const express = require('express');

// Endpoint para generar WorkBot desde formulario
export default async function handler(req, res) {
  // Solo acepta POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;
    
    // Validar datos obligatorios
    if (!formData.businessName || !formData.phone || !formData.email) {
      return res.status(400).json({ 
        error: 'Faltan campos obligatorios: businessName, phone, email' 
      });
    }

    console.log('📋 Datos recibidos:', formData.businessName);

    // 1. Procesar pago (TODO: Stripe)
    const paymentResult = await processPayment(formData);
    
    // 2. Generar WorkBot HTML
    const workbotHTML = generateWorkBotHTML(formData);
    
    // 3. Enviar email con código
    await sendWorkBotEmail(formData, workbotHTML);
    
    // 4. Responder éxito
    res.status(200).json({
      success: true,
      message: 'WorkBot generado y enviado por email',
      businessName: formData.businessName,
      email: formData.email
    });

  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ 
      error: error.message 
    });
  }
}

// Funciones auxiliares (implementar después)
async function processPayment(formData) {
  // TODO: Integrar Stripe
  return { success: true, amount: 10.89 };
}

function generateWorkBotHTML(formData) {
  // TODO: Implementar generación real
  return `<!DOCTYPE html><html><!-- WorkBot para ${formData.businessName} --></html>`;
}

async function sendWorkBotEmail(formData, workbotHTML) {
  // TODO: Implementar Nodemailer
  console.log(`📧 Email enviado a ${formData.email}`);
}
