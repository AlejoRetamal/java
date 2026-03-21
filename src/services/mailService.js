const transporter = require('../config/mailer');

async function enviarMailOrden(orden) {
  const adminUrl = `http://localhost:4200/admin?token=${process.env.ADMIN_TOKEN}`;

  const itemsHTML = orden.items.map(item => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #f0ebe3;">
        ${item.nombre}
      </td>
      <td style="padding: 12px 0; border-bottom: 1px solid #f0ebe3; text-align: right;">
        x${item.cantidad}
      </td>
      <td style="padding: 12px 0; border-bottom: 1px solid #f0ebe3; text-align: right;">
        $${Number(item.precio).toLocaleString('es-AR')}
      </td>
    </tr>
  `).join('');

  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1A1714;">

      <div style="background: #1A1714; padding: 32px; text-align: center;">
        <h1 style="color: #C4A882; font-weight: 300; letter-spacing: 0.2em; margin: 0; font-size: 22px;">
          TAL COMO ERES
        </h1>
      </div>

      <div style="padding: 40px 32px;">
        <h2 style="font-weight: 300; font-size: 28px; margin-bottom: 8px;">
          Nueva orden #${orden.id}
        </h2>
        <p style="color: #8A7F74; font-size: 13px; margin-bottom: 32px;">
          ${new Date().toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <h3 style="font-weight: 400; font-size: 14px; letter-spacing: 0.15em; text-transform: uppercase; color: #8A7F74; margin-bottom: 16px;">
          Datos del cliente
        </h3>
        <table style="width: 100%; margin-bottom: 32px; font-size: 14px;">
          <tr><td style="padding: 4px 0; color: #8A7F74;">Nombre</td><td>${orden.nombre} ${orden.apellido}</td></tr>
          <tr><td style="padding: 4px 0; color: #8A7F74;">Email</td><td>${orden.email}</td></tr>
          <tr><td style="padding: 4px 0; color: #8A7F74;">Teléfono</td><td>${orden.telefono}</td></tr>
          <tr><td style="padding: 4px 0; color: #8A7F74;">Domicilio</td><td>${orden.domicilio}</td></tr>
          <tr><td style="padding: 4px 0; color: #8A7F74;">Ciudad</td><td>${orden.ciudad}</td></tr>
        </table>

        <h3 style="font-weight: 400; font-size: 14px; letter-spacing: 0.15em; text-transform: uppercase; color: #8A7F74; margin-bottom: 16px;">
          Productos
        </h3>
        <table style="width: 100%; margin-bottom: 32px; font-size: 14px;">
          ${itemsHTML}
          <tr>
            <td colspan="2" style="padding: 16px 0 0; font-weight: 500; font-size: 16px;">Total</td>
            <td style="padding: 16px 0 0; text-align: right; font-weight: 500; font-size: 16px;">
              $${Number(orden.total).toLocaleString('es-AR')}
            </td>
          </tr>
        </table>

        <div style="background: #F5F0E8; padding: 24px; text-align: center; margin-bottom: 32px;">
          <p style="color: #8A7F74; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;">
            Estado de la orden
          </p>
          <p style="font-size: 18px; font-weight: 300; color: #C4A882; margin: 0;">
            ${orden.estado}
          </p>
        </div>

      </div>

      <div style="padding: 24px 32px; text-align: center; border-top: 1px solid #f0ebe3;">
        <a href="${adminUrl}"
           style="background: #1A1714; color: #F5F0E8; padding: 14px 36px; text-decoration: none; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; display: inline-block;">
          Ver todas las órdenes
        </a>
      </div>

    </div>
  `;

  await transporter.sendMail({
    from: `"Tal Como Eres" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_TO,
    subject: `Nueva orden #${orden.id} — ${orden.nombre} ${orden.apellido}`,
    html,
  });
}

module.exports = { enviarMailOrden };