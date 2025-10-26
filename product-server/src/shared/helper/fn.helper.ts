import { parsePhoneNumberFromString, PhoneNumber, CountryCode } from 'libphonenumber-js';

export interface NormalizedPhone {
  original: string;
  e164: string;
  national: string;
  international: string;
  country: string;
  callingCode: string;
  type: string | undefined;
  nationalnoTrim: string;
  phoneCustom: string;
  custom_withPlus84_andRaw: string;
}

export function normalizePhone(
  rawPhone: string,
  defaultCountry: string = 'VN'
): NormalizedPhone | null {
  if (!rawPhone) return null;

  const sanitized = rawPhone.replace(/[^\d+]/g, '');

  // Ép kiểu string -> CountryCode
  const phone: PhoneNumber | undefined = parsePhoneNumberFromString(
    sanitized,
    defaultCountry as CountryCode
  );

  if (!phone || !phone.isValid()) return null;

  const localNumber = phone.formatNational().replace(/\s+/g, '');

  return {
    original: rawPhone,
    e164: phone.number,
    national: phone.formatNational(),
    international: phone.formatInternational(),
    country: phone.country ?? '',
    callingCode: phone.countryCallingCode,
    type: phone.getType(),
    nationalnoTrim: localNumber,
    phoneCustom: `+84 ${localNumber}`,
    custom_withPlus84_andRaw: `+84 ${
      sanitized.startsWith('0') ? sanitized : localNumber
    }`,
  };
}
