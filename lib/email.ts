import nodemailer from 'nodemailer';

type ExchangeAdminNotificationInput = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  vehicleModel: string;
  vehicleType: string;
  makeYear: string;
  newVehicleBrand: string;
  newVehicleModel: string;
  newVehiclePriceRange: string;
  createdAtISO: string;
};

function getEnv(name: string) {
  const v = process.env[name];
  return v ? v.trim() : '';
}

export async function sendExchangeAdminNotification(input: ExchangeAdminNotificationInput) {
  const host = getEnv('SMTP_HOST');
  const port = Number(getEnv('SMTP_PORT') || '0');
  const secure = getEnv('SMTP_SECURE') === 'true';
  const user = getEnv('SMTP_USER');
  const pass = getEnv('SMTP_PASS');
  const from = getEnv('SMTP_FROM');
  const to = getEnv('SMTP_TO');

  if (!host || !port || !user || !pass || !from || !to) {
    throw new Error('SMTP is not configured');
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const subject = `New Exchange to EV request: ${input.fullName} (${input.phone})`;

  const text = [
    'New Exchange to EV request received.',
    '',
    `Name: ${input.fullName}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    `City: ${input.city}`,
    '',
    `Old vehicle: ${input.vehicleModel} (${input.vehicleType})`,
    `Make year: ${input.makeYear}`,
    '',
    `Interested EV: ${input.newVehicleBrand} ${input.newVehicleModel}`,
    `Price range: ${input.newVehiclePriceRange}`,
    '',
    `Created at: ${input.createdAtISO}`,
  ].join('\n');

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system; line-height: 1.5;">
      <h2>New Exchange to EV request</h2>
      <p><b>Name:</b> ${input.fullName}</p>
      <p><b>Email:</b> ${input.email}</p>
      <p><b>Phone:</b> ${input.phone}</p>
      <p><b>City:</b> ${input.city}</p>
      <hr />
      <p><b>Old vehicle:</b> ${input.vehicleModel} (${input.vehicleType})</p>
      <p><b>Make year:</b> ${input.makeYear}</p>
      <hr />
      <p><b>Interested EV:</b> ${input.newVehicleBrand} ${input.newVehicleModel}</p>
      <p><b>Price range:</b> ${input.newVehiclePriceRange}</p>
      <p><b>Created at:</b> ${input.createdAtISO}</p>
    </div>
  `.trim();

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
}

